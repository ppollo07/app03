// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('AppStart', ['ionic', 'AppStart.services', 'AppStart.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
	$stateProvider

	.state('app',{
		url: "/app",
		abstract: true,
		templateUrl: "template/menu.html"
		
	})
	.state('app.portada',{
		url: "/portada",
		views: {
			'menuContent' :{
				templateUrl: "template/portada.html",
				controller: "MainCtrl"
			}
		}
	})
	.state('app.singup',{
		url: "/singup",
		views: {
			'menuContent' :{
				templateUrl: "template/singup.html",
				controller: "PortadaCtrl"
			}
		}
	})
	.state('app.TuRioPinto',{
		url: "/turiopinto/:id",
		views: {
			'menuContent' :{
				templateUrl: "template/turiopinto.id.html",
				controller: "DatosCtrl"
			}
		}
	})
	.state('app.clasificaciones',{
		url: "/clasificaciones",
		views: {
			'menuContent' :{
				templateUrl: "template/clasificaciones.html",
				controller: "ClasificacionesCtrl"
			}
		}
	});
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/portada');
});

function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}