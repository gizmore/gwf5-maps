'use strict';
angular.module('gwf5').
controller('GWFPositionCtrl', function($scope, GWFPositionSrvc, GWFLocationPicker, GWFErrorSrvc) {

	$scope.data = {
		lat: null,
		lng: null,
	};
	
	$scope.init = function(config) {
		console.log('GWFPositionCtrl.init()', config);
		$scope.config = config;
		$scope.setLatLng(config.lat, config.lng);
		GWFPositionSrvc.start();
	};

	$scope.$on('gwf-position-changed', function($event, position) {
		console.log('GWFPositionCtrl.$on-gwf-position-changed()', position);
		if ($scope.config.defaultCurrent) {
			if ($scope.data.lat === null) {
				$scope.setLatLng(position.lat, position.lng);
			}
		}
	});
	
	$scope.setLatLng = function(lat, lng) {
		console.log('GWFPositionCtrl.setLatLng()', lat, lng);
		$scope.data.lat = lat;
		$scope.data.lng = lng;
		$scope.data.display = lat + '°;' + lng + '°;';
		setTimeout($scope.$apply.bind($scope), 1);
	};
	
	
	//////////
	// Pick //
	//////////
	$scope.onPick = function() {
		console.log('GWFPositionCtrl.onPick()');
		GWFLocationPicker.open().then($scope.locationPicked, $scope.locationNotPicked);
	};
	
	$scope.locationPicked = function(latlng) {
		console.log('GWFPositionCtrl.locationPicked()');
		$scope.setLatLng(latlng.lat(), latlng.lng());
	};
	
	$scope.locationNotPicked = function(error) {
		console.log('GWFPositionCtrl.locationNotPicked()', error);
	};
	

});
