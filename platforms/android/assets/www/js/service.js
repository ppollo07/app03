angular.module('AppStart.services', [])

// .factory('AngularIssues', function($resource){
// 	return $resource('https://api.github.com/repos/angular/angular.js/issues', {})
// })

// .service('RioService', function($q, $http) {
// 	this.getPinto = function() {
// 		var deferred = $q.defer();
// 		$http.get('http://apihttp.fidelitytools.net/api/TuRioPinto',{params:{xKey:'f161999792e27487f0588ac78dc98145',xDni:'30267637'}}).then(function(data) {
//         	deferred.resolve(data.data);
//     	});
//         //console.log(deferred.promise)
//         return deferred.promise;
// 	}
// });
.service('RioService',['$q','$http', function ($q, $http) {
	this.getPinto = function(dni) {
		var deferred = $q.defer();
		$http.get('http://apihttp.fidelitytools.net/api/TuRioPinto',{params:{xKey:'f161999792e27487f0588ac78dc98145',xDni:dni}}).then(function(data) {
        	deferred.resolve(data.data);
    	});
        //console.log(deferred.promise)
        return deferred.promise;
	}
}])

.service('CategoriaService', ['$q', '$http', function ($q, $http) {
	this.getCategorias = function(sexo) {
		var deferred = $q.defer();
		$http.get('http://apihttp.fidelitytools.net/api/ObtenerCategoriasPorSexo',{params:{xKey:'f161999792e27487f0588ac78dc98145',xSexo:sexo}}).then(function(data) {
        	deferred.resolve(data.data);
    	});

        //console.log(deferred.promise)
        return deferred.promise;
	}
}])

.factory('storageService', function ($rootScope) {

    return {
        
        get: function (key) {
           return localStorage.getItem(key);
        },

        save: function (key, data) {
           localStorage.setItem(key, JSON.stringify(data));
        },

        remove: function (key) {
            localStorage.removeItem(key);
        },
        
        clearAll : function () {
            localStorage.clear();
        }
    };
})

.factory('cacheService', function ($http, storageService) {
    
    return {
        
        getData: function (key) {
            return storageService.get(key);
        },

        setData: function (key,data) {
            storageService.save(key, data);
        },
        
        removeData: function (key) {
            storageService.remove(key);
        }
    };
});