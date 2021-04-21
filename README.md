# project2-group5
Data visualizations of the squirrel census

Data Set: New York City Squirrel Census
https://github.com/rfordatascience/tidytuesday/tree/master/data/2019/2019-10-29
https://data.cityofnewyork.us/Environment/2018-Central-Park-Squirrel-Census-Squirrel-Data/vfnx-vebw

Inspiration:
https://www.thesquirrelcensus.com/

Responsibilities:
* Cleaning Data and loading into db: Kristy
* Flask: Hope
* JS Visualization: Keri
* CSS/HTML: Pamela
Note: as tasks are finished, others will float to help.

Extra JS Library: TBA



<hr>

<h1>Preview</h1>

![image](https://user-images.githubusercontent.com/73491575/115479387-4f660b80-a216-11eb-80f7-4362442fa913.png)

Requirements:
  1. Download and install PostgreSQL, create a database ''squirrel_census' (retain database username and password for later step)
  2. Obtain an API Key for Mapbox (https://docs.mylistingtheme.com/article/how-to-generate-a-mapbox-api-key/)

Steps to launch:
  1. Use Jupyter Notebook, ipynb file, to convert data from csv to database tables inserted in to the squirells_census PostgreSQL database
  2. Use Visual Studio Code: <br>
        a. Add postrgres database user name and password to config/config.py<br>
        b. Add mpabox API key to js/config.js<br>
        c. Run flask app in app.py to start local server <br>
        d. Use python -m http.server to open the project in an Integrated Terminal <br>
   3. Open http://localhost:8000/ to view the website
 
Page Features:
  1. Selecting a squirrel from the dropdown list populates detailed information about that squirrel and marks the map with the site where the squirrel was spotted
  2. Donut chart features a breakdown of primary fur color types
  3. Bar chart compares squirrel based on age group and time of day
  4. Button for ---
