dataStore.today = {};

Vue.component('current',{
    template:'\
<f7-page name="current">\
    <i v-bind:class="[\'wu\', \'wu-white\', \'wu-256\', \'wu-\' + today.current_observation.icon]"></i>\
        <f7-row>\
            <f7-col width="70" tablet-width="60" desktop-width="100">\
                <f7-card title="Station informatie">\
                    <f7-list>\
                        <f7-list-item title="Station:">{{today.current_observation.station_id}}</f7-list-item>\
                        <f7-list-item title="locatie:">{{today.current_observation.observation_location.full}}{{today.current_observation.observation_location.country}}</f7-list-item>\
                        <f7-list-item title="Geupdate op:">{{Date(today.current_observation.observation_epoch)}}</f7-list-item>\
                    </f7-list>\
                </f7-card>\
                <f7-card title="Huidige weer data">\
                    <f7-list>\
                        <f7-list-item title="Omstandigheden:">{{today.current_observation.weather}}</f7-list-item>\
                        <f7-list-item title="Tempratuur:">{{ today.current_observation.temp_c }} °C</f7-list-item>\
                        <f7-list-item title="Gevoels tempratuur:">{{today.current_observation.feelslike_c}} °C</f7-list-item>\
                        <f7-list-item title="Windchill:">{{today.current_observation.windchill_c}} °C</f7-list-item>\
                        <f7-list-item title="Neerslag in 1 uur:">{{today.current_observation.precip_1hr_metric}} mm</f7-list-item>\
                        <f7-list-item title="Totale neerslag vandaag:">{{today.current_observation.precip_today_metric}} mm</f7-list-item>\
                        <f7-list-item title="Luchtvochtigheid:">{{today.current_observation.relative_humidity}}</f7-list-item>\
                        <f7-list-item title="Windrichting:">{{today.current_observation.wind_dir}}</f7-list-item>\
                        <f7-list-item title="Windrichting in graden:">{{today.current_observation.wind_degrees}} °</f7-list-item>\
                        <f7-list-item title="Windsnelheid:">{{today.current_observation.wind_kph}} km/h</f7-list-item>\
                        <f7-list-item title="Snelheid windstoten:">{{today.current_observation.wind_gust_kph}} km/h</f7-list-item>\
                        <f7-list-item title="Luchtdruk:">{{today.current_observation.pressure_mb}} milibar</f7-list-item>\
                        <f7-list-item title="Zicht:">{{today.current_observation.visibility_km}} km</f7-list-item>\
                        <f7-list-item title="Zonnestraling:">{{today.current_observation.solarradiation}} W/m²</f7-list-item>\
                        <f7-list-item title="UV-index:">{{today.current_observation.UV}}</f7-list-item>\
                        <f7-list-item title="Dauwpunt:">{{today.current_observation.dewpoint_c}} °C</f7-list-item>\
                        <f7-list-item title="Hitte-index">{{today.current_observation.heat_index_c}} °C</f7-list-item>\
                    </f7-list>\
                </f7-card>\
            </f7-col>\
        </f7-row>\
</f7-page>\
',
data: function(){
    return dataStore
}
});
