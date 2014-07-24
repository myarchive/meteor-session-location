Template.geonavform.events({
	'click #geobutton': function (e) {
		$("#geobutton").blur();
		var geo = Session.get("geo");
		if (!geo.support) { alert("Geolocation not supported by your browser."); }
		else if (!geo.allowed) { alert("You declined geolocation, please enable it."); }
		else if (!geo.inuse) {
			geo.inuse = true;
			Session.set("geo",geo);
			updateLocation(true);
		}
		else {
			geo.inuse = false;
			Session.set("geo",geo);
		}
	}
});
Template.thfnavbutton.events({
	'click #tfb12': function (e) {
		console.log("1");
		Session.set("thf",true);
	},
	'click #tfb24': function (e) {
		console.log("2");
		Session.set("thf",false);
	}	
});

Template.geonavform.geoform = function() {
	var geo = Session.get("geo");
	var loc = Session.get("loc");

	var disable = (geo && geo.inuse) ? "disabled" : "";	
	var display = (loc && loc.display) ? "value='"+loc.display+"'" : "placeholder='Enter a location'";
//	if (loc && loc.display) { $('#geoform').removeClass('loadinggif'); }
	
	return "<input type='text' class='form-control' id='geoform' style='width:300px' "+display+" "+disable+">";
};

Template.geonavform.geobutton = function() {
	var geo = Session.get("geo");
	
	var disable = (!geo || (geo && (!geo.support || !geo.allowed))) ? "disabled" : "";
	var colored = (geo && geo.inuse) ? "9cf" : "000";
	
	return "<button type='button' class='btn btn-default "+disable+"' id='geobutton'><i class='glyphicon glyphicon-globe' style='color:#"+colored+"'></i></button>";
};

Template.thfnavbutton.tfbutton = function() {
	var thf = Session.get("thf"); if (!thf) { var thf = false; Session.set('thf',thf); }
	var c12 = (thf) ? "active" : ""; var c24 = (!thf) ? "active" : "";
	var btn12 = "<div class='input-group-btn'><button type='button' class='btn btn-default "+c12+"' id='tfb12'>12h</button></";
	var btn24 = "<div class='input-group-btn'><button type='button' class='btn btn-default "+c24+"' id='tfb24'>24h</button></div>";
	return btn12 + btn24;
};
