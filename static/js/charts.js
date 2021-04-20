// DEMOGRAPHICS TABLE & MAP
//Default Map
let map =  L.map('parkmap', {
      center: [40.785091, -73.968285],
      zoom: 14
})

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 20,
      zoomOffset: -1,
      id: "mapbox/satellite-v9",
      accessToken: API_KEY
}).addTo(map);

//Function
function handleSubmit() {
      d3.event.preventDefault();
}

//Bring in and sort data
d3.json("http://127.0.0.1:5000/plot_squirrel_colors").then((dataFile) => {
      optionsSorted = 
      dataFile.sort((a, b) => 
      {return a.unique_squirrel_id > b.unique_squirrel_id;
      });

      //Define options sorted for dropwdown
      const options = optionsSorted.map(({unique_squirrel_id}) => unique_squirrel_id);

      //Select Element
      var select = document.getElementById("selDataset"); 

      //Create options for dropdown
      for(var i = 0; i < options.length; i++) {
            var opt = options[i];
            var el = document.createElement("option");
            el.text = opt;
            el.value = i;
            select.add(el);
      }

      //Onchange load info
      d3.selectAll("body").on("change", optionChanged);

      function optionChanged() {
            var i = d3.select("#selDataset").property("value")
            var uniqueID = optionsSorted[i].unique_squirrel_id
            var age = optionsSorted[i].age
            var primaryFurColor = optionsSorted[i].primary_fur_color
            var highlightFurColor = optionsSorted[i].highlight_fur_color
            var shift = optionsSorted[i].shift
            var lat = optionsSorted[i].lat
            var lng = optionsSorted[i].lng
            var colorNotes = optionsSorted[i].color_notes
            var indifferent = optionsSorted[i].indifferent
            var approaches = optionsSorted[i].approaches
            var date = optionsSorted[i].date

            //If/then options to replace NULL & True/False
            if (age === null) {
                  age = "We couldn't tell!";
            } else {
                  age = age
            }

            if (primaryFurColor === null) {
                  primaryFurColor = "We couldn't decide!"
            } else {
                  primaryFurColor = primaryFurColor
            }

            if (highlightFurColor === null) {
                  highlightFurColor = "No highlights to speak of!"
            } else {
                  highlightFurColor = highlightFurColor
            }

            if (shift === "AM") {
                  shift = "Morning Shift"
            } else {
                  shift = "Night Shift"
            }

            if (colorNotes === null) {
                  colorNotes = "No, nothing special"
            } else {
                  colorNotes = colorNotes
            }

            if (indifferent === true) {
                  indifferent = "Yeah, could care less"
            } else {
                  indifferent = "No, people are fascinating"
            }

            if (approaches === true) {
                  approaches = "Yes"
            } else {
                  approaches = "Nah"
            }

            //Info to fill demographics box
            const panelFiller =  ( `<strong>Squirrel No:</strong> <br>${uniqueID} <br>
                  <br>
                  <strong> Primary Color:</strong>  <br>${primaryFurColor} <br>
                  <br>
                  <strong> Highlight Fur Color:</strong><br>${highlightFurColor} <br> 
                  <br>
                  <strong> Anything special about the colors?</strong> <br>${colorNotes} <br>
                  <br>
                  <strong> Age:</strong> <br> ${age} <br>
                  <br>
                  <strong> Spotted on: </strong> <br>${date} <br>
                  <br>
                  <strong> Seen during the:</strong> <br>${shift} <br>
                  <br>
                  <strong> More or less indifferent to people?</strong> <br>${indifferent} <br>
                  <br>
                  <strong> Likely to approach people?</strong> <br>${approaches} <br>` 
                  )
            //Add info to demographics box               
            document.getElementById("demographicsbox").innerHTML = panelFiller

            //Add map
            document.getElementById('parkmap').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";

            //Create map to be used with marker
            let map =  L.map('map', {
                  center: [40.775112516678, -73.9762965341309],
                  zoom: 14
            })

            //Tile layer for map
            L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
                  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
                  tileSize: 512,
                  maxZoom: 18,
                  zoomOffset: -1,
                  id: "mapbox/satellite-v9",
                  accessToken: API_KEY
            }).addTo(map);

            //Create marker       
            var locationIcon = L.icon({
                  iconUrl: 'https://img.icons8.com/color/48/000000/nut.png',
                  iconSize:     [25, 25], 
            });

            //Place marker
            var marker = L.marker([lat, lng], {icon: locationIcon}).addTo(map)
            map.panTo(marker.getLatLng())
      }
})

// SQUIRREL MARKINGS CHART
// Read in data
d3.json('http://127.0.0.1:5000/plot_squirrel_colors').then(colordata => {
      console.log(colordata)

      // Filter to get fur color fields
      var gray = colordata.filter(color => color.primary_fur_color == 'Gray').length
      var cinnamon = colordata.filter(color => color.primary_fur_color == 'Cinnamon').length
      var black = colordata.filter(color => color.primary_fur_color == 'Black').length
      var unknown = colordata.filter(color => color.primary_fur_color == null).length

      // Generate doughnut chart using Chart.js
      var ctx = document.getElementById('colorMarkingsChart')
      var colorMarkingsChart = new Chart(ctx, {
            type: 'doughnut',
            data:  {
                  labels: ['Gray','Cinnamon','Black','Unknown'],
                  datasets: [{
                        label: 'Squirrels by Primary Fur Color',
                        data: [gray, cinnamon, black, unknown],
                        backgroundColor: [
                              '#CFC291',
                              '#FF712C',
                              '#695D46',
                              '#A1E8D9'
                        ],
                  }],
            }
      })
})

// BAR CHART DATA
// ----------------
// Get Data
// ----------------
d3.json("http://127.0.0.1:5000/plot_squirrel_colors").then((data) => {

      var xBehavior = ['Approaches', 'Indifferent', "Runs From"]

      // Total Behavior Breakdown
      var yBehavior = []

      var filteredApproaches = data.filter(d => d.approaches === true)
      yBehavior.push(filteredApproaches.length)

      var filteredIndifferent = data.filter(d => d.indifferent === true)
      yBehavior.push(filteredIndifferent.length)

      var filteredRunsFrom = data.filter(d => d.runs_from === true)
      yBehavior.push(filteredRunsFrom.length)

      // Other Behavior Breakdowns
      filteredData = [filteredApproaches, filteredIndifferent, filteredRunsFrom]

      // juvenile data
      var yJuvenile = []
      filteredData.forEach((ds) => {
            jBehavior = ds.filter(j => j.age === "Juvenile")
            yJuvenile.push(jBehavior.length)
      })
      console.log(yJuvenile)

      // adult data
      var yAdult = []
      filteredData.forEach((ds) => {
            aBehavior = ds.filter(j => j.age === "Adult")
            yAdult.push(aBehavior.length)
      })

      // AM data
      var yAM = []
      filteredData.forEach((ds) => {
            amBehavior = ds.filter(j => j.shift === "AM")
            yAM.push(amBehavior.length)
      })

      // PM data
      var yPM = []
      filteredData.forEach((ds) => {
            pmBehavior = ds.filter(j => j.shift === "PM")
            yPM.push(pmBehavior.length)
      })

    //--------------------------------------
    //  Initialize page with a default plot
    // -------------------------------------
      function init() {
            data = [{
                  x: xBehavior,
                  y: yBehavior,
                  marker: {
                        color: '#A1E8D9'
                  },
                  type: "bar"
            }]     
            Plotly.newPlot("barchart", data)
      }

      // --------------------------------------------------
      // Call update() when a change takes place to the DOM
      // ---------------------------------------------------
      d3.selectAll("#selDemographics").on("change", update)

      function update() {
            var dropdown = d3.select("#selDemographics")
            var dataset = dropdown.property("value")

            var y = []

            if(dataset === "squirrelBehavior") {
                  y = yBehavior
            }
            else if (dataset === "juvenileBehavior") {
                  y = yJuvenile
            }
            else if (dataset === "adultBehavior") {
                  y = yAdult
            }
            else if (dataset === "amBehavior") {
                  y = yAM
            }
            else if (dataset === "pmBehavior") {
                  y = yPM
            }
            Plotly.restyle("barchart", "y", [y])
      }

      init()
})
