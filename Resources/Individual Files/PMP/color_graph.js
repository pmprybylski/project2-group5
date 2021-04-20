
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

