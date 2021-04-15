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

# Grab each table and put into list
select_tables = ["select * from squirrel_interact", "select * from squirrel_loc", "select * from squirrel_map_loc", "select * from squirrel_mod"]

squirrel_tables = [] 
for select_table in select_tables:
    cursor.execute(select_table)
    table = cursor.fetchall()
    squirrel_tables.append(table)

"""
squirrel_tables cheat sheet: 
------------------------------
squirrel_tables[0] = squirrel_interact
row[0] = lat
row[1] = lng
row[2] = unique_squirrel_id
row[3] = date
row[4] = approaches
row[5] = indifferent
row[6] = runs_from
row[7] = lat_lng

squirrel_tables[1] = squirrel_loc
row[0] = lat
row[1] = lng
row[2] = unique_squirrel_id
row[3] = date
row[4] = lat_lng

squirrel_tables[2] = squirrel_map_loc
row[0] = lat
row[1] = lng
row[2] = unique_squirrel_id
row[3] = date
row[4] = hectare
row[5] = hectare_squirrel_no
row[6] = lat_lng

squirrel_tables[3] = squirrel_squirrel_mod
row[0] = lat
row[1] = lng
row[2] = unique_squirrel_id
row[3] = hectare
row[4] = shift
row[5] = date
row[6] = hectare_squirrel_no
row[7] = age 
row[8] = primary_fur_color
row[9] = highlight_fur_color
row[10] = combination_colors
row[11] = color_notes
row[12] = approaches
row[13] = indifferent
row[14] = runs_from
row[15] = other_interactions
row[16] = lat_lng

"""


"""
Flask Setup
"""
app = Flask(__name__)


"""
Flask Routes
"""
@app.route("/")
def home():

    return(
        f'Flask Routes:<br/>'
        f'/map_squirrels_location<br/>' 
        f'/map_friendly_squirrels<br/>'
        f'/plot_squirrel_colors'
        )


@app.route("/map_squirrels_location")
def location():
    
    location = squirrel_tables[1]
    
    map_location = squirrel_tables[2]

    
    """
    Return the JSON representation of data.
    """
    print("Server recieved request...")
    return jsonify(location)
    


@app.route("/map_friendly_squirrels")
def friendly():

    friendly = squirrel_tables[0]


    """
    Return the JSON representation of data.
    """
    print("Server recieved request...")
    return jsonify(friendly)


@app.route("/plot_squirrel_colors")
def colors():

    squirrel_color = squirrel_tables[3]

    """
    Return the JSON representation of data.
    """
    print("Server recieved request...")
    return jsonify(squirrel_color)


if __name__ == "__main__":
    app.run(debug=True)
