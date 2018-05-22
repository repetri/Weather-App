dataStore.history = {};

Vue.component('history',{
    template:'\
<f7-page class="page-history">\
    <f7-row>\
        <f7-col width="100" tablet-width="50">\
            <f7-card title="Grafiek tempratuur in &deg; C">\
                <div>\
                    <canvas id="tempChart"></canvas>\
                </div>\
            </f7-card>\
        </f7-col>\
        <f7-col width="100" tablet-width="50">\
            <f7-card title="Grafiek Luchtvochtigheid in %">\
                <div>\
                    <canvas id="HumChart"></canvas>\
                </div>\
            </f7-card>\
        </f7-col>\
    </f7-row>\
    <f7-row>\
        <f7-col width="100" tablet-width="50">\
            <f7-card title="Grafiek Luchtdruk in milibar">\
                <div>\
                    <canvas id="PresChart"></canvas>\
                </div>\
            </f7-card>\
        </f7-col>\
        <f7-col width="100" tablet-width="50">\
            <f7-card title="Grafiek Windsnelheid in km/h">\
                <div>\
                    <canvas id="WindChart"></canvas>\
                </div>\
            </f7-card>\
        </f7-col>\
    </f7-row>\
</f7-page>\
',
data: function(){
    return dataStore
    }
});
