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

Extra JS Library: Chart.js



<hr>

<h1>Preview</h1>

![image](https://user-images.githubusercontent.com/73491575/115639418-86095800-a2e2-11eb-8170-fe8f82f5e772.png)



<h4>Requirements:</h4>
 * Download and install PostgreSQL, create a database 'squirrel_census' (retain database username and password for later step)<br>
 * Obtain an API Key for Mapbox (https://docs.mylistingtheme.com/article/how-to-generate-a-mapbox-api-key/)
  
<h4>Steps to launch:</h4>
* Use squirrel_census_dataframes.ipynb to convert data from csv to database tables inserted in to the squirel_census PostgreSQL database<br>
* Add PostgreSQL squirrel_census database username and password to config/config.py in Visual Studio Code<br>
* Add Mapbox API key to js/config.js in Visual Studio Code<br>
* Run flask app in app.py to start local server in Visual Studio Code<br>
* Use python -m http.server to open the project in an Integrated Terminal in Visual Studio Code<br>
* Open http://localhost:8000 to view the website

  
<h4>Page Features:</h4>
  * Selecting a squirrel from the dropdown list populates detailed information about that squirrel and marks the map with the site where the squirrel was spotted<br>
  * Donut chart features a breakdown of primary fur color types<br>
  * Bar chart compares squirrel based on age group and time of day<br>
  * Use the button in the top left to generate a new fun fact about squirrels
 
<h4>Acknowledgements and thanks to:</h4>
 	The Squirrel Census (https://thesquirrelcensus.com/)<br>
	Start Bootstrap/SB-Admin (https://startbootstrap.com/template/sb-admin)<br>
	Icons 8 (https://icons8.com)
