dataStore.current = {
    current_observation: {
        observation_location: {}
    }
};

function loadCurrent(){
    App.$f7.request.get('http://api.wunderground.com/api/c6e1c7dd478fbb42/conditions/lang:NL/q/' + dataStore.location.country + '/' + dataStore.location.city + '.json', function(data){
        dataStore.current = JSON.parse(data);
        var date = new Date();
        var hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
        var minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
        dataStore.history.time.push(hours + ':' + minutes);
        dataStore.history.temperature.push(dataStore.current.current_observation.temp_c);
        dataStore.history.humidity.push(parseInt(dataStore.current.current_observation.relative_humidity.replace('%', '')));
        dataStore.history.pressure.push(parseInt(dataStore.current.current_observation.pressure_mb));
        dataStore.history.windspeed.push(dataStore.current.current_observation.wind_kph);
        localStorage.setItem('timeData', JSON.stringify(dataStore.history.time));
        localStorage.setItem('temperatureData', JSON.stringify(dataStore.history.temperature));
        localStorage.setItem('humidityData',JSON.stringify(dataStore.history.humidity));
        localStorage.setItem('pressureData',JSON.stringify(dataStore.history.pressure));
        localStorage.setItem('windspeedData',JSON.stringify(dataStore.history.windspeed));
        if(dataStore.history.time.length > 144){
            dataStore.history.time.shift();
            dataStore.history.temperature.shift();
            dataStore.history.humidity.shift();
            dataStore.history.pressure.shift();
            dataStore.history.windspeed.shift();
        }
        document.dispatchEvent(new Event('newHistoryData'));
    });
};

Vue.component('current',{
    template:'\
    <div class="page">\
    <f7-row>\
        <f7-col width="100" tablet-width="auto">\
            <i v-bind:class="[\'wu\', \'wu-white\', \'wu-256\', \'wu-\' + current.current_observation.icon]"></i>\
                <f7-card title="Station informatie">\
                    <f7-list>\
                        <f7-list-item title="Station:">{{current.current_observation.station_id}}</f7-list-item>\
                        <f7-list-item title="locatie:">{{current.current_observation.observation_location.full}}{{current.current_observation.observation_location.country}}</f7-list-item>\
                        <f7-list-item title="Geupdate op:">{{Date(current.current_observation.observation_epoch)}}</f7-list-item>\
                    </f7-list>\
                </f7-card>\
                <f7-card title="Huidige weer data">\
                    <f7-list>\
                        <f7-list-item title="Omstandigheden:">{{current.current_observation.weather}}</f7-list-item>\
                        <f7-list-item title="Tempratuur:">{{ current.current_observation.temp_c }} °C</f7-list-item>\
                        <f7-list-item title="Gevoels tempratuur:">{{current.current_observation.feelslike_c}} °C</f7-list-item>\
                        <f7-list-item title="Windchill:">{{current.current_observation.windchill_c}} °C</f7-list-item>\
                        <f7-list-item title="Neerslag in 1 uur:">{{current.current_observation.precip_1hr_metric}} mm</f7-list-item>\
                        <f7-list-item title="Totale neerslag vandaag:">{{current.current_observation.precip_today_metric}} mm</f7-list-item>\
                        <f7-list-item title="Luchtvochtigheid:">{{current.current_observation.relative_humidity}}</f7-list-item>\
                        <f7-list-item title="Windrichting:">{{current.current_observation.wind_dir}}</f7-list-item>\
                        <f7-list-item title="Windrichting in graden:">{{current.current_observation.wind_degrees}} °</f7-list-item>\
                        <f7-list-item title="Windsnelheid:">{{current.current_observation.wind_kph}} km/h</f7-list-item>\
                        <f7-list-item title="Snelheid windstoten:">{{current.current_observation.wind_gust_kph}} km/h</f7-list-item>\
                        <f7-list-item title="Luchtdruk:">{{current.current_observation.pressure_mb}} milibar</f7-list-item>\
                        <f7-list-item title="Zicht:">{{current.current_observation.visibility_km}} km</f7-list-item>\
                        <f7-list-item title="Zonnestraling:">{{current.current_observation.solarradiation}} W/m²</f7-list-item>\
                        <f7-list-item title="UV-index:">{{current.current_observation.UV}}</f7-list-item>\
                        <f7-list-item title="Dauwpunt:">{{current.current_observation.dewpoint_c}} °C</f7-list-item>\
                        <f7-list-item title="Hitte-index">{{current.current_observation.heat_index_c}} °C</f7-list-item>\
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
    if(dataStore.isScrollable){
        App.scrollToTop();
    }

    if(dataStore.location.city !== undefined){
        loadCurrent();
    }
    else{
        document.addEventListener('locationFound', function(){
            loadCurrent();
        });
    }
    document.addEventListener("CurrentCall", function(){
        loadCurrent();
    });
},

methods: {

    }
});
