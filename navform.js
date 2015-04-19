Template.geonavform.events({
	'click #geobutdiv': function (e) {
		$("#geobutton").blur();
		var geo = Session.get("geo");
		if (!geo.support) {
			$('#geobutdiv').attr('data-content', 'Geolocation not available.');
			$('[data-toggle="popover"]').popover();
			$('[data-toggle="popover"]').each(function () {
				if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
					$(this).popover('hide');
				}
			});
			setTimeout(function(){ $('#geobutdiv').popover('hide'); }, 3000);
		}
		else if (!geo.allowed) {
			$('#geobutdiv').attr('data-content', 'You declined geolocation.');
			$('[data-toggle="popover"]').popover();
			$('[data-toggle="popover"]').each(function () {
				if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
					$(this).popover('hide');
				}
			});
			setTimeout(function(){ $('#geobutdiv').popover('hide'); }, 3000);
		}
		else if (!geo.inuse) {
			geo.inuse = true;
			Session.set("geo", geo);
			updateLocation(true);
		}
		else {
			geo.inuse = false;
			Session.set("geo", geo);
		}
	}
});
Template.thfnavbutton.events({
	'click #tfb12': function (e) {
		Session.set("thf", true);
	},
	'click #tfb24': function (e) {
		Session.set("thf", false);
	}
});

Template.geonavform.helpers({
	geoform: function () {
		var geo = Session.get("geo");
		var loc = Session.get("loc");
		var disable = (geo && geo.inuse) ? "disabled" : "";
		var display = (loc && loc.display) ? "value='" + loc.display + "'" : "placeholder='Enter a location'";
		//if (loc && loc.display) { $('#geoform').removeClass('loadinggif'); }
		return "<input type='text' class='form-control' id='geoform' style='width:300px' " + display + " " + disable + ">";
	},
	geobutton: function () {
		var geo = Session.get("geo");
		var disable = (!geo || (geo && (!geo.support || !geo.allowed))) ? "disabled" : "";
		var colored = (geo && geo.inuse) ? "9cf" : "aaa";
		return "<button type='button' class='btn btn-default " + disable + "' id='geobutton'><i class='glyphicon glyphicon-globe' style='color:#" + colored + "'></i></button>";
	}
});

Template.thfnavbutton.helpers({
	tfbutton: function () {
		var thf = Session.get("thf");
		if (!thf) {
			var thf = false;
			Session.set('thf', thf);
		}
		var c12 = (thf) ? "active" : "";
		var c24 = (!thf) ? "active" : "";
		var btn12 = "<div class='input-group-btn'><button type='button' class='btn btn-default " + c12 + "' id='tfb12'>12h</button></";
		var btn24 = "<div class='input-group-btn'><button type='button' class='btn btn-default " + c24 + "' id='tfb24'>24h</button></div>";
		return btn12 + btn24;
	}
});
