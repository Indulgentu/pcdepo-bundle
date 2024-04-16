// Stylesheets
import './main.scss';

// Typescript/Javascript
import './util.js';
window.$ = require( "jquery" );
require("98.css");
require("slick-carousel");

// import all files under the components directory
//import '../components/helloworld/_helloWorld.js';
// import all files under the components directory
function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('../components/', true, /\.js$/));
