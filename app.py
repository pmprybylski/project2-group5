from flask_cors import CORS 

import numpy as np

import psycopg2 
from config import *

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import datetime as dt

from flask import Flask, jsonify


"""
Database Setup
"""

conn_string = f"host=localhost dbname={dbname} user={user} password={password}"
conn = psycopg2.connect(conn_string)

cursor = conn.cursor()

# Grab each table and put into list
select_tables = [
    "select * from squirrel_interact", 
    "select * from squirrel_loc", 
    "select * from squirrel_map_loc", 
    "select * from squirrel_mod"
    ]

squirrel_tables = [] 
for select_table in select_tables:
    cursor.execute(select_table)
    table = cursor.fetchall()
    squirrel_tables.append(table)


"""
Flask Setup
"""
app = Flask(__name__)
CORS(app) 

"""
Flask Routes
"""
@app.route("/")
def home():

    return(
        f'Flask Routes:<br/>'
        f'/squirrels_location<br/>'
        f'/map_squirrels_location<br/>' 
        f'/map_friendly_squirrels<br/>'
        f'/plot_squirrel_colors'
        )


@app.route("/squirrels_location")
def location():
    
    location = squirrel_tables[1]

    location_list = []
    for row in location:
        dict3 = {}
        dict3["lng"] = row[0]
        dict3["lat"] = row[1] 
        dict3["unique_squirrel_id"] = row[2] 
        dict3["date"] = row[3]
        dict3["lng_lat"] = row[4]
        location_list.append(dict3)
    
    """
    Return the JSON representation of data.
    """
    print("Server recieved request...")
    return jsonify(location_list)

@app.route("/map_squirrels_location")
def map_location():
    
    map_location = squirrel_tables[2]

    map_location_list = []
    for row in map_location:
        dict4 = {}
        dict4["lng"] = row[0]
        dict4["lat"] = row[1] 
        dict4["unique_squirrel_id"] = row[2] 
        dict4["date"] = row[3]
        dict4["hectare"] = row[4]
        dict4["hectare_squirrel_no"] = row[5]
        dict4["lng_lat"] = row[6]
        map_location_list.append(dict4)

    """
    Return the JSON representation of data.
    """
    print("Server recieved request...")
    return jsonify(map_location_list)

@app.route("/map_friendly_squirrels")
def friendly():

    friendly = squirrel_tables[0]

    friendly_list = []
    for row in friendly:
        dict2 = {}
        dict2["lng"] = row[0]
        dict2["lat"] = row[1] 
        dict2["unique_squirrel_id"] = row[2] 
        dict2["date"] = row[3]
        dict2["approaches"] = row[4]
        dict2["indifferent"] = row[5]
        dict2["runs_from"] = row[6]
        dict2["lng_lat"] = row[7]
        friendly_list.append(dict2)

    """
    Return the JSON representation of data.
    """
    print("Server recieved request...")
    return jsonify(friendly_list)

@app.route("/plot_squirrel_colors")
def colors():

    squirrel_color = squirrel_tables[3]

    demo_list = []
    for row in squirrel_color:
        dict1 = {}
        dict1["lng"] = row[0]
        dict1["lat"] = row[1]
        dict1["unique_squirrel_id"] = row[2] 
        dict1["hectare"] = row[3]
        dict1["shift"] = row[4]
        dict1["date"] = row[5]
        dict1["hectare_squirrel_no"] = row[6]
        dict1["age"] = row[7]
        dict1["primary_fur_color"] = row[8]        
        dict1["highlight_fur_color"] = row[9] 
        dict1["combination_colors"] = row[10]
        dict1["color_notes"] = row[11]
        dict1["approaches"] = row[12]
        dict1["indifferent"] = row[13]
        dict1["runs_from"] = row[14]        
        dict1["other_interactions"] = row[15]
        dict1["lng_lat"] = row[16]
        demo_list.append(dict1)

    """
    Return the JSON representation of data.
    """
    print("Server recieved request...")
    return jsonify(demo_list)


if __name__ == "__main__":
    app.run(debug=True)
