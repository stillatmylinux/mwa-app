angular.module('starter.controllers', [])

.controller('AuctionsCtrl', function($scope, $http) {
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
			alert("AJAX failed!");
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

// .directive('mwaStates', function() {
// 	console.log($scope.state)
// 	return {
// 		scope:{}
// 		//type: mwa.states[state_id]
// 	}
// })

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
					featured_ads[i].featured_images[j] = mwauctions.domain+mwauctions.port+'/featured_images/'+featured_ads[i].featured_images[j];
				}

				console.log(featured_ads[i].featured_images)
			}

			if( featured_ads.length ) {
				$scope.featured_ad = featured_ads[0];
				$scope.featured_ad.imageUrl = featured_ads[0].featured_images[0];
			}
			
			$ionicSlideBoxDelegate.update();
			// 	featured_images_js = featured_images_js.slice(0, -1);

			//}
			/*
<?php 
if ( isset($this->featured_auctions[$this->count] ) ) :

	$fa = $this->featured_auctions[$this->count];

	$featured_images_array = explode("\n", $fa->featured_images);

	$featured_images_js = '';
	if(isset($featured_images_array) && !empty($featured_images_array)) {
		foreach ($featured_images_array as $image) {
			$featured_images_js .= '"/featured_images/'.trim($image).'",';
		}
		$featured_images_js = rtrim($featured_images_js, ",");
	}
?>
<p style='text-align:center'>
	<?php if($fa->featured_top) { ?>
	<script type="text/javascript">
		var featuredImgSrc = [<?php echo $featured_images_js; ?>];
		featuredImages[++featuredImageCount] = new FlippinImage(featuredImgSrc);
	</script>
	<?php } else { ?>
		<img src="/featured_images/<?php echo trim($fa->featured_images) ?>">
	<?php } ?>
</p>
<h3><?php echo $fa->featured_title; ?></h3>
<ul>
	
	<?php

		$featured_text_array = explode("\n", $fa->featured_text);

		$featured_text = '';
		$featured_text_count = 0;
		if(!empty($featured_text_array)) {
			foreach ($featured_text_array as $text) {
				$featured_text_count++;
				if($featured_text_count != count($featured_text_array)) {
					echo '<li>' . $this->escapeHtml(trim($text)). '</li>';
				} else { // last item: add link
					echo '<li><a href="'.$fa->get_permalink() . '">' . $this->escapeHtml(trim($text)). '</a></li>';
				}
			}
		}

	?>
</ul>

<hr>

<?php

endif;

?>
	*/			

		},
		function() {
			alert("AJAX failed!");
		}
	);
	
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

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
		console.log('Doing login', $scope.loginData);

		// Simulate a login delay. Remove this and replace with your login
		// code if using a login system
		$timeout(function() {
			$scope.closeLogin();
		}, 1000);
	};
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