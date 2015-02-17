'use strict';

/**
 * @ngdoc function
 * @name aeropuertoMaiquetiaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the aeropuertoMaiquetiaApp
 */
angular.module('aeropuertoMaiquetiaApp')
  .controller('Controller', function ($scope, $http, baseURL) {

    var body = document.querySelector('body');
    var ads = document.querySelector('.ads');
    var table = document.querySelector('.table-responsive');

    $scope.change = function(type) {
      window.requestAnimationFrame(function() {
        $scope.flights = [];
        var requestURL= baseURL + '?act=getCartelera%7C' + type;
        var strings = [];
        strings.L = 'Llegadas';
        strings.S = 'Salidas';
        strings.N = 'Nacionales';
        strings.I = 'Internacionales';


        $http.get(requestURL).success(function(data) {
          $scope.flights = data.cartelera;
        }).error(function(){
          console.error('Something wrong happened');
        });

        var parts = type.split('');
        $scope.area = strings[parts[0]] + ' ' + strings[parts[1]];

        $scope.type = type;
      });
    };

    $scope.getAirlineCode = function(flightNumber) {
      return flightNumber.slice(0,3).trim().toLowerCase();
    };

    $scope.getClass = function(flight) {
      if (flight.Vuelo.trim().indexOf(' ') !== -1) {
        var status = flight.Estado.trim();
        if (status === 'LLEGO' || status === 'SALIO') {
          return 'success';
        } else if (status === 'DEMORADO' || status === 'EMBARCANDO') {
          return 'warning';
        } else if (status === 'CANCELADO') {
          return 'danger';
        } else if (status === '') {
          return '';
        } else {
          return 'info';
        }
      }
      return 'hidden';
    };

    $scope.showInfo = function(flight) {
      document.querySelector('#info').className = 'current';
      document.querySelector('[data-position="current"]').className = 'left';
      $scope.flightInfo = flight;
      $scope.flightInfoString = ($scope.type.indexOf('L') === 0) ? 'Origen' : 'Destino';
    };

    $scope.backInfo = function() {
      document.querySelector('#info').className = 'right';
      document.querySelector('[data-position="current"]').className = 'current';
    };

    $scope.search = function() {
      document.querySelector('#normal').classList.add('hidden');
      document.querySelector('#search').classList.remove('hidden');
      document.querySelector('#query').focus();
    };

    $scope.backSearch = function() {
      if (document.querySelector('#query').value !== '') {
        $scope.query.Vuelo = '';
      }
      document.querySelector('#search').classList.add('hidden');
      document.querySelector('#normal').classList.remove('hidden');
    };

    body.addEventListener('transitionend', function() {
      if (body.clientHeight <= 230) {
        ads.hidden = true;
        $(table).css("margin-bottom", "0");
      } else {
        ads.hidden = false;
        $(table).css("margin-bottom", "100px");
      }
    });

    // List by default
    $scope.change('LI');
    // To avoid console errors
    $scope.flightInfo = {Hora: '', Vuelo: '', Ciudad: '', Puerta: '', Estado: ''};
  }
);
