from config import user
from config import password
import numpy as np

import psycopg2 

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import datetime as dt

from flask import Flask, jsonify


"""
Database Setup
"""
conn = psycopg2.connect("dbname=squirrel_census user={user} password={password}")

cursor = conn.cursor()

postgreSQL_select_Query = "select * from squirrel_interact"

cursor.execute(postgreSQL_select_Query)

interact = cursor.fetchall()


"""
Flask Setup
"""
app = Flask(__name__)


"""
Flask Routes
"""
@app.route("/")
def home():

    test_list = []
    for row in interact:
        dict = {}
        dict["id"] = row[2]
        test_list.append(dict)


    """
    Return the JSON representation of test data.
    """
    print("Server recieved request...")
    return jsonify(test_list)
    





if __name__ == "__main__":
    app.run(debug=True)
