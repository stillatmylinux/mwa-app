// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngMessages'])

.config(function($ionicConfigProvider) {
  
  $ionicConfigProvider.tabs.position('bottom');
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('app', {
    url: '/',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.states', {
    url: 'states',
    views: {
      'menuContent': {
        templateUrl: 'templates/states.html',
        controller: 'StatesCtrl'
      }
    }
  })

  .state('app.categories', {
      url: 'categories',
      views: {
        'menuContent': {
          templateUrl: 'templates/categories.html',
          controller: 'CategoryCtrl'
        }
      }
    })
    .state('app.playlists', {
      url: 'playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: 'playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.featured', {
    url: 'featured',
    views: {
      'menuContent': {
        templateUrl: 'templates/featured.html',
        controller: 'FeaturedAdsCtrl'
      }
    }
  })

  .state('app.auctions', {
    url: 'auctions/:auction_order',
    views: {
      'menuContent': {
        templateUrl: 'templates/auctions.html',
        controller: 'AuctionsCtrl'
      }
    }
  })

  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('featured');
});
