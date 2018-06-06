dataStore.location = {};
dataStore.isScrollable = false;

Vue.use(Framework7Vue, Framework7);

var App = new Vue({
  // App Root Element
  el: '#app',
  // Init Framework7. All Framework7 parameters should be passed in "framework7" property, e.g.:
  framework7: {
    // Array with app routes
    routes: [
        {
            path:'/forecast/',
            component:'forecast'
        },
        {
            path:'/current/',
            component:'current'
        },
        {
            path:'/history/',
            component:'history'
        },
        {
            path:'/warnings/',
            component:'warnings'
        }
    ],
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

      },
    WeatherWarnings: {

    }
  },
mounted: function(){
  document.addEventListener('locationFound', function(){});
  this.fetchCoords();
  this.$f7.tab.show('#tab1', false);
  this.APICall();

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

    APICall: function(){
        setInterval(function(){
            document.dispatchEvent(new Event('CurrentCall'));
            document.dispatchEvent(new Event('ForecastCall'));
            document.dispatchEvent(new Event('HistoryCall'));
            document.dispatchEvent(new Event('WarningCall'));
        },600000);
    },

    fetchLocation: function(){
        App.$f7.request.get('http://api.wunderground.com/api/c6e1c7dd478fbb42/geolookup/q/' + App.locationLatLon.latitude + ',' +  App.locationLatLon.longitude + '.json', function(data){
            data = JSON.parse(data);
            dataStore.location = data.location;
            document.dispatchEvent(new Event('locationFound'));
        });
    },
    scrollToTop: function(){
        var elements = document.getElementsByClassName('view-main');
        elements[0].scrollTo(0,0);
    }
  }
});
