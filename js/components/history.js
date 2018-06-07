dataStore.history = {
    time: [],
    temperature: [],
    humidity:[],
    pressure:[],
    windspeed:[]
};

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

function loadHistory(){
    document.addEventListener('newHistoryData', renderGraphs());
    dataStore.history.time = (JSON.parse(localStorage.getItem('timeData')) != null) ? JSON.parse(localStorage.getItem('timeData', '[]')) : [];
    dataStore.history.temperature = (JSON.parse(localStorage.getItem('temperatureData')) != null) ? JSON.parse(localStorage.getItem('temperatureData')) : [];
    dataStore.history.humidity = (JSON.parse(localStorage.getItem('humidityData')) != null) ? JSON.parse(localStorage.getItem('humidityData')) : [];
    dataStore.history.pressure = (JSON.parse(localStorage.getItem('pressureData')) != null) ? JSON.parse(localStorage.getItem('pressureData')) : [];
    dataStore.history.windspeed = (JSON.parse(localStorage.getItem('windspeedData')) != null) ? JSON.parse(localStorage.getItem('windspeedData')) : [];
    renderGraphs();
};

function renderGraphs(){
    var ctx = document.getElementById('tempChart');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataStore.history.time,
            datasets: [{
                data: dataStore.history.temperature,
                borderColor: '#2DFF00'
            }]
        },
        options: chartOptions
    });

    var ctx = document.getElementById('HumChart');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataStore.history.time,
            datasets: [{
                data: dataStore.history.humidity,
                borderColor: '#2DFF00'
            }]
        },
        options: chartOptions
    });

    var ctx = document.getElementById('PresChart');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataStore.history.time,
            datasets: [{
                data: dataStore.history.pressure,
                borderColor: '#2DFF00'
            }]
        },
        options: chartOptions
    });

    var ctx = document.getElementById('WindChart');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataStore.history.time,
            datasets: [{
                data: dataStore.history.windspeed,
                borderColor: '#2DFF00'
            }]
        },
        options: chartOptions
    });
};


Vue.component('history',{
    template:'\
    <div class="page">\
        <f7-row>\
            <f7-col width="100" tablet-width="auto">\
                <f7-card title="Grafiek tempratuur in °C">\
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
</div>\
    ',

data: function(){
    return dataStore
},

mounted: function(){
    if(dataStore.isScrollable){
        App.scrollToTop();
    }
    loadHistory();
    document.addEventListener('HistoryCall',function(){
        loadHistory();
    });
    // document.addEventListener('newHistoryData',function(){
    //     renderGraphs();
    //     console.log("newHistoryData added");
    // });
},

methods:{

 }
});
