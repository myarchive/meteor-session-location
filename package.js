Package.describe({
	name: 'alisalaah:session-location',
	summary: 'Session based geolocation api package that makes location information available via sessions',
	version: '2.0.2',
	git: 'https://github.com/alisalaah/meteor-session-location.git'
});

Package.onUse(function(api) {
	api.versionsFrom('METEOR@0.9.2');
	api.use(['ui'], 'client');
	api.use(['blaze'], 'client');
	api.use(['templating'], 'client');
	api.use('mrt:googlemaps', 'client');
	
	api.add_files("location.js", "client");
    api.add_files("navform.css", "client");
    api.add_files("navform.html", "client");
    api.add_files("navform.js", "client");
});
