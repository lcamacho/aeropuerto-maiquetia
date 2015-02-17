'use strict';

/**
 * @ngdoc overview
 * @name aeropuertoMaiquetiaApp
 * @description
 * # aeropuertoMaiquetiaApp
 *
 * Main module of the application.
 */
angular
  .module('aeropuertoMaiquetiaApp', [
    'ngTouch'
  ])
  .value('baseURL', 'http://www.iaaim.com.ve/webservices/iaim_009253763/ws.php');
