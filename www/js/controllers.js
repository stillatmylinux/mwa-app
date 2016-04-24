angular.module('starter.controllers', [])

.controller('AuctionsCtrl', function($scope, $http, $stateParams) {

	$scope.auction_order = ($stateParams.auction_order=='sale-day') ? 'auction_datetime' : false;
	$scope.subtitle      = ($stateParams.auction_order=='sale-day') ? 'Sale Day' : 'Recent Posts';

	$http({
		method: 'GET',
		url: mwauctions.domain + mwauctions.port + '/auctions/list/json',
		headers: {
			'Accept': 'application/json',
			'Access-Control-Allow-Origin': mwauctions.domain
		}
	}).then(
		function( response ) {
			$scope.auctions = response.data.all;
			$scope.states   = mwa.states;
		},
		function() {
			console.log("AJAX failed!");
		}
	);

	$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
		mwauctions.showAds();
	});

})

.directive('adPlacement', function($window, $compile) {
	return {
		transclude: true,
		template: mwauctions.adTemplate,
		replace: false,
		link: function postLink(scope, element, iAttrs ) {
			element.html("");
			element.append(angular.element($compile(mwauctions.adTemplate)(scope)));
			if( !$window.adsbygoogle ) {
				$window.adsbygoogle = [];
			}
			$window.adsbygoogle.push({});
		}
	}
})

.directive('onAuctionlistComplete', function($timeout) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, $window) {
			if(scope.$last === true) {
				$timeout(function() {
					scope.$emit('ngRepeatFinished');
				});
			}
		}
	}
})

.controller('StatesCtrl', function($scope) {
	$scope.states = mwauctions.states;
}) 

.controller('CategoryCtrl', function($scope){
	$scope.cats = mwauctions.categories;
})

.controller('FeaturedAdsCtrl', function($scope, $http, $ionicSlideBoxDelegate) {
	$http({
		method: 'GET',
		url: mwauctions.domain + mwauctions.port + '/ads/featured/top/json',
		headers: {
			'Accept': 'application/json',
			'Access-Control-Allow-Origin': mwauctions.domain
		}
	}).then(
		function( response ) {
			var featured_ads, fa, i, featured_images, j, image;

			$scope.states = mwa.states;
			featured_ads = response.data.all;
			
			for(i=0;i<featured_ads.length;i++) {
				featured_ads[i].auction_state = mwa.getStateAbbr(featured_ads[i].auction_state_id);
				featured_ads[i].start_time = new Date(featured_ads[i].auction_datetime).format("%A, %b %d, %Y @ %l:%M %P");
				for(j=0;j<featured_ads[i].featured_images.length;j++) {
					featured_ads[i].featured_images[j] = mwauctions.mdomain+mwauctions.port+'/mobile/featured_images/'+featured_ads[i].featured_images[j];
				}
			}

			featured_ads = mwauctions.shuffle( featured_ads );
			for (var i = featured_ads.length - 1; i >= 0; i--) {
				featured_ads[i].imageUrl = featured_ads[i].featured_images[0];
			};
			$scope.featured_ads = featured_ads;
			$ionicSlideBoxDelegate.update();
		},
		function() {
			console.log("AJAX failed!");
		}
	);
	
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http) {

	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//$scope.$on('$ionicView.enter', function(e) {
	//});

	// Form data for the login modal
	$scope.loginData = {};

	// Create the login modal that we will use later
	$ionicModal.fromTemplateUrl('templates/login.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});

	// Triggered in the login modal to close it
	$scope.closeLogin = function() {
		$scope.modal.hide();
	};

	// Open the login modal
	$scope.login = function() {
		$scope.modal.show();
	};

	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {

		console.log( mwauctions.domain + mwauctions.port + '/auth/token/login');

		$http({
			method: 'POST',
			// url: mwauctions.domain + mwauctions.port + '/auth/token/login',
			url: 'http://midwestauction.local/auth/token/login',
			headers: {
				'Accept': 'application/json',
				'Access-Control-Allow-Origin': 'http://midwestauction.local', //mwauctions.domain,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			transformRequest: function(obj) { // Zend Auth expects post data not json
			        var str = [];
			        for(var p in obj)
			        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			        return str.join("&");
			},
			data: {
				identity: $scope.loginData.username,
				credential: $scope.loginData.password
			}
		}).then(
			function( response ) {
				//$scope.auctions = response.data.all;
				console.log( response );

                if(response.data.status && response.data.status == 'fail') {
                	if( response.data.msg ) {
                		console.log( response.data.msg );
                		console.log($scope.loginData);
                	} else {
						console.log('authentication failed . . .');
                	}
                } else {
                   mwauctions.jwt.store.setJWT(response.data.jwt);
                   mwauctions.jwt.getUserId();
                   $scope.closeLogin();
                }
			},
			function() {
				console.log("AJAX failed!");
			}
		);
	};

})

.controller('RegisterCtrl', function($scope, $ionicModal, $timeout, $http) {


		// Form data for the register modal
		$scope.registerData = {
			username: '',
			display_name: '',
			email: '',
			password: '',
			password2: ''
		};

		// Create the register modal that we will use later
		$ionicModal.fromTemplateUrl('templates/register.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.modal = modal;
		});

		$scope.fillTestForm = function() {
			$scope.registerData.username = "mama123";
			$scope.registerData.email = "mama123@gmail.com";
			$scope.registerData.password = "123456";
			$scope.registerData.password2 = "123456";
		}

		// Triggered in the login modal to close it
		$scope.closeRegister = function() {
			$scope.modal.hide();
		};

		// Open the register modal
		$scope.register = function() {
			$scope.modal.show();
		};

		// Perform the register action when the user submits the register form
		$scope.doRegister = function(form) {

			console.log( mwauctions.domain + mwauctions.port + '/auth/token/register');

			if(form.$valid) {
				$http({
					method: 'POST',
					// url: mwauctions.domain + mwauctions.port + '/auth/token/register',
					url: 'http://midwestauction.local/auth/token/register',
					headers: {
						//'Accept': 'application/json',
						'Access-Control-Allow-Origin': 'http://midwestauction.local',
						'Content-Type': 'application/x-www-form-urlencoded'
						/**
						 * Access-Control-Allow-Origin
						 * Will error if you try to login in first
						 * and then try to register.
						 * @TODO disable registration if logged in
						 */
					},
					data: {
						username: $scope.registerData.username,
						email: $scope.registerData.email,
						display_name: $scope.registerData.username,
						password: $scope.registerData.password
					}
				}).then(
					function( response ) {
						// //$scope.auctions = response.data.all;
						console.log( response );

		                if(response.data.status && response.data.status == 'fail') {
		                    console.log('registration failed');
		                } else {
		                	console.log('registration success!', response);
		                    mwauctions.jwt.store.setJWT(response.data.jwt);
		                    // mwauctions.jwt.registerUser();
		                    $scope.closeRegister();
		                }
					},
					function() {
						console.log("AJAX failed for regisration!");
					}
				);
			}
		};
})

.directive('compareTo', function() {
	return {
		require: 'ngModel',
		scope: {
			otherModelValue: '=compareTo'
		},
		link: function(scope, element, attrs, ngModel) {
			ngModel.$validators.compareTo = function(modelValue) {
				return modelValue === scope.otherModelValue;
			};

			scope.$watch('otherModelValue', function() {
				ngModel.$validate();
			});
		}
	}
})

.controller('PlaylistsCtrl', function($scope) {
	$scope.playlists = [
		{ title: 'Reggae', id: 1 },
		{ title: 'Chill', id: 2 },
		{ title: 'Dubstep', id: 3 },
		{ title: 'Indie', id: 4 },
		{ title: 'Rap', id: 5 },
		{ title: 'Cowbell', id: 6 }
	];
})

.controller('ContentController', function($scope, $ionicSideMenuDelegate) {
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});