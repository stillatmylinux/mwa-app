// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'mwaApp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'mwaApp.controllers' is found in controllers.js
angular.module('mwaApp', ['ionic', 'mwaApp.controllers', 'ngMessages', 'mwaApp.auctions.service', 'mwaApp.utils.service', 'mwaApp.states.service'])

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
    controller: 'AppCtrl',
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
    },
    resolve: {
      auctions: ['auctions',
        function(auctions){
          return auctions.all();
        }]
    },
  })

  .state('app.auction', {
    url: 'auction/:auctionId',
    views: {
      'menuContent': {
        templateUrl: 'templates/auction.html',
        controller: 'AuctionCtrl'
      }
    },
    resolve: {
      auctions: ['auctions',
        function(auctions){
          return auctions.all();
        }]
    },
  })

  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('featured');
});

angular.module('mwaApp.auctions.service', [

])
// A RESTful factory for retrieving auctions from db
.factory('auctions', ['$http', 'utils', function ($http, utils) {

  var auctions = $http({
    method: 'GET',
    url: mwauction.domain + mwauction.port + '/auctions/list/json',
    headers: {
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': mwauction.domain
    }
  }).then(function (resp) {
    var _auctions = resp.data.all;
    for(i=0;i<_auctions.length;i++) {
      if( _auctions[i].external_auction_link === '' ) {
        _auctions[i].url = '#/auction/' + _auctions[i].id;
      } else {
        _auctions[i].url = _auctions[i].external_auction_link;
      }
    }

    return _auctions;
  });

  var factory = {};
  factory.all = function () {
    return auctions;
  };
  factory.get = function (id) {
    return auctions.then(function(){
      return utils.findById(auctions, id);
    })
  };
  return factory;
}]);

angular.module('mwaApp.utils.service', [

])
.factory('utils', function () {
  return {
    // Util for finding an object by its 'id' property among an array
    findById: function findById(a, id) {
      for (var i = 0; i < a.length; i++) {
        if (a[i].id == id) return a[i];
      }
      return null;
    },

    // Util for returning a random key from a collection that also isn't the current key
    newRandomKey: function newRandomKey(coll, key, currentKey){
      var randKey;
      do {
        randKey = coll[Math.floor(coll.length * Math.random())][key];
      } while (randKey == currentKey);
      return randKey;
    },


  };
});

angular.module('mwaApp.states.service', [

])
// A RESTful factory for retrieving auctions from db
.factory('states', ['$http', 'utils', function ($http, utils) {

  var states = mwauction.states;

  var factory = {};
  factory.all = function () {
    return states;
  };
  factory.get = function (id) {
    return states[id];
  };
  return factory;
}]);