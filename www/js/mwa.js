var mwa = ( typeof mwa == 'undefined' ) ? {} : mwa;

mwa.states = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];


var mwauctions = {
	domain: 'http://midwestauction.local',
	port: ':10088',
	// domain: 'http://midwestauction.com',
	// port: '',
	adCurrent: 0,
	ads: [],
	adTemplate: '<div class="ad-div adsbymwa responsive"><p>Advertisement</p><div></div></div>',
	showAds: function() {
		jQuery('.adsbymwa div').each(function(index,ele) {
			jQuery(ele).html(mwauctions.ads[mwauctions.adCurrent++]);
		});
	},
	init: function() {
		var url = mwauctions.domain+mwauctions.port+'/display/ads/';
		
		mwauctions.ads = [
			'<iframe src="'+url+'homepage/topleft" width="225" height="225" frameborder="0"></iframe>',
			'<iframe src="'+url+'homepage/medrec1" width="257" height="122" frameborder="0"></iframe>',
			'<iframe src="'+url+'homepage/medrec2" width="257" height="122" frameborder="0"></iframe>',
			'<iframe src="'+url+'homepage/topright" width="225" height="225" frameborder="0"></iframe>',
		];
	}
}

jQuery(document).ready( function() {
	mwauctions.init();
});