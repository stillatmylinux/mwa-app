angular.module('mwaApp.controllers', ['ui.router'])

.controller('AuctionCtrl', ['$scope', 'auctions', 'utils', '$stateParams', function($scope, auctions, utils, $stateParams) {

	$scope.auction = utils.findById(auctions, $stateParams.auctionId);

	$scope.subtitle = $scope.auction.seller;

	var f_date = new Date($scope.auction.auction_datetime + ' ' + $scope.auction.auction_time);
	$scope.auction.auction_datetime = f_date.format('%A, %b. %d');

	$scope.location = ($scope.auction.auction_state_id) ? $scope.auction.auction_city+', '+$scope.auction.auction_state_abbr : 'Online only';

	// ionic events: http://ionicframework.com/docs/api/directive/ionView/
	$scope.$on('$ionicView.loaded', function(event, data){
		$('body').on('click', '.mwa-item a', function(e) {
			e.preventDefault();
			if(e.target.href.indexOf('midwestauction.com') > 1) {
				$(e.target).addClass('external');
				parent.postMessage({auction:{url:link}}, '*');
			} else {
				window.open(e.target, '_blank');
			}
		});
	});


}])

.controller('AuctionsCtrl', ['$scope', '$http', '$stateParams', 'auctions', function($scope, $http, $stateParams, auctions) {

	$scope.auction_order = ($stateParams.auction_order=='sale-day') ? 'auction_datetime' : false;
	$scope.subtitle      = ($stateParams.auction_order=='sale-day') ? 'Sale Day' : 'Recent Posts';

	$scope.goAuction = function(link) {
		if(link[0] == '#') {
			location.href = link;
		} else {
			if(window.parent &&
			   window.parent.location &&
			   window.parent.location.href &&
			   window.parent.location.href == location.href) {
				window.open(link, '_blank');
			} else {
				parent.postMessage({auction:{url:link}}, '*');
			}
		}
	};

    $scope.auctions = auctions;
    $scope.states   = mwa.states;	

	$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
		mwauction.showAds();
	});

}])

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

.directive('adPlacement', function($window, $compile) {
	return {
		transclude: true,
		template: mwauction.adTemplate,
		replace: false,
		link: function postLink(scope, element, iAttrs ) {
			element.html("");
			element.append(angular.element($compile(mwauction.adTemplate)(scope)));
			if( !$window.adsbygoogle ) {
				$window.adsbygoogle = [];
			}
			$window.adsbygoogle.push({});
		}
	}
})


.controller('StatesCtrl', function($scope) {
	$scope.states = mwauction.states;
}) 

.controller('CategoryCtrl', function($scope){
	$scope.cats = mwauction.categories;
})

.controller('FeaturedAdsCtrl', function($scope, $http, $ionicSlideBoxDelegate) {
	$http({
		method: 'GET',
		url: mwauction.domain + mwauction.port + '/ads/featured/top/json',
		headers: {
			'Accept': 'application/json',
			'Access-Control-Allow-Origin': mwauction.domain
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
					featured_ads[i].featured_images[j] = mwauction.mdomain+mwauction.port+'/mobile/featured_images/'+featured_ads[i].featured_images[j];
				}
			}

			featured_ads = mwauction.shuffle( featured_ads );
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

		// console.log( mwauction.domain + mwauction.port + '/auth/token/login');

		$http({
			method: 'POST',
			// url: mwauction.domain + mwauction.port + '/auth/token/login',
			url: 'https://midwestauction.com/auth/token/login',
			headers: {
				'Accept': 'application/json',
				'Access-Control-Allow-Origin': 'https://midwestauction.com',
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
                   mwauction.jwt.store.setJWT(response.data.jwt);
                   mwauction.jwt.getUserId();
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
			// $scope.registerData.username = "mama123";
			// $scope.registerData.email = "mama123@gmail.com";
			// $scope.registerData.password = "123456";
			// $scope.registerData.password2 = "123456";
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

			console.log( mwauction.domain + mwauction.port + '/auth/token/register');

			if(form.$valid) {
				$http({
					method: 'POST',
					// url: mwauction.domain + mwauction.port + '/auth/token/register',
					url: 'https://midwestauction.com/auth/token/register',
					headers: {
						//'Accept': 'application/json',
						'Access-Control-Allow-Origin': 'https://midwestauction.com',
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
		                    mwauction.jwt.store.setJWT(response.data.jwt);
		                    // mwauction.jwt.registerUser();
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