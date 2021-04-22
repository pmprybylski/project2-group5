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
  1. Download and install PostgreSQL, create a database 'squirrel_census' (retain database username and password for later step)<br>
  2. Obtain an API Key for Mapbox (https://docs.mylistingtheme.com/article/how-to-generate-a-mapbox-api-key/)
  
<h4>Steps to launch:</h4>
<ol>
  	<li>Use squirrel_census_dataframes.ipynb to convert data from csv to database tables inserted in to the squirel_census PostgreSQL database</li>
  	<li>Use Visual Studio Code:</li>
</ol>
	  <ul>	
	     <li>Add PostgreSQL squirrel_census database username and password to config/config.py</li>
	     <li>Add Mapbox API key to js/config.js</li>
	     <li>Run flask app in app.py to start local server</li>
	     <li>Use python -m http.server to open the project in an Integrated Terminal</li>
	  <ul/>
<ol start="3">
  	<li>Open http://localhost:8000/ to view the website</li>
</ol>

  
<h4>Page Features:</h4>
  1. Selecting a squirrel from the dropdown list populates detailed information about that squirrel and marks the map with the site where the squirrel was spotted<br>
  2. Donut chart features a breakdown of primary fur color types<br>
  3. Bar chart compares squirrel based on age group and time of day<br>
  4. Use the button in the top left to generate a new fun fact about squirrels
 
<h4>Acknowledgements and thanks to:<h4>
 	The Squirrel Census (https://thesquirrelcensus.com/)<br>
	Start Bootstrap/SB-Admin (https://startbootstrap.com/template/sb-admin)<br>
	Icons 8 (https://icons8.com)

  <ol>
    <li>Choose which type of game you want to play</li>
    <li>Press the spacebar to start the game
        <ul>
            <li>Controls for single player mode:
                <ul>
                    <li>W and S</li>
                    <li>&uarr; and &darr;</li>
                    <li>A and Z</li>
                    <li>' (apostrophe) and / (forward slash)</li>
                </ul>
            </li>
            <li>Controls for double player mode:
                <ul>
                    <li>The right player uses A and Z</li>
                    <li>The left player uses ' and /</li>
                </ul>
            </li>
        </ul>
    </li>
</ol
