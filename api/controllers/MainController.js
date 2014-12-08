/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	index : function (req, res) {
		res.view();
	},

	partial : function (req, res) {
		var folder = req.param('folder');
		var file = (req.param('file')) ? req.param('file') : 'index';
		res.render(folder + '/' + file);
	}
};