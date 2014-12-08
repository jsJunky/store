Store
=============

This is work in progress [Sails](http://sailsjs.org) application.

General Architecture
-------

The plan here will be to generate the angularjs partials server side to allow for separate admin, group, or user views later down the line. This is handled in config/routes.js

```JSON
'get /partials/:folder/:file' : 'main.partial',
'/*' : 'main.index'
```

While every missed route gets passed back to MainController's index action, sailsjs will still serve static js/css files through its assets folder. We will place our store-angular app here which points the templateUrl's back to the correct partial.

The main/index view can be moved back into the layout but unsure on final design yet so keeping that separated at this point.

Model Improvements
-------

The Cart and User model use arrays for attributes and we could instead use the association tables built into [Waterline](https://github.com/balderdashy/waterline). 

Other Improvements
-------

The Gruntfile hasn't been touched yet but we need to expand on this to compile the angular app during the sails lift. Though for development it will be better to keep these separated.


SailsJS store -- In progress