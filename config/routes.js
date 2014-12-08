/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  //The idea here is that we use static files for angularjs or if we do compile it
  //then this would be on a different system then the api. Here we are doing
  //both on the same server so splitting it up. The plan is for the angular app
  //to use a promise and call the api for the upcoming json data for the page.
  //Once that is completed we continue on to the page grabbing the html. This
  //could all be rendered together and for this particular application it would
  //make more sense to render everything server side because then we could handle
  //admin users, groups, etc. But wanted this to be a full example making use of
  //angular with an api.

  //Partials... These are the files that are normally just cached static files
  //on nginx,apache or a cdn...whatever people want to do.
  'get /partials/:folder/:file' : 'main.partial',
  //API
  //Item actions
  'get /api/items?limit'    : 'item.index',
  'get /api/item/{id}'      : 'item.item',
  //Cart actions
  'get /api/cart'           : 'cart.index',
  'post /api/cart/additems' : 'cart.additems',
  //User actions
  'get /api/user'           : 'user.index',
  'post /api/user'          : 'user.update',
  'get /api/user/favorites' : 'user.favorites',
  //Catch the rest and send to Angular main view and let
  //it handle grabbing the partials.
  '/*' : 'main.index'

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
