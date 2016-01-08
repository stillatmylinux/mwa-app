var mwa = ( typeof mwa == 'undefined' ) ? {} : mwa;

mwa.states = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
mwa.getStateAbbr = function( id ) {
	return mwa.states[id];
}

var mwauctions = {
	// domain: 'http://midwestauction.local',
	// port: ':10088',
	domain: 'http://midwestauction.com',
	port: '',
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

/**
 * https://github.com/brightbits/formatDate-js
 */
(function () {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  
  var re = new RegExp(/%(a|A|b|B|c|C|d|D|e|F|h|H|I|j|k|l|L|m|M|n|p|P|r|R|s|S|t|T|u|U|v|V|W|w|x|X|y|Y|z)/g);
  var abbreviatedWeekdays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  var fullWeekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var abbreviatedMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  function padNumber(num, count, padCharacter) {
    if (typeof padCharacter == "undefined") {
      padCharacter = "0";
    }
    var lenDiff = count - String(num).length;
    var padding = "";
  
    if (lenDiff > 0)
      while (lenDiff--)
        padding += padCharacter;
        
    return padding + num;
  }
  
  function dayOfYear(d) {
    var oneJan = new Date(d.getFullYear(), 0, 1);
    return Math.ceil((d - oneJan) / 86400000);
  }
  
  function weekOfYear(d) {
    var oneJan = new Date(d.getFullYear(), 0, 1);
    return Math.ceil((((d - oneJan) / 86400000) + oneJan.getDay() + 1) / 7);
  }
  
  function isoWeekOfYear(d) {
    var target  = new Date(d.valueOf());  
    var dayNr   = (d.getDay() + 6) % 7;  
    target.setDate(target.getDate() - dayNr + 3);  
    var jan4    = new Date(target.getFullYear(), 0, 4);  
    var dayDiff = (target - jan4) / 86400000;
    
    return 1 + Math.ceil(dayDiff / 7);
  }
  
  function tweleveHour(d) {
    return d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
  }
  
  function timeZoneOffset(d) {
    var hoursDiff = (-d.getTimezoneOffset() / 60);
    var result = padNumber(Math.abs(hoursDiff), 4);
    return (hoursDiff > 0 ? "+" : "-") + result;
  }
  
  Date.prototype.format = function (formatString) {
    return formatString.replace(re, __bind(function (m, p) {
      switch (p) {
        case "a": return abbreviatedWeekdays[this.getDay()];
        case "A": return fullWeekdays[this.getDay()];
        case "b": return abbreviatedMonths[this.getMonth()];
        case "B": return fullMonths[this.getMonth()];
        case "c": return this.toLocaleString();
        case "C": return Math.round(this.getFullYear() / 100);
        case "d": return padNumber(this.getDate(), 2);
        case "D": return this.format("%m/%d/%y");
        case "e": return padNumber(this.getDate(), 2, " ");
        case "F": return this.format("%Y-%m-%d");
        case "h": return this.format("%b");
        case "H": return padNumber(this.getHours(), 2);
        case "I": return padNumber(tweleveHour(this), 2);
        case "j": return padNumber(dayOfYear(this), 3);
        case "k": return padNumber(this.getHours(), 2, " ");
        case "l": return padNumber(tweleveHour(this), 2, " ");
        case "L": return padNumber(this.getMilliseconds(), 3);
        case "m": return padNumber(this.getMonth() + 1, 2);
        case "M": return padNumber(this.getMinutes(), 2);
        case "n": return "\n";
        case "p": return this.getHours() > 11 ? "PM" : "AM";
        case "P": return this.format("%p").toLowerCase();
        case "r": return this.format("%I:%M:%S %p");
        case "R": return this.format("%H:%M");
        case "s": return this.getTime() / 1000;
        case "S": return padNumber(this.getSeconds(), 2);
        case "t": return "\t";
        case "T": return this.format("%H:%M:%S");
        case "u": return this.getDay() == 0 ? 7 : this.getDay();
        case "U": return padNumber(weekOfYear(this), 2); //either this or W is wrong (or both)
        case "v": return this.format("%e-%b-%Y");
        case "V": return padNumber(isoWeekOfYear(this), 2);
        case "W": return padNumber(weekOfYear(this), 2); //either this or U is wrong (or both)
        case "w": return padNumber(this.getDay(), 2);
        case "x": return this.toLocaleDateString();
        case "X": return this.toLocaleTimeString();
        case "y": return String(this.getFullYear()).substring(2);
        case "Y": return this.getFullYear();
        case "z": return timeZoneOffset(this);
        default: return match;
      }
    }, this));
  };
}).call(this);