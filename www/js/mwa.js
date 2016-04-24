var mwa = ( typeof mwa == 'undefined' ) ? {} : mwa;

mwa.states = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
mwa.getStateAbbr = function( id ) {
	return mwa.states[id];
}

var mwauctions = {
	// domain: 'http://midwestauction.local',
	// port: '',
	domain: 'http://midwestauction.com',
	port: '',
	adCurrent: 0,
	ads: [],
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
    {id:01,name:'Alabama',slug:'alabama',abbr:'AL',nickname:'',use_nickname:0,show_in_dropdown:0},
    {id:02,name:'Alaska',slug:'alaska',abbr:'AK',nickname:'',use_nickname:0,show_in_dropdown:0},
    {id:03,name:'Arizona',slug:'arizona',abbr:'AZ',nickname:'',use_nickname:0,show_in_dropdown:0},
    {id:04,name:'Arkansas',slug:'arkansas',abbr:'AR',nickname:'Ark.',use_nickname:1,show_in_dropdown:1},
    {id:05,name:'California',slug:'california',abbr:'CA',nickname:'',use_nickname:0,show_in_dropdown:0},
    {id:06,name:'Colorado',slug:'colorado',abbr:'CO',nickname:'Colo.',use_nickname:0,show_in_dropdown:1},
    {id:07,name:'Connecticut',slug:'connecticut',abbr:'CT',nickname:'',use_nickname:0,show_in_dropdown:0},
    {id:08,name:'Delaware',slug:'delaware',abbr:'DE',nickname:'',use_nickname:0,show_in_dropdown:0},
    {id:09,name:'District of Columbia',slug:'district-of-columbia',abbr:'DC',nickname:'',use_nickname:0,show_in_dropdown:0},
    {id:10,name:'Florida',slug:'florida',abbr:'FL',nickname:'',use_nickname:0,show_in_dropdown:0},
    {id:11,name:'Georgia',slug:'georgia',abbr:'GA',nickname:'',use_nickname:0,show_in_dropdown:1},
    {id:12,name:'Hawaii',slug:'hawaii',abbr:'HI',nickname:'',use_nickname:0,show_in_dropdown:0},
    {id:13,name:'Idaho',slug:'idaho',abbr:'ID',nickname:'',use_nickname:0,show_in_dropdown:1},
    {id:14,name:'Illinois',slug:'illinois',abbr:'IL',nickname:'',use_nickname:0,show_in_dropdown:1},
    {id:15,name:'Indiana',slug:'indiana',abbr:'IN',nickname:'Ind.',use_nickname:0,show_in_dropdown:1},
    {id:16,name:'Iowa',slug:'iowa',abbr:'IA',nickname:'',use_nickname:0,show_in_dropdown:1},
    {id:17,name:'Kansas',slug:'kansas',abbr:'KS',nickname:'',use_nickname:0,show_in_dropdown:1},
    {id:18,name:'Kentucky',slug:'kentucky',abbr:'KY',nickname:'Kent.',use_nickname:0,show_in_dropdown:1},
    {id:19,name:'Louisiana',slug:'louisiana',abbr:'LA',nickname:'Louis.',use_nickname:1,show_in_dropdown:1},
    {id:20,name:'Maine',slug:'maine',abbr:'ME',nickname:'',use_nickname:0,show_in_dropdown:0},
    {id:21,name:'Maryland',slug:'maryland',abbr:'MD',nickname:'Mary.',use_nickname:0,show_in_dropdown:1},
    {id:22,name:'Massachusetts',slug:'massachusetts',abbr:'MA',nickname:'',use_nickname:0,show_in_dropdown:0},
    {id:23,name:'Michigan',slug:'michigan',abbr:'MI',nickname:'Mich.',use_nickname:1,show_in_dropdown:1},
    {id:24,name:'Minnesota',slug:'minnesota',abbr:'MN',nickname:'',use_nickname:0,show_in_dropdown:1},
    {id:25,name:'Mississippi',slug:'mississippi',abbr:'MS',nickname:'',use_nickname:0,show_in_dropdown:1},
    {id:26,name:'Missouri',slug:'missouri',abbr:'MO',nickname:'',use_nickname:0,show_in_dropdown:1},
    {id:27,name:'Montana',slug:'montana',abbr:'MT',nickname:'Mont.',use_nickname:0,show_in_dropdown:1},
    {id:28,name:'Nebraska',slug:'nebraska',abbr:'NE',nickname:'Nebr.',use_nickname:0,show_in_dropdown:1},
    {id:29,name:'Nevada',slug:'nevada',abbr:'NV',nickname:'',use_nickname:0,show_in_dropdown:1},
    {id:30,name:'New Hampshire',slug:'new-hampshire',abbr:'NH',nickname:'',use_nickname:0,show_in_dropdown:0},
    {id:31,name:'New Jersey',slug:'new-jersey',abbr:'NJ',nickname:'',use_nickname:0,show_in_dropdown:0},
    {id:32,name:'New Mexico',slug:'new-mexico',abbr:'NM',nickname:'N. Mex.',use_nickname:1,show_in_dropdown:1},
    {id:33,name:'New York',slug:'new-york',abbr:'NY',nickname:'',use_nickname:0,show_in_dropdown:0},
    {id:34,name:'North Carolina',slug:'north-carolina',abbr:'NC',nickname:'N.Carolina',use_nickname:1,show_in_dropdown:1},
    {id:35,name:'North Dakota',slug:'north-dakota',abbr:'ND',nickname:'N. Dakota',use_nickname:1,show_in_dropdown:1},
    {id:36,name:'Ohio',slug:'ohio',abbr:'OH',nickname:'Ohio',use_nickname:0,show_in_dropdown:1},
    {id:37,name:'Oklahoma',slug:'oklahoma',abbr:'OK',nickname:'Okla.',use_nickname:0,show_in_dropdown:1},
    {id:38,name:'Oregon',slug:'oregon',abbr:'OR',nickname:'',use_nickname:0,show_in_dropdown:0},
    {id:39,name:'Pennsylvania',slug:'pennsylvania',abbr:'PA',nickname:'Penn.',use_nickname:1,show_in_dropdown:1},
    {id:40,name:'Rhode Island',slug:'rhode-island',abbr:'RI',nickname:'',use_nickname:0,show_in_dropdown:0},
    {id:41,name:'South Carolina',slug:'south-carolina',abbr:'SC',nickname:'S. Carolina',use_nickname:1,show_in_dropdown:1},
    {id:42,name:'South Dakota',slug:'south-dakota',abbr:'SD',nickname:'S. Dakota',use_nickname:1,show_in_dropdown:1},
    {id:43,name:'Tennessee',slug:'tennessee',abbr:'TN',nickname:'Tenn.',use_nickname:0,show_in_dropdown:1},
    {id:44,name:'Texas',slug:'texas',abbr:'TX',nickname:'',use_nickname:0,show_in_dropdown:1},
    {id:45,name:'Utah',slug:'utah',abbr:'UT',nickname:'Utah',use_nickname:0,show_in_dropdown:1},
    {id:46,name:'Vermont',slug:'vermont',abbr:'VT',nickname:'',use_nickname:0,show_in_dropdown:0},
    {id:47,name:'Virginia',slug:'virginia',abbr:'VA',nickname:'',use_nickname:0,show_in_dropdown:0},
    {id:48,name:'Washington',slug:'washington',abbr:'WA',nickname:'Wash.',use_nickname:0,show_in_dropdown:1},
    {id:49,name:'West Virginia',slug:'west-virginia',abbr:'WV',nickname:'',use_nickname:0,show_in_dropdown:0},
    {id:50,name:'Wisconsin',slug:'wisconsin',abbr:'WI',nickname:'Wisc.',use_nickname:0,show_in_dropdown:1},
    {id:51,name:'Wyoming',slug:'wyoming',abbr:'WY',nickname:'Wyo.',use_nickname:0,show_in_dropdown:1}
  ],
	showAds: function() {
    jQuery('.adsbymwa div').each(function(index,ele) {
      if(mwauctions.adCurrent % 4 == 0) {
        mwauctions.adCurrent = 0;
      }
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
        // $.ajax({
        //     url: 'http://midwestauction.local/resource/image',
        //     beforeSend: function(request){
        //         request.setRequestHeader('Authorization', 'Bearer ' + mwauctions.jwt.store.JWT);
        //     },
        //     type: 'GET',
        //     success: function(data) {
        //         // Decode and show the returned data nicely.
        //         if( data && data.user_id ) {
        //           console.log(data.user_id);
        //             //$('#chicken-dinner').html('<div>'+data.user_id+'</div>');
        //         } else if( data && data.fail ) {
        //           console.log(data.fail);
        //             //$('#chicken-dinner').html('<div>'+data.fail+'</div>');
        //         }
                
        //     },
        //     error: function(e) {
        //         throw e.responseText;
        //     }
        // });
    },
    registerUser: function() {
      console.log('registerUser');
    }
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