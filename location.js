this.sessionGeo = function() {
	var geo = Session.get("geo"); if (!geo) { var geo = {}; geo.inuse = false; }
	var loc = Session.get("loc"); if (!loc) { var loc = {}; Session.set("loc",loc); }
	var thf = Session.get("thf"); if (!thf) { Session.setDefault("thf",true); }

	if (navigator.geolocation) {
		geo.support = true;
		navigator.geolocation.getCurrentPosition(function(position) {
			geo.allowed = true;

			var lat = position.coords.latitude.toFixed(6);
			var lng = position.coords.longitude.toFixed(6);
			
			if (!geo.lat || (geo.lat && (geo.lat !== lat || geo.lng !== lng))) {
				GoogleMaps.init({'sensor': true}, function() {
					var latLng = new google.maps.LatLng(lat,lng);
					var ctime = Math.round(new Date().getTime() / 1000);
					var tzurl = "https://maps.googleapis.com/maps/api/timezone/json?location=" + lat + "," + lng + "&timestamp=" + ctime + "&sensor=true";
					var geocoder = new google.maps.Geocoder();
					var elevator = new google.maps.ElevationService();

					elevator.getElevationForLocations({'locations': [latLng]}, function(edata, status) {
						if (status === google.maps.ElevationStatus.OK) {
							geocoder.geocode({'latLng': latLng}, function(gdata, status) {
								if (status === google.maps.GeocoderStatus.OK) {
									$.ajax(tzurl).done(function(tdata) {
										for (var i = 0; i < gdata.length; i++) {
											for (var j = 0; j < gdata[i].address_components.length; j++) {
												for (var k = 0; k < gdata[i].address_components[j].types.length; k++) {
													if (gdata[i].address_components[j].types[k] === 'locality') {
														var city_name = gdata[i].address_components[j].long_name;
													}
													if (gdata[i].address_components[j].types[k] === 'country') {
														var country = gdata[i].address_components[j].short_name;
														var country_name = gdata[i].address_components[j].long_name;
													}
												}
											}
											if (!address) {
												var address = gdata[i].formatted_address;
												var address_level = gdata[i].geometry.location_type;
											}
										}

										geo.lat = lat;
										geo.lng = lng;
										geo.elevation = edata[0].elevation;
										geo.offset = (tdata["rawOffset"] + tdata["dstOffset"]) / 3600;
										geo.offsetBase = tdata["rawOffset"] / 3600;
										geo.offsetDst = tdata["dstOffset"] / 3600;
										geo.timeZoneId = tdata["timeZoneId"];
										geo.timeZoneName = tdata["timeZoneName"];
										geo.address = address;
										geo.addressLevel = address_level;
										geo.city = city_name;
										geo.country = country_name;
										geo.countryId = country;

										if (!loc || (loc && !loc.display)) {
											var loc = geo;
											delete loc.inuse;
											delete loc.support;
											delete loc.allowed;
											loc.display = geo.lat + ", " + geo.lng;
											geo.inuse = true;
											Session.set("loc",loc);
										}
										
										geo.support = true;
										geo.allowed = true;
										
										Session.set("geo",geo);
									});
								};
							});
						}
					});
				});
			}			
		}, function() {
			geo.allowed = false;
			Session.set("geo", geo);
			if (!Session.get("geowarn")) {
				Session.set("geowarn",true);
				// WARNING HERE
			}
		});
	}

	// Browser doesn't support geolocation (old browser)
	else {
		geo.support = false;
		Session.set("geo", geo);
		if (!Session.get("geowarn")) {
			Session.set("geowarn",true);
			// WARNING HERE
		}
	}
};

this.updateLocation = function(arg) {
	if (arg === true) {
		var geo = Session.get("geo");
		var loc = geo;
		delete loc.inuse;
		delete loc.support;
		delete loc.allowed;
		loc.display = geo.lat + ", " + geo.lng;

		geo.inuse = true;
		geo.allowed = true;
		geo.support = true;
		
		Session.set("geo",geo);
		Session.set("loc",loc);
	}
	else {
		setLoc(arg);
	}
};

function setLoc(arg) {
	var geo = Session.get("geo");
	var loc = Session.get("loc");

	GoogleMaps.init({'sensor': true}, function() {
		var geocoder = new google.maps.Geocoder();
		// var geoinput = document.getElementById("geoform").value;
		geocoder.geocode({'address': arg}, function(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				var lat = results[0].geometry.location.lat().toFixed(6);
				var lng = results[0].geometry.location.lng().toFixed(6);
				var res = results[0].formatted_address;
				
				var latLng = new google.maps.LatLng(lat,lng);
				var ctime = Math.round(new Date().getTime() / 1000);
				var tzurl = "https://maps.googleapis.com/maps/api/timezone/json?location=" + lat + "," + lng + "&timestamp=" + ctime + "&sensor=true";
				var geocoder = new google.maps.Geocoder();
				var elevator = new google.maps.ElevationService();

				elevator.getElevationForLocations({'locations': [latLng]}, function(edata, status) {
					if (status === google.maps.ElevationStatus.OK) {
						geocoder.geocode({'latLng': latLng}, function(gdata, status) {
							if (status === google.maps.GeocoderStatus.OK) {
								$.ajax(tzurl).done(function(tdata) {
									for (var i = 0; i < gdata.length; i++) {
										for (var j = 0; j < gdata[i].address_components.length; j++) {
											for (var k = 0; k < gdata[i].address_components[j].types.length; k++) {
												if (gdata[i].address_components[j].types[k] === 'locality') {
													var city_name = gdata[i].address_components[j].long_name;
												}
												if (gdata[i].address_components[j].types[k] === 'country') {
													var country = gdata[i].address_components[j].short_name;
													var country_name = gdata[i].address_components[j].long_name;
												}
											}
										}
										if (!address) {
											var address = gdata[i].formatted_address;
											var address_level = gdata[i].geometry.location_type;
										}
									}

									loc.display = res;
									loc.lat = lat;
									loc.lng = lng;
									loc.elevation = edata[0].elevation;
									loc.offset = (tdata["rawOffset"] + tdata["dstOffset"]) / 3600;
									loc.offsetBase = tdata["rawOffset"] / 3600;
									loc.offsetDst = tdata["dstOffset"] / 3600;
									loc.timeZoneId = tdata["timeZoneId"];
									loc.timeZoneName = tdata["timeZoneName"];
									loc.address = address;
									loc.addressLevel = address_level;
									loc.city = city_name;
									loc.country = country_name;
									loc.countryId = country;
									geo.inuse = false;
									Session.set("loc",loc);
									Session.set("geo",geo);
								});
							};
						});
					}
				});
			}
		});
	});
};
