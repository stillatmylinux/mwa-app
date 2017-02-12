var mwa = ( typeof mwa == 'undefined' ) ? {} : mwa;

mwa.states = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
mwa.getStateAbbr = function( id ) {
	return mwa.states[id];
}

var mwauction = {
	domain: 'https://midwestauction.com',
	mdomain: 'https://m.midwestauction.com',
	// domain: 'http://midwestauction.local',
	// mdomain: 'http://m.midwestauction.local',
	port: '',
	adCurrent: 0,
	device:'',
	platform:{
		deviceIsIOS:(/iP(ad|hone|od)/.test(navigator.userAgent)||/Safari/.test(navigator.userAgent)),
		deviceIsAndroid:navigator.userAgent.indexOf('Android') > 0,
	},
	ads: [],
	all: [],
	adTemplate: '<div class="ad-div adsbymwa responsive"><p>Advertisement</p><div></div></div>',
	categories: [
		{id:1,slug:'airplanes-helicopters',name:'Airplanes, helicopters'},
		{id:3,slug:'antiques-collectibles',name:'Antiques, collectibles'},
		{id:4,slug:'atvs-snowmobiles-boats-campers',name:'ATVs, snowmobiles, boats, campers'},
		{id:5,slug:'auto-shop-repair-equipment',name:'Auto shop/repair equipment'},
		{id:7,slug:'coins-stamps-currency-sports-cards',name:'Coins/stamps/currency/sports cards'},
		{id:8,slug:'collector-cars-vehicles-parts',name:'Collector cars, vehicles, parts'},
		{id:9,slug:'commercial-kitchen-equipment',name:'Commercial kitchen equipment'},
		{id:10,slug:'construction-concrete-equipment',name:'Construction/concrete equipment'},
		{id:11,slug:'dairy-cattle-equipment',name:'Dairy cattle/equipment'},
		{id:12,slug:'electric-motor-shop-equipment',name:'Electric motor shop equipment'},
		{id:13,slug:'farm-equipment',name:'Farm equipment'},
		{id:14,slug:'farm-toys-toys',name:'Farm toys, toys'},
		{id:15,slug:'fertilizer-equipment',name:'Fertilizer equipment'},
		{id:16,slug:'golf-course-equipment',name:'Golf course equipment'},
		{id:17,slug:'firearms-sporting-equipment',name:'Firearms/sporting equipment'},
		{id:18,slug:'hardware',name:'Hardware'},
		{id:19,slug:'hay-feed',name:'Hay/feed'},
		{id:20,slug:'horses-tack-equipment',name:'Horses/tack/equipment'},
		{id:21,slug:'household',name:'Household'},
		{id:22,slug:'industrial-equipment',name:'Industrial equipment'},
		{id:23,slug:'lawn-landscaping-equipment',name:'Lawn/landscaping equipment'},
		{id:24,slug:'livestock-angus-cattle',name:'Livestock/Angus cattle'},
		{id:25,slug:'building-material-lumber',name:'Building material, lumber'},
		{id:27,slug:'office-equipment',name:'Office equipment'},
		{id:28,slug:'real-estate',name:'Real estate'},
		{id:29,slug:'shop-woodworking-tools',name:'Shop/woodworking/tools'},
		{id:31,slug:'toys-nascar',name:'Toys/NASCAR'},
		{id:32,slug:'tractors-antique-tractors-gas-engines',name:'Tractors, antique tractors, gas engines'},
		{id:33,slug:'trucks-trailers-pickups',name:'Trucks, trailers, pickups'},
		{id:34,slug:'vehicles',name:'Vehicles'}
	],
	states: [
		// http://midwestauction.com/api/states
	],
	logo: {
		fixLayout: function() {

			var in_landscape = (window.innerHeight < window.innerWidth);			

			// if ( in_landscape ) {
			// 	$('.scroll-content').removeAttr( 'style' );
			// } else {
				var top = parseInt($('.pane .logo').css('margin-top'));
				var height = $('.pane .logo').height();
				// var height = parseInt($('.pane .logo img').css('height'));

				// $('.scroll-content').css('top', 10+top+height+'px');
				$('.scroll-content').css('top', 2+top+height+'px');
			// }
			
		}
	},
	showAds: function() {
		$('.adsbymwa div').each(function(index,ele) {
			if(mwauction.adCurrent % 4 == 0) {
				mwauction.adCurrent = 0;
			}
			$(ele).html(mwauction.ads[mwauction.adCurrent++]);
		});
	},
	str_to_date: function( date ) {

		var f_date, _f_date, _date, _time;

		// date = 2017-02-09 10:00
		if( mwauction.platform.deviceIsIOS ) {
			f_date = date
			_f_date = f_date.split(' ');
			_date = _f_date[0].split('-');
			_time = _f_date[1];
			f_date = new Date(_date[1]+'/'+_date[2]+'/'+_date[0]+' '+_time[0]+':00');
		} else {
			f_date = new Date(date);
		}

		return f_date;
	},
	init_states: function() {

		$.ajax({
			url: mwauction.domain+'/api/states',
			type: 'GET',
			success: function(data) {
					// Decode and show the returned data nicely.
					if( data && data.states ) {
						mwauction.states = data.states;
						$(document).trigger('states_ready');
					}
					
			},
			error: function(e) {
					throw e.responseText;
			}
		});
	},
	init_ads: function() {
		var url = mwauction.domain+mwauction.port+'/display/ads/';
		
		mwauction.ads = [
			'<iframe src="'+url+'homepage/topleft" width="225" height="225" frameborder="0"></iframe>',
			'<iframe src="'+url+'homepage/medrec1" width="257" height="122" frameborder="0"></iframe>',
			'<iframe src="'+url+'homepage/medrec2" width="257" height="122" frameborder="0"></iframe>',
			'<iframe src="'+url+'homepage/topright" width="225" height="225" frameborder="0"></iframe>',
		];
	},
	init: function() {
		
		$('.pane .logo img').load(mwauction.logo.fixLayout);
		mwauction.init_ads();

		$('body').on('click', '.mwa-item a', function(e) {

			var link = '';

			e.preventDefault();
			if(e.target.href && e.target.href.indexOf('midwestauction.com') > 1) {
				$(e.target).addClass('external');
				link = e.target.href;
				parent.postMessage({auction:{url:link}}, '*');
			} else if( $(e.target).parent().attr('href') && $(e.target).parent().attr('href').indexOf('midwestauction.com') > 1) {
				$(e.target).addClass('external');
				link = $(e.target).parent().attr('href');
				parent.postMessage({auction:{url:link}}, '*');
			} else {
				window.open(e.target, '_blank');
			}
		});

		window.addEventListener('message', function (e) {
			if(e.data.device) {
				mwauction.device = e.data.device;
			}
		});

		parent.postMessage('device', '*');

	},
	shuffle: function(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	},
	jwt: {
		store:{
			/*
			 * Sets the jwt to the store object
			 */
			setJWT: function(data){
					this.JWT = data;
			}
		},
		getUserId: function(){
				$.ajax({
						url: mwauction.domain+'/resource/user',
						beforeSend: function(request){
								request.setRequestHeader('Authorization', 'Bearer ' + mwauction.jwt.store.JWT);
						},
						type: 'GET',
						success: function(data) {
								// Decode and show the returned data nicely.
								if( data && data.user_id ) {
									console.log(data.user_id);
									//$('#chicken-dinner').html('<div>'+data.user_id+'</div>');
								} else if( data && data.fail ) {
									console.log(data.fail);
									//$('#chicken-dinner').html('<div>'+data.fail+'</div>');
								}
								
						},
						error: function(e) {
								throw e.responseText;
						}
				});
		},
		registerUser: function() {
			console.log('registerUser');
		},
	}
};

mwauction.init_states();

$(document).on('ready', mwauction.init);
$(window).on('resize orientationchange', mwauction.logo.fixLayout);

setTimeout(mwauction.logo.fixLayout, 5000);