import pymysql

try:
    connection = pymysql.connect(
        host='localhost',
        user='todo_user',
        password='12341234',
        database='bootcamp_todo_app'
    )
    print("✅ Connection successful!")
    connection.close()
except Exception as e:
    print(f"❌ Connection failed: {e}")