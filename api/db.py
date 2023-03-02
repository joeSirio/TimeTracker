import os
from datetime import date, datetime
import json
import psycopg2
from psycopg2 import Error


class Database(object):
    connection = None
    cursor = None

    def __init__(self):
        print(self)
        if Database.connection is None:
            try:
                # Database.connection = psycopg2.connect(host="localhost", user=os.environ['DB_USERNAME'], password=os.environ['DB_PASSWORD'], database="timeTracker")
                Database.connection = psycopg2.connect(host="localhost", user="timetrackeradmin", password="pwpw123", database="timeTracker")

                Database.cursor = Database.connection.cursor()
            except Exception as error:
                print("Error: Connection not established {}".format(error))
            else:
                print("Connection established")

        self.connection = Database.connection
        self.cursor = Database.cursor

db = Database()

def get_active_record(userId):
    query = """Select * From "TimeRecords" 
    Where "UserId" = %s AND "EndDateTime" Is NULL 
    Order By "Id" Desc"""

    try:
        db.cursor.execute(query, str(userId))
        result = db.cursor.fetchone()
        if result is not None:
            data =  {
                "Id": result[0],
                "Task": result[1],
                "Project": result[2],
                "Tags": result[3],
                "StartDateTime": result[4],
                "EndDateTime": result[5],
                "DurationMs": result[6]
            }
            return data
            # return json_dump_time_record(record)
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    data =  {
        "Id": 0,
        "Task": "",
        "Project": "",
        "Tags": [],
        "StartDateTime": "",
        "EndDateTime": "",
        "DurationMs": 0
    }
    return data

def get_time_records(userId):
    query = 'Select * From "TimeRecords" Where "UserId" = %s and "EndDateTime" Is Not NULL'

    try:
        db.cursor.execute(query, str(userId))
        results = db.cursor.fetchall()
        dto = []
        for result in results:
            data = {
                "Id": result[0],
                "Task": result[1],
                "Project": result[2],
                "Tags": result[3],
                "StartDateTime": result[4],
                "EndDateTime": result[5],
                "DurationMs": result[6]
            }
            dto.append(data)
            
        return dto
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        return []
    

def update_time_record(dto):
    print(dto)
    query = """Update "TimeRecords"
        Set "Task" = %s, "Project" = %s, "Tags" = %s, "StartDateTime" = %s, "EndDateTime" = %s, "DurationMs" = %s
        Where "Id" = %s
    """
    
    try:
        db.cursor.execute(query, (
            dto["task"], 
            dto["project"], 
            dto["tags"], 
            dto["startDateTime"], 
            dto["endDateTime"], 
            str(dto["duration"]),
            dto["id"]
        ))
        db.connection.commit()
        return {"success": True}
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        return {"success": False}

def add_time_record(dto):
    query = """INSERT INTO "TimeRecords"
    ("Task", "Project", "Tags", "StartDateTime", "UserId") 
    VALUES (%s,%s,%s,%s,%s)"""
    
    try:
        db.cursor.execute(query, (
            dto["task"], 
            dto["project"], 
            dto["tags"], 
            dto["startDateTime"], 
            dto["userId"]
        ))
        db.connection.commit()
        return True
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        return False

def remove_time_record(id: int):
    query = """Delete From "TimeRecords" Where "Id" = %s"""
    try:
        db.cursor.execute(query, str(id))
        db.connection.commit()
        return True
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        return False

def add_user(email, password):
    query = """Insert Into "Users" 
    (Email, Password)
    Values(%s, %s)"""
    try:
        db.cursor.execute(query, (email, password))
        db.connection.commit()
        return True
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        return False

# Json Functions
def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))

def json_dump_time_record(data):
    dto = json.dumps({
        "Id": data[0], 
        "Task": data[1], 
        "Project": data[2], 
        "Tags": data[3], 
        "StartDateTime": data[4], 
        "EndDateTime": data[5], 
        "DurationMs": data[6]
    }, default=json_serial)
    return dto

# Data Class
class TimeRecord:
    def __init__(self, task, project, tags, startDateTime, endDateTime, durationMs):
        self.task = task
        self.project = project
        self.tags = tags
        self.startDateTime = startDateTime
        self.endDateTime = endDateTime
        self.durationMs = durationMs