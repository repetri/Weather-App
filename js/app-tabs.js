// First of all, we need to initialize/enable Framework7 Vue plugin:
// We need to pass Framework7Vue plugin and Framework7 as an arguments to Vue.use method

var chartOptions = {
    scales: {
        yAxes: [{
            ticks: {
                fontColor: '#FDFDFD',
                fontSize: 10
            },
            gridLines: {
                color: '#6D6D6D'
            }
        }],
        xAxes: [{
            ticks: {
                fontColor: '#FDFDFD',
                fontSize: 10
            },
            gridLines: {
                color: "#6D6D6D"
            }
        }]
    },
    legend: {
        display: false
    },
    elements: {
        point: {
            radius: 0
        }
    }
};



Vue.use(Framework7Vue, Framework7);

//http://api.wunderground.com/api/c6e1c7dd478fbb42/conditions/q/NL/ijsselstein.json

// Init Vue App
var App = new Vue({
  // App Root Element
  el: '#app',
  // Init Framework7. All Framework7 parameters should be passed in "framework7" property, e.g.:
  framework7: {
    // Array with app routes
    routes: [],
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // ...
  },
  // App root data
  data: {
      locationLatLon: {},
      locationText: {},
      today: {
          current_observation: {
              observation_location:{}
          }
      },
      upcomming: {
        forecast: [{}, {}, {}, {}]
    },
    WeatherWarnings: {
        alerts: [],
        text:''
    },
    graphData: {
        time: [],
        temperature: [],
        humidity:[],
        pressure:[],
        windspeed:[]
    }
  },
  mounted: function(){
      document.addEventListener('locationFound', function(){
          App.loadToday();
          App.loadUpcomming();
          App.loadWeatherWarnings();
          setInterval(App.loadToday, 600000);
          setInterval(App.loadUpcomming,600000);
          setInterval(App.loadWeatherWarnings,600000);
      });
      this.fetchCoords();
      document.addEventListener('newHistoryData', this.renderGraphs);
      this.graphData.time = (JSON.parse(localStorage.getItem('timeData')) != null) ? JSON.parse(localStorage.getItem('timeData', '[]')) : [];
      this.graphData.temperature = (JSON.parse(localStorage.getItem('temperatureData')) != null) ? JSON.parse(localStorage.getItem('temperatureData')) : [];
      this.graphData.humidity = (JSON.parse(localStorage.getItem('humidityData')) != null) ? JSON.parse(localStorage.getItem('humidityData')) : [];
      this.graphData.pressure = (JSON.parse(localStorage.getItem('pressureData')) != null) ? JSON.parse(localStorage.getItem('pressureData')) : [];
      this.graphData.windspeed = (JSON.parse(localStorage.getItem('windspeedData')) != null) ? JSON.parse(localStorage.getItem('windspeedData')) : [];
  },
  // App root methods
  methods: {
      fetchCoords: function(){
          navigator.geolocation.getCurrentPosition(
                function(position){
                    App.locationLatLon = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                    App.fetchLocation();
                },
                function(){
                    App.locationLatLon = {
                        latitude: '52.0177649',
                        longitude: '5.0403003'
                    };
                    App.fetchLocation();
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
      },
      convertForecastData: function(data, path){
          var forecast = {
              dayOfWeek: data.date.weekday,
              icon: data.icon,
              tempHigh: data.high.celsius,
              tempLow: data.low.celsius,
              expcetedConditions: data.conditions,
              humid: data.avehumidity,
              dayDownpoor: (data.qpf_day.mm == null) ? 0 : data.qpf_day.mm,
              nightDownpoor: data.qpf_night.mm,
              WindDirection: data.avewind.dir,
              WindDirDegrees: data.avewind.degrees,
              WindAveSpeed: data.avewind.kph,
              WindGustSpeed: data.maxwind.kph,
              currentDate: [data.date.day, data.date.monthname_short, data.date.year].toString().replace(/,/g,"-")

          };
          App.upcomming.forecast[path] = forecast;
          console.log('test');
      },
      fetchLocation: function(){
          App.$f7.request.get('http://api.wunderground.com/api/c6e1c7dd478fbb42/geolookup/q/' + App.locationLatLon.latitude + ',' +  App.locationLatLon.longitude + '.json', function(data){
              data = JSON.parse(data);
              App.locationText = data.location;
              document.dispatchEvent(new Event('locationFound'));
          });
      },
      loadToday: function(){
          App.$f7.request.get('http://api.wunderground.com/api/c6e1c7dd478fbb42/conditions/lang:NL/q/' + this.locationText.country + '/' + this.locationText.city + '.json', function(data){
              App.today = JSON.parse(data);

              var date = new Date();
              var hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
              var minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
              App.graphData.time.push(hours + ':' + minutes);
              App.graphData.temperature.push(App.today.current_observation.temp_c);
              App.graphData.humidity.push(parseInt(App.today.current_observation.relative_humidity.replace('%', '')));
              App.graphData.pressure.push(parseInt(App.today.current_observation.pressure_mb));
              App.graphData.windspeed.push(App.today.current_observation.wind_kph);
              localStorage.setItem('timeData', JSON.stringify(App.graphData.time));
              localStorage.setItem('temperatureData', JSON.stringify(App.graphData.temperature));
              localStorage.setItem('humidityData',JSON.stringify(App.graphData.humidity));
              localStorage.setItem('pressureData',JSON.stringify(App.graphData.pressure));
              localStorage.setItem('windspeedData',JSON.stringify(App.graphData.windspeed));
              if(App.graphData.time.length > 144){
                  App.graphData.time.shift();
                  App.graphData.temperature.shift();
                  App.graphData.humidity.shift();
                  App.graphData.pressure.shift();
                  App.graphData.windspeed.shift();
              }
              document.dispatchEvent(new Event('newHistoryData'));

          });
      },
      loadUpcomming: function(){
          App.$f7.request.get('http://api.wunderground.com/api/c6e1c7dd478fbb42/forecast/lang:NL/q/' + this.locationText.country + '/' + this.locationText.city + '.json', function(data){
                data = JSON.parse(data);
                for(i = 0; i < data.forecast.simpleforecast.forecastday.length; i++){
                    App.convertForecastData(data.forecast.simpleforecast.forecastday[i], i);
                }
          });

      },
      loadWeatherWarnings: function(){
          App.$f7.request.get('http://api.wunderground.com/api/c6e1c7dd478fbb42/alerts/lang:NL/q/NL/ijsselstein.json', function(data){
              data = JSON.parse(data);



            if(data.alerts.length === 0){
                  App.WeatherWarnings.text = 'No weather warninings are currently issued. This may change so keep updated via local infromation sources ';
              }
              else{
              App.WeatherWarnings = data;
            }
          });
      },

      renderGraphs: function(){
          var ctx = document.getElementById('tempChart');
                    new Chart(ctx, {
                        type: 'line',
                        data: {
                                labels: App.graphData.time,
                                datasets: [{
                                    data: App.graphData.temperature,
                                    borderColor: '#2DFF00'
                                }]
                            },
                            options: chartOptions
                        });
         var ctx = document.getElementById('HumChart');
                    new Chart(ctx, {
                        type: 'line',
                        data: {
                                labels: App.graphData.time,
                                datasets: [{
                                    data: App.graphData.humidity,
                                    borderColor: '#2DFF00'
                                 }]
                            },
                            options: chartOptions
                        });
        var ctx = document.getElementById('PresChart');
                    new Chart(ctx, {
                        type: 'line',
                        data: {
                                labels: App.graphData.time,
                                datasets: [{
                                    data: App.graphData.pressure,
                                    borderColor: '#2DFF00'
                                }]
                            },
                            options: chartOptions
                        });
        var ctx = document.getElementById('WindChart');
                    new Chart(ctx, {
                        type: 'line',
                        data: {
                                labels: App.graphData.time,
                                datasets: [{
                                    data: App.graphData.windspeed,
                                    borderColor: '#2DFF00'
                                }]
                          },
                          options: chartOptions
                        });
      }
  }
});
