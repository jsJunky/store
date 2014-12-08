/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	index: function (req, res) {
		User.findOne(req.session.user.id)
		.done(function(err, user) {
			if (err) return res.send(err, 400);
			res.json({ user : user.toJSON() });
		});
	},

	update: function (req, res) {
        var id = req.params.id;
        var firstName = req.param("firstName");
        var lastName = req.param("lastName");
        var username = req.param("username");
        var password = req.param("password");
        var email = req.param("email");
        var location = req.param("location");

        if (password !== '' && password !== null && typeof password !== "undefined") {
            var data = { password: password };
        } else {
            var data = { username: username, email: email, firstName: firstName,
                     lastName: lastName, location: location };
        }

        User.update(id, data).done(function(err, user) {
            if (err) {
                return res.json({ error: JSON.stringify(err) },500);
            } else if (user !== []) {
                req.session.user = user[0].toJSON();
                return res.json(user[0].toJSON(), 200);
            } else {
                return res.json({ error: "Bad request" }, 400)
            }
        });
    },
};

