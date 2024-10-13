from flask import Flask, request, jsonify, make_response, json
import pandas as pd
# For MySQL
import mysql.connector as msql
from mysql.connector import Error
from flask_cors import CORS


# LOCAL
HOST = 'localhost'
DATABASE = 'project2'
USER = 'root'
PASSWORD = 'root'


app = Flask(__name__)
CORS(app)


def connect_execute(statements_to_execute):
    try:
        # Connecting to SQL
        conn = msql.connect(host=HOST, database=DATABASE,
                            user=USER, password=PASSWORD)

        cursor = conn.cursor()

        if conn.is_connected():
            print('Connected to DB', statements_to_execute)
            for queryString in statements_to_execute:
                print(f"Executing what  : {queryString}")
                cursor.execute(queryString)
            conn.commit()

    except Error as e:
        print("Error while connecting to MySQL", e)

    finally:
        cursor.close()
        conn.close()


def single_query_db(statement):
    try:
        conn = msql.connect(host=HOST, database=DATABASE,
                            user=USER, password=PASSWORD)

        cursor = conn.cursor()

        if conn.is_connected():
            print('Connected to DB')
            cursor.execute(statement)
            converted_data = query_to_json(cursor)

    except Error as e:
        print("Error while connecting to MySQL", e)

    finally:
        cursor.close()
        conn.close()

    return jsonify(converted_data), 200


def single_query_without_json(statement):
    try:
        conn = msql.connect(host=HOST, database=DATABASE,
                            user=USER, password=PASSWORD)

        cursor = conn.cursor()

        if conn.is_connected():
            print('Connected to DB')
            # ROLES
            cursor.execute(statement)
            converted_data = query_to_json(cursor)

    except Error as e:
        print("Error while connecting to MySQL", e)

    finally:
        cursor.close()
        conn.close()

    return converted_data

# region DATALOADING


def get_columns(flow):
    # banks 1, branches 2, employees 3, customers 4, dependents 5, accounts 6, account holders 7, loan 8, loan holders 9, payments 10
    if(flow == 1):
        return ['name']
    if(flow == 2):
        return ['branchname', 'bankid', 'city']
    if(flow == 3):
        return ['ssn', 'name', 'telephoneno', 'managerssn', 'startdate', 'branchname', 'ismanager']
    if(flow == 4):
        return ['ssn', 'name', 'address', 'street', 'city', 'essn', 'associatetype']
    if(flow == 5):
        return ['employeessn', 'name', 'relation']
    if(flow == 6):
        return ['accountno', 'accounttype', 'branchname', 'balance', 'interestrate', 'overdraftamount']
    if(flow == 7):
        return ['customerssn', 'accountno', 'recentaccessdate']
    if(flow == 8):
        return ['loanno', 'branchname', 'loanamount']
    if(flow == 9):
        return ['loanno', 'customerssn']
    if(flow == 10):
        return ['loanno', 'paymentdate', 'amount']


def string_is_nan(value):
    if (pd.isna(value)):
        return 'NULL'
    else:
        return f"'{value}'"


def number_is_nan(value):
    if (pd.isna(value) or value == ''):
        return 'NULL'
    else:
        return f"{value}"


def get_statements(csv_data, flow):
    data_frame = pd.DataFrame(csv_data)
    print(data_frame)
    statements_to_execute = []
    for row in data_frame.itertuples():
        statement = ''
        if(flow == 1):
            statement = f'''INSERT INTO BANK (NAME)
                VALUES ('{row.name}')'''
        elif(flow == 2):
            statement = f'''INSERT INTO BRANCH ()
                VALUES ('{row.branchname}',{row.bankid},'{row.city}')'''
        elif(flow == 3):
            statement = f'''INSERT INTO EMPLOYEE ()
                VALUES ('{row.ssn}','{row.name}','{row.telephoneno}',{string_is_nan(row.managerssn)},'{row.startdate}','{row.branchname}',{row.ismanager})'''
        elif(flow == 4):
            statement = f'''INSERT INTO CUSTOMER ()
                VALUES ('{row.ssn}','{row.name}','{row.address}','{row.street}','{row.city}','{row.essn}','{row.associatetype}')'''
        elif(flow == 5):
            statement = f'''INSERT INTO DEPENDENT ()
                VALUES ('{row.employeessn}','{row.name}','{row.relation}')'''
        elif(flow == 6):
            statement = f'''INSERT INTO ACCOUNT ()
                VALUES ('{row.accountno}','{row.accounttype}','{row.branchname}',{row.balance},{number_is_nan(row.interestrate)},{number_is_nan(row.overdraftamount)})'''
        elif(flow == 7):
            statement = f'''INSERT INTO ACCOUNT_HOLDER ()
                VALUES ('{row.customerssn}','{row.accountno}','{row.recentaccessdate}')'''
        elif(flow == 8):
            statement = f'''INSERT INTO LOAN ()
                VALUES ('{row.loanno}','{row.branchname}',{row.loanamount})'''
        elif(flow == 9):
            statement = f'''INSERT INTO LOAN_HOLDER ()
                VALUES ('{row.loanno}','{row.customerssn}')'''
        elif(flow == 10):
            statement = f'''INSERT INTO LOAN_PAYMENT (LOAN_NO, PAYMENT_DATE, AMOUNT)
                VALUES ('{row.loanno}','{row.paymentdate}',{row.amount})'''

        statements_to_execute.append(statement)
    return statements_to_execute


def csv_uploader(request, flow):
    if 'file' not in request.files:
        return 'No file selected'
    file = request.files['file']
    if file.filename == '':
        return 'No selected file'
    if file:
        csv_data = pd.read_csv(
            file,
            header=None,
            names=get_columns(flow))
        print(csv_data)
        statements_to_execute = get_statements(csv_data, flow)
        # print(statements_to_execute)
        # removing headings
        statements_to_execute.pop(0)
        connect_execute(statements_to_execute)
        return '{"message":"Success"}', 201
    return ''' Exited '''


@app.post('/uploadbanks')
def uploadbanks():
    return csv_uploader(request, 1)


@app.post('/uploadbranches')
def uploadbranches():
    return csv_uploader(request, 2)


@app.post('/uploademployees')
def uploademployees():
    return csv_uploader(request, 3)


@app.post('/uploadcustomers')
def uploadcustomers():
    return csv_uploader(request, 4)


@app.post('/uploaddependents')
def uploaddependents():
    return csv_uploader(request, 5)


@app.post('/uploadaccounts')
def uploadaccounts():
    return csv_uploader(request, 6)


@app.post('/uploadaccountholders')
def uploadaccountholders():
    return csv_uploader(request, 7)


@app.post('/uploadloans')
def uploadloans():
    return csv_uploader(request, 8)


@app.post('/uploadloanholders')
def uploadloanholders():
    return csv_uploader(request, 9)


@app.post('/uploadloanpayments')
def uploadloanpayments():
    return csv_uploader(request, 10)

# endregion

# region TRANSACTIONS


def query_to_json(cursor):
    return [dict((cursor.description[i][0], value)
                 for i, value in enumerate(row)) for row in cursor.fetchall()]

# QUERY


@app.get('/alldata')
def get_all_data():
    results = {
        "banks": [],
        "branches": [],
        "employees": [],
        "customers": [],
        "dependents": [],
        "accounts": [],
        "accountholders": [],
        "loans": [],
        "loanholders": [],
        "loanpayments": [],

    }
    try:
        conn = msql.connect(host=HOST, database=DATABASE,
                            user=USER, password=PASSWORD)

        cursor = conn.cursor()

        if conn.is_connected():
            print('Connected to DB')
            # ROLES
            cursor.execute('select * from BANK')
            converted_data = query_to_json(cursor)
            results["banks"] = converted_data

            cursor.execute('select * from BRANCH')
            converted_data = query_to_json(cursor)
            results["branches"] = converted_data

            cursor.execute('select * from EMPLOYEE')
            converted_data = query_to_json(cursor)
            results["employees"] = converted_data

            cursor.execute('select * from CUSTOMER')
            converted_data = query_to_json(cursor)
            results["customers"] = converted_data

            cursor.execute('select * from DEPENDENT')
            converted_data = query_to_json(cursor)
            results["dependents"] = converted_data

            cursor.execute('select * from ACCOUNT')
            converted_data = query_to_json(cursor)
            results["accounts"] = converted_data

            cursor.execute('select * from ACCOUNT_HOLDER')
            converted_data = query_to_json(cursor)
            results["accountholders"] = converted_data

            cursor.execute('select * from LOAN')
            converted_data = query_to_json(cursor)
            results["loans"] = converted_data

            cursor.execute('select * from LOAN_HOLDER')
            converted_data = query_to_json(cursor)
            results["loanholders"] = converted_data

            cursor.execute('select * from LOAN_PAYMENT')
            converted_data = query_to_json(cursor)
            results["loanpayments"] = converted_data

    except Error as e:
        print("Error while connecting to MySQL", e)

    finally:
        cursor.close()
        conn.close()

    jsonified = json.dumps(results)
    return jsonified, 200


@app.get('/getbranches')
def getbranches():
    return single_query_db('select * from BRANCH')


@app.get('/getcustomers')
def getcustomers():
    return single_query_db('select * from CUSTOMER')


@app.get('/getemployees')
def getemployees():
    return single_query_db('select * from EMPLOYEE')


@app.get('/getmanagers')
def getmanagers():
    return single_query_db('select * from EMPLOYEE WHERE IS_MANAGER=1')


@app.get('/getloans')
def getloans():
    return single_query_db('select * from LOAN')


@app.get('/getloanholders')
def getloanholders():
    return single_query_db('select * from LOAN_HOLDER')


@app.get('/getbanks')
def getbanks():
    return single_query_db('select * from BANK')


@app.get('/getbranchreport')
def getbranchreport():
    branch_name = request.args.get("branchname")
    results = {
        "loans": [],
        "accounts": [],
        "customers": [],
        "accountholders": [],
        "loanholders": [],
        "loanpayments": [],
    }
    try:
        conn = msql.connect(host=HOST, database=DATABASE,
                            user=USER, password=PASSWORD)

        cursor = conn.cursor()

        if conn.is_connected():
            print('Connected to DB')
            # ROLES
            cursor.execute(
                f'''select * from LOAN  WHERE BRANCH_NAME='{branch_name}' ''')
            converted_data = query_to_json(cursor)
            results["loans"] = converted_data

            cursor.execute(
                f'''select * from ACCOUNT WHERE BRANCH_NAME='{branch_name}' ''')
            converted_data = query_to_json(cursor)
            results["accounts"] = converted_data

            cursor.execute('select * from CUSTOMER')
            converted_data = query_to_json(cursor)
            results["customers"] = converted_data

            cursor.execute('select * from ACCOUNT_HOLDER')
            converted_data = query_to_json(cursor)
            results["accountholders"] = converted_data

            cursor.execute('select * from LOAN_HOLDER')
            converted_data = query_to_json(cursor)
            results["loanholders"] = converted_data

            cursor.execute('select * from LOAN_PAYMENT')
            converted_data = query_to_json(cursor)
            results["loanpayments"] = converted_data

    except Error as e:
        print("Error while connecting to MySQL", e)

    finally:
        cursor.close()
        conn.close()

    jsonified = json.dumps(results)
    return jsonified, 200


@app.post('/addcustomer')
def addcustomer():
    if request.is_json:
        row = request.get_json()
        acc_query = ''
        if row['accounttype'] == 'SAVINGS':
            acc_query = f'''INSERT INTO ACCOUNT ()
                VALUES ('{row['accountno']}','{row['accounttype']}','{row['branchname']}',{row['balance']},{row['interestrate']},NULL)'''
        else:
            acc_query = f'''INSERT INTO ACCOUNT ()
                VALUES ('{row['accountno']}','{row['accounttype']}','{row['branchname']}',{row['balance']},NULL,{row['overdraftamount']})'''
        statements = [
            f'''INSERT INTO CUSTOMER ()
                VALUES ('{row['ssn']}','{row['name']}','{row['address']}','{row['street']}','{row['city']}','{row['essn']}','{row['associatetype']}')''',
            acc_query,
            f'''INSERT INTO ACCOUNT_HOLDER ()
                VALUES ('{row['ssn']}','{row['accountno']}',CURRENT_DATE )''',
            f'''INSERT INTO LOAN ()
                VALUES ('{row['loanno']}','{row['branchname']}',{row['loanamount']})''',
            f'''INSERT INTO LOAN_HOLDER ()
                VALUES ('{row['loanno']}','{row['ssn']}')'''
        ]
        connect_execute(statements)
        return '{"message":"Success"}', 201


@app.post('/addloan')
def addloan():
    if request.is_json:
        row = request.get_json()
        statements = [
            f'''INSERT INTO LOAN ()
                VALUES ('{row['loanno']}','{row['branchname']}',{row['loanamount']})''',
            f'''INSERT INTO LOAN_HOLDER ()
                VALUES ('{row['loanno']}','{row['customerssn']}')'''
        ]
        connect_execute(statements)
        return '{"message":"Success"}', 201


@app.post('/addmanager')
def addmanager():
    if request.is_json:
        row = request.get_json()
        statements = [f'''INSERT INTO EMPLOYEE ()
                VALUES ('{row['ssn']}','{row['name']}','{row['telephoneno']}','{row['managerssn']}','{row['startdate']}','{row['branchname']}',TRUE)''']
        connect_execute(statements)
        return '{"message":"Success"}', 201


@app.post('/addloanpayment')
def addloanpayment():
    if request.is_json:
        row = request.get_json()
        statements = [f'''INSERT INTO LOAN_PAYMENT (LOAN_NO, PAYMENT_DATE, AMOUNT)
                VALUES ('{row['loanno']}',CURRENT_DATE ,{row['amount']})''']
        connect_execute(statements)
        return '{"message":"Success"}', 201


@app.post('/addsavingsaccount')
def addsavingsaccount():
    if request.is_json:
        row = request.get_json()
        statements = [f'''INSERT INTO ACCOUNT ()
                VALUES ('{row['accountno']}','SAVINGS','{row['branchname']}',{row['balance']},{row['interestrate']},NULL)''',
                      f'''INSERT INTO ACCOUNT_HOLDER ()
                VALUES ('{row['customerssn']}','{row['accountno']}',CURRENT_DATE )'''
                      ]
        connect_execute(statements)
        return '{"message":"Success"}', 201


@app.post('/addbranch')
def addbranch():
    if request.is_json:
        row = request.get_json()
        statements = [f'''INSERT INTO BRANCH ()
                VALUES ('{row['branchname']}',{row['bankid']},'{row['city']}')''']
        connect_execute(statements)
        return '{"message":"Success"}', 201


# endregion
app.run()
