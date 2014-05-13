angular.module('AppStart.controllers', [])

.controller('MainCtrl', ['$scope', '$ionicSideMenuDelegate', function ($scope, $ionicSideMenuDelegate) {
    $ionicSideMenuDelegate.$getByHandle('menun').canDragContent(0)
}])

.controller('PortadaCtrl', ['$scope', '$ionicSideMenuDelegate', '$state', '$stateParams', function ($scope, $ionicSideMenuDelegate, $state, $stateParams) {
    $scope.NewUser = {}
    $ionicSideMenuDelegate.$getByHandle('menun').canDragContent(1)
    $scope.menuIsEnabled = function() {
        $ionicSideMenuDelegate.$getByHandle('menun').toggleRight()
    };
    $scope.buscar = function() {
        $state.go('app.TuRioPinto',$scope.NewUser)
    };
}])

.controller('DatosCtrl', ['$scope', '$ionicSideMenuDelegate', '$state', '$stateParams', 'RioService', function ($scope, $ionicSideMenuDelegate, $state, $stateParams, RioService) {

    var data = RioService.getPinto($stateParams.id);
    data.then(function(data) {
        $scope.resultados = data;
    //console.log($scope.resultados.data.personas[0].nombre);
});
}])

.controller('ClasificacionesCtrl', ['$scope', 'CategoriaService', 'cacheService', function ($scope, CategoriaService, cacheService) {
    var storage;
    try {
        if (localStorage.getItem) {
            if (cacheService.getData('CatMas') === null){
                console.log("lala")
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
        }
    } catch(e) {
        storage = {};
    }
    
    var data = CategoriaService.getCategorias('F');
    data.then(function(data) {
        $scope.categorias = data;
        $scope.tipoCatF = $scope.categorias.data.categorias;
    });
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