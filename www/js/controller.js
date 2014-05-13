angular.module('AppStart.controllers', [])

.controller('MainCtrl', ['$scope', '$ionicSideMenuDelegate', function ($scope, $ionicSideMenuDelegate) {
    $ionicSideMenuDelegate.$getByHandle('menun').canDragContent(0)
}])

.controller('PortadaCtrl', ['$scope', '$ionicSideMenuDelegate', '$state', '$stateParams', 'cacheService', function ($scope, $ionicSideMenuDelegate, $state, $stateParams, cacheService) {
    $scope.NewUser = {}
    $ionicSideMenuDelegate.$getByHandle('menun').canDragContent(1)
    $scope.menuIsEnabled = function() {
        $ionicSideMenuDelegate.$getByHandle('menun').toggleRight()
    };
    try{
        if (localStorage.getItem) {
            if (cacheService.getData('TuRioPinto') != null) {
                var NewUser = JSON.parse(cacheService.getData('xDni'));
                console.log(NewUser)
                $state.go('app.TuRioPinto', NewUser)
            }
        }
    } catch(e){
        console.log("Error");
    }
    $scope.buscar = function() {
        $state.go('app.TuRioPinto', $scope.NewUser)
    };
}])

.controller('DatosCtrl', ['$scope', '$ionicSideMenuDelegate', '$state', '$stateParams', 'RioService', 'cacheService', function ($scope, $ionicSideMenuDelegate, $state, $stateParams, RioService, cacheService) {
    var storage;
    try{
        if (localStorage.getItem){
            if (cacheService.getData('TuRioPinto') === null) {
                var data = RioService.getPinto($stateParams.id);
                data.then(function (data) {
                    console.log(data.errorJson)
                    if(!data){}
                    $scope.resultados = data;
                    var TuRioPinto = $scope.resultados;
                    // var xDni = $stateParams.id;
                    // cacheService.setData('xDni', xDni);
                    // cacheService.setData('TuRioPinto', TuRioPinto);
                });
            }else{
                var resultados = JSON.parse(cacheService.getData('TuRioPinto'));
                $scope.resultados = resultados;
                storage =  localStorage;
                //console.log(storage);
            }
        }
    } catch(e){
        storage = {};
    }
    //console.log($scope.resultados.data.personas[0].nombre);
}])

.controller('ClasificacionesCtrl', ['$scope', 'CategoriaService', 'cacheService', function ($scope, CategoriaService, cacheService) {
    var storage;
    try {
        if (localStorage.getItem) {
            /*
            Devuelve categorias Masculinas
             */
            if (cacheService.getData('CatMas') === null) {
                var data = CategoriaService.getCategorias('M');
                data.then(function(data) {
                    $scope.categorias = data;
                    $scope.tipoCatM = $scope.categorias.data.categorias;
                    var CatMas = $scope.tipoCatM;
                    cacheService.setData('CatMas', CatMas)
                });
            }else{
                var categorias = JSON.parse(cacheService.getData('CatMas'));
                $scope.tipoCatM = categorias;
                console.log($scope.tipoCatM)
                storage = localStorage;
                console.log(storage)
            }
            /*
            Devuelve categorias Femeninas
             */
            if (cacheService.getData('CatFem') === null) {
                var data = CategoriaService.getCategorias('F');
                data.then(function(data) {
                    $scope.categorias = data;
                    $scope.tipoCatF = $scope.categorias.data.categorias;
                    var CatFem = $scope.tipoCatF;
                    cacheService.setData('CatFem', CatFem)
                });
            }else{
                var categorias = JSON.parse(cacheService.getData('CatMas'));
                $scope.tipoCatM = categorias;
                console.log($scope.tipoCatM)
                storage = localStorage;
                console.log(storage)
            }

        }
    } catch(e) {
        storage = {};
    }

/*
* if given group is the selected group, deselect it
* else, select the given group
*/
$scope.toggleGroup = function(group) {
    // console.log(group)
    if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
    } else {
        $scope.shownGroup = group;
    }
};
$scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
};
}])