// Other vendors for example jQuery, Lodash or Bootstrap
import "lodash";

// Angular 2
import "@angular/platform-browser";
import "@angular/platform-browser-dynamic";
import "@angular/core";
import "@angular/common";
import "@angular/http";
import "@angular/router";

// RxJS
import "rxjs";

// global JS libraries
const localforage = require("localforage");
(<any>window).localforage = localforage;

// here temporarily since not everything is in webpack yet and cannot resolve jQuery
// inject jQuery into the global namespace
const jQuery = require("jquery");
(<any>window).$ = jQuery;
(<any>window).jQuery = jQuery;

const moment = require("moment");
(<any>window).moment = moment;

// import css, styles and other assets here
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap-theme.min.css";
import "font-awesome/css/font-awesome.min.css";
