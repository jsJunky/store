/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var passport = require('passport');

module.exports = {

    index: function (req, res) {
        if (req.session.authenticated) {
        	if (req.param('redirect') != null) {
                res.redirect('/');
            } else {
            	res.redirect(req.param('redirect'));
            }
        } else {
            res.view({ title: 'Login' });
        }
    },
    //TODO: Add checking for admin during login.
    login: function (req, res) {
        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)){
                res.send(400, {error: err});
            } else {
                req.logIn(user, function(err) {
                    if (err) res.send(err);
                    req.session.authenticated = true;
                });
                //Set user session data
                User.findOne({id: user.id}, function(err, userInfo) {
                    if(err) res.send(500, { error: "DB Error" }); 

                    req.session.user = userInfo.toJSON();
                    res.send(userInfo.toJSON());
                });
            }
        })(req, res);
    },

    logout: function (req, res) {
        req.logout();
        req.session = null;
        res.clearCookie(sails.config.session.key, { path: '/' });
        res.redirect('/');
    }

};

