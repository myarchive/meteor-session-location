Package.describe({
    summary: "Session based geolocation api package that makes location information available via sessions"
});

Package.on_use(function (api) {
	api.use('standard-app-packages', ['client', 'server']);
	
	api.add_files("location.js", "client");
    api.add_files("navform.css", "client");
    api.add_files("navform.html", "client");
    api.add_files("navform.js", "client");
});
