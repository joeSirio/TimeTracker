import os
import psycopg2

conn = psycopg2.connect(
        host="localhost",
        database="timeTracker",
        user="timetrackeradmin",
        password="pwpw123")

# Open a cursor to perform database operations
cur = conn.cursor()

cur.execute('Select')

# Execute a command: this creates a new table
cur.execute('DROP TABLE IF EXISTS books;')
cur.execute('CREATE TABLE users (id serial PRIMARY KEY,'
                                 'name varchar (150) NOT NULL,'
                                 'email varchar (255) NOT NULL,'
                                 'password varchar(255) NOT NULL,'
                                 'token varchar(255) NOT NULL,'
                                 'date_added date DEFAULT CURRENT_TIMESTAMP);'
                                 )

# Insert data into the table

cur.execute('INSERT INTO books (title, author, pages_num, review)'
            'VALUES (%s, %s, %s, %s)',
            ('A Tale of Two Cities',
             'Charles Dickens',
             489,
             'A great classic!')
            )


cur.execute('INSERT INTO books (title, author, pages_num, review)'
            'VALUES (%s, %s, %s, %s)',
            ('Anna Karenina',
             'Leo Tolstoy',
             864,
             'Another great classic!')
            )

conn.commit()

cur.close()
conn.close()