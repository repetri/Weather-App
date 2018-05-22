dataStore.forecast =  [{}, {}, {}, {}];

Vue.component('forecast',{
    template: '\
    <f7-page class="page-forecast">\
    <f7-row>\
        <f7-col v-for="day in forecast" width="50" tablet-width="25">\
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
    </f7-page>\
    ',
    data: function(){
        return dataStore
    }
});
