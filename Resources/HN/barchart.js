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

    // juvenile data
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



