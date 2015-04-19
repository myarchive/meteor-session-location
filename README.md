### Session Location - Meteor Smart Package

This smart package uses the geolocation api and keeps the result plus timezone, 
geocoding and elevation stored as an array in a session named "geo".  The "geo" 
session variable will always have your geolocation in it and by default it fills
a session named "loc" with that data as well.  The "loc" session variable can be 
changed for your site to allow manual location selection.

To use this package simply call sessionGeo() in the JS or you can also do this in
a beforeAction with iron-router.  You can updateLocation(true) to set "loc" back
to the geolocation data or use updateLocation('Somecityhere') and it will use
Google geocoding to update that information.

This package also loads a default "thf" session variable for twelve hour formatting
as true or false (true by default).

Also this includes two optional templates "geonavform" and "thfnavbutton".  Updating
the session variables via the functions or manually can replace the forms if you
do not want to use them, but they were included for ease and quickness of use.

### How to use?

1. `meteor add alisalaah:session-location`
2. In your application code (visible to client) add this line -> sessionGeo();

### Functions

#### sessionGeo();

Initializes and sets the Session data for all variables using Geolocation API

#### updateLocation(arg)

Updates the session variable "loc" for actual use.  Even if you want to use their
geolocation data use the "loc" data in your actual application not the "geo" variable.

updateLocation(true); // Updates "loc" using the geolocation data
updateLocation("London"); // Will return guess from Google for best city and set "loc" to that

### Help

If you are having any problems debug the content of Session.get("loc") and Session.get("geo")
as many useful values are there (such as if browser supported geolocation or if the
user denied it).  In the future we will allow custom popup messages on no support
or no allow but currently that is commented out.  (This can be edited manually if you like
in the locations.js).
