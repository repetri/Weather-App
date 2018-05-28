dataStore.forecast = {
    days: []
};

Vue.component('forecast',{
    template: '\
    <div class="page">\
    <f7-row>\
        <f7-col v-for="day in forecast.days" width="100" tablet-width="25">\
            <f7-card v-bind:title="day.dayOfWeek" v-bind:footer="day.currentDate">\
                <f7-list>\
                    <f7-list-item><i v-bind:class="[\'wu\', \'wu-white\', \'wu-64\', \'wu-\'+day.icon]"></i></f7-list-item>\
                    <f7-list-item title="Weersverwachting:">{{day.expcetedConditions}}</f7-list-item>\
                    <f7-list-item title="Tempratuur dag:">{{ day.tempHigh }} &deg; C</f7-list-item>\
                    <f7-list-item title="Tempratuur nacht:">{{day.tempLow}} &deg; C</f7-list-item>\
                    <f7-list-item title="Luchtvochtigheid:">{{day.humid}} %</f7-list-item>\
                    <f7-list-item title="Neerslag dag:">{{day.dayDownpoor}} mm</f7-list-item>\
                    <f7-list-item title="Neerslag nacht:">{{day.nightDownpoor}} mm</f7-list-item>\
                    <f7-list-item title="Windrichting:">{{day.WindDirection}}</f7-list-item>\
                    <f7-list-item title="Windrichting in graden:">{{day.WindDirDegrees}} &deg; </f7-list-item>\
                    <f7-list-item title="Windsnelheid:">{{day.WindAveSpeed}} km/h</f7-list-item>\
                    <f7-list-item title="Snelheid windstoten:">{{day.WindGustSpeed}} km/h</f7-list-item>\
                </f7-list>\
            </f7-card>\
        </f7-col>\
    </f7-row>\
    </div>\
',

data: function(){
    return dataStore
},

mounted: function(){
    if(dataStore.location.city !== undefined){
        this.loadForecast();
        setInterval(this.loadForecast, 600000);
    }
    else{
        var instance = this;
        document.addEventListener('locationFound', function(){
            instance.loadForecast();
            setInterval(this.loadForecast, 600000);
        });
  }
},

methods: {
loadForecast: function(){
    var instance = this;
    App.$f7.request.get('http://api.wunderground.com/api/c6e1c7dd478fbb42/forecast/lang:NL/q/' + dataStore.location.country + '/' + dataStore.location.city + '.json', function(data){
        dataStore.forecast.days = [];
        data = JSON.parse(data);
        for(i = 0; i < data.forecast.simpleforecast.forecastday.length; i++){
            instance.convertForecastData(data.forecast.simpleforecast.forecastday[i], i);
        }
    });
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
    dataStore.forecast.days.push(forecast);
    }
  }
});
