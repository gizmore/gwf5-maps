'use strict';
angular.module('gwf5').
controller('GWFLocationBarCtrl', function($scope, GWFPositionSrvc, GWFLocationPicker, GWFErrorSrvc) {

	$scope.data = {
		position: GWFPositionSrvc.CURRENT,
		fix: false,
		fixLat: null,
		fixLng: null,
	};
	
	//////////
	// Pick //
	//////////
	$scope.onPick = function() {
		console.log('LocationBarCtrl.onPick()');
		GWFLocationPicker.open().then($scope.locationPicked, $scope.locationNotPicked);
	};
	
	$scope.locationPicked = function(latlng) {
		console.log('LocationBarCtrl.locationPicked()');
		GWFPositionSrvc.startPatching(latlng.lat(), latlng.lng());
		$scope.data.fix = true;
		$scope.data.fixLat = latlng.lat();
		$scope.data.fixLng = latlng.lng();
	};
	
	$scope.locationNotPicked = function(error) {
		console.log('LocationBarCtrl.locationNotPicked()', error);
	};
	
	$scope.toggleFixture = function() {
		console.log('LocationBarCtrl.toggleFixture()');
		if ($scope.data.fix) {
			if ($scope.data.fixLat) {
				GWFPositionSrvc.startPatching($scope.data.fixLat, $scope.data.fixLng);
			}
			else {
				$scope.data.fix = false;
			}
		}
		else {
			GWFPositionSrvc.stopPatching();
		}
	};
	
	$scope.$on('gwf-position-changed', function($event, position) {
		console.log('LocationBarCtrl.$on-gwf-position-changed()', position);
		$scope.data.position = position;
		setTimeout($scope.$apply.bind($scope), 1);
	});

	///////////
	// Probe //
	///////////
	$scope.onProbe = function() {
		console.log('LocationBarCtrl.onDetect()');
		GWFPositionSrvc.probe().then($scope.detected(), $scope.probeFailed);
	};
	
	$scope.detected = function(position) {
		console.log('LocationBarCtrl.detected()', position);
		setTimeout($scope.$apply.bind($scope), 1);
	};
			
	$scope.probeFailed = function(error) {
		console.log('LocationBarCtrl.probeFailed()', error);
		GWFErrorSrvc.showError(error.message, "Position Error");
	};

});
