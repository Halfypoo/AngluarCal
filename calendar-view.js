(function() {
    var app = angular.module('calendarview', ['Calendar']);
    app.run(function($rootScope) {
        $rootScope.me = {
			id: 1,
			profile_picture: "DBS/eladprof.jpg",
			cover_photo: "dbs/eladcover.jpg",
			cover_photo: "dbs/eladcover.jpg",
			name: "Elad Kremer",
			main_layer_id: 1,
			friend_count: 2,
			friends: [2,3],
			options: {
				date : null,
			},
			followed_layers: [3, 4, 5]
		};
    });
    app.directive('calendarView', function() {
        return {
            restrict: 'E',
            templateUrl: 'calendar-view.html',
            controller: function($scope, $rootScope) {
                $scope.me = $rootScope.me;
            }
        }
    });
})();