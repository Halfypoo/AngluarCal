(function() {
	var app = angular.module('Calendar', []);
	var monthLabels = ['January', 'February', 'March', 'April',
                     'May', 'June', 'July', 'August', 'September',
                     'October', 'November', 'December'];
	var currentDate = new Date();
	var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var monthLength = daysInMonth[currentDate.getMonth()];
	var cal_days_labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	var calLongDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var firstDay = new Date();
	firstDay.setDate(1);
	var monthIn = firstDay.getMonth();
	var yearIn = firstDay.getFullYear();

    //For use with API
    /*app.run(function($rootScope) {
        $rootScope.me = function(id, name, options) {
            this.id = id;
            this.name = name;
            this.options = options;
        };
    })*/

	app.directive('monthlyCalendar', function(){
		return {
			restrict: 'E',
			templateUrl: 'Calendars/monthly-calendar.html',
			controller: function($scope) {
			//Calendar factory
				$scope.weeks = cal_days_labels;
				$scope.today = new Date();
				$scope.calTime = $scope.today;
				$scope.fillDays = function(firstDaySet) {
					for (var i = 0; i < 6; i++) {

						$scope.daysList.push([]);
						for (var a = 0; a < 7; a++) {
							if ($scope.counter <= monthLength && (a == firstDaySet || $scope.counter > 0)) {
								$scope.counter++;
								$scope.daysList[i].push(new Date($scope.year, $scope.currentMonth, $scope.counter));
							}
							else {
								$scope.daysList[i].push(" ");
							}
						}
					}
					return $scope.daysList;
				};

				$scope.setCalTime = function() {
					if (true/*$scope.me.options.date == null*/) {
						$scope.startingDate = $scope.today;
						$scope.month = monthLabels[$scope.startingDate.getMonth()];
						$scope.currentMonth = $scope.startingDate.getMonth();
						$scope.year = $scope.startingDate.getFullYear();
						$scope.daysList = [];
						$scope.counter = 0;
						$scope.days = $scope.fillDays($scope.startingDate.getDay());
					}
					else {
						$scope.startingDate = $scope.me.options.date;
						$scope.month = monthLabels[$scope.startingDate.getMonth()];
						$scope.currentMonth = startingDate.getMonth();
						$scope.year = $scope.startingDate.getFullYear();
						$scope.daysList = [];
						$scope.counter = 0;
						$scope.days = $scope.fillDays($scope.startingDate.getDay());
					}
				};
				$scope.setCalTime();

				$scope.setTime = function(date) {
					if ($scope.me.options.date == null) {
						$scope.calTime = date;
					}
					else {
						$scope.calTime = date;
						$scope.me.options.date = date; //should call an api set function
					}
				};

				$scope.monthAhead2 = function() {
					if ($scope.calTime.getMonth() == 11) {

					}
					else {

					}
				};
				$scope.monthBack2 = function() {
					if ($scope.calTime.getMonth == 0) {

					}
					else {

					}
				}

			//Functionality
				//$api.getLayerEvents($scope.layerId).success(function(data) {$scope.layerEvents = data.data});

				$scope.monthAhead = function() {
						if (firstDay.getMonth() == 11) {
							yearIn++;
							monthIn = 0;
							$scope.daysList = [];
							$scope.counter = 0;
							firstDay.setFullYear(yearIn);
							firstDay.setMonth(monthIn);
							firstDay.setDate(1);
							$scope.month = monthLabels[monthIn];
							$scope.year = firstDay.getFullYear();
							$scope.days = $scope.fillDays(firstDay.getDay());
						}
						else {
							monthIn++;
							firstDay.setMonth(monthIn);
							firstDay.setDate(1);
							$scope.daysList = [];
							$scope.counter = 0;
							$scope.month = monthLabels[monthIn];
							$scope.days = $scope.fillDays(firstDay.getDay());
						}
				};
				$scope.monthBack = function() {
					if (firstDay.getMonth() == 0) {
						yearIn--;
						monthIn = 11;
						$scope.daysList = [];
						$scope.counter = 0;
						firstDay.setFullYear(yearIn);
						firstDay.setMonth(monthIn);
						firstDay.setDate(1);
						$scope.month = monthLabels[monthIn];
						$scope.year = firstDay.getFullYear();
						$scope.days = $scope.fillDays(firstDay.getDay());
					}
					else {
						monthIn--;
						firstDay.setMonth(monthIn);
						firstDay.setDate(1);
						$scope.daysList = [];
						$scope.counter = 0;
						$scope.month = monthLabels[monthIn];
						$scope.days = $scope.fillDays(firstDay.getDay());
					}
				};
				$scope.$on('ahead', function() {
					$scope.monthAhead();
				});
				$scope.$on('back', function() {
					$scope.monthBack();
				});
			},
			controllerAs: 'monthlyCal'
			
		};
	});
	
	app.directive('weeklyCalendar', function() {
		return {
			restrict: 'E',
			templateUrl: 'Calendars/weekly-calendar.html',
			scope: {layerId:'@id'},
			controller: function($scope) {
				$scope.times = ['00:00','01:00','02:00','03:00','04:00','05:00','06:00',
				'07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00',
				'16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'];
				$scope.year = currentDate.getFullYear();
				$scope.weeklyFactory = function(startDate) {
					var timeList = [];
					var daysList = [];
					var date = startDate;
					while (date.getDay() != 0) {
						if (date.getDay() > 0) {
							date.setDate(date.getDate() - 1);
						}
						else {
							break;
						}

					};
					for (var j = 0; j <= 6; j++) {
						timeList.push([]);
						date.setHours(0, 0, 0, 0);
						var datePush = date;
						daysList.push(new Date(datePush.getFullYear(), datePush.getMonth(), datePush.getDate(), 0,0,0));
						timeList[j].push(new Date(datePush.getFullYear(), datePush.getMonth(), datePush.getDate(), 0,0,0));
						for (var i = 0; i < 47; i++) {
							var hours = datePush.getHours();
							var minutes = datePush.getMinutes();
							if (minutes == 0) {
								datePush.setMinutes(30);
							}
							else {
								datePush.setHours(hours + 1, 0);
							}
							timeList[j].push(new Date(datePush.getFullYear(), datePush.getMonth(), datePush.getDate(), datePush.getHours(),datePush.getMinutes(),0));
						};
						var day = datePush.getDate();
						date.setDate(day + 1);
					};
					$scope.dayList = daysList;
					return timeList;
				};
				$scope.weeklyDays = $scope.weeklyFactory(currentDate);
			}
		};
	});
	
	app.directive('agendaCalendar', function() {
		return {
			restrict: 'E',
			templateUrl: 'Calendars/agenda-calendar.html',
			scope: {layerId:'@id'},
			controller: function($scope) {
				//$api.get('layer', )
				
			},
			controllerAs: 'dailyCal'
			
		};
		
	});
	
	app.directive('eventPanel', function() {
		return {
			restrict:"E",
			tamplateUrl: "event-panel.html",
			
			
		};
		});

	app.directive('addEvent', function() {
		return {
			restrict:'E',
			templateUrl:'Calendar/add-event.html',
			controller: function($scope) {

			}
		}
	})
	
	
})();