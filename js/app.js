// First of all, we need to initialize/enable Framework7 Vue plugin:
// We need to pass Framework7Vue plugin and Framework7 as an arguments to Vue.use method
Vue.use(Framework7Vue, Framework7);

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

  },
  mounted: function(){
  },
  // App root methods
  methods: {

  }
});
