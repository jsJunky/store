/**
 * ItemController
 *
 * @description :: Server-side logic for managing items
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    //Return paginated list of items.
    index: function (req, res) {
    	//No validation but will be checked during use with Waterline.
    	var limit = (req.params('limit')) ? req.params('limit') : 10;
    	var page = (req.params('page')) ? req.params('page') : 0;
    	var skip;
    	//Need real validation.
    	try {
            skip = page * limit;
    	} catch (e) {
            return res.send({ error: "Limit and page must be integers" });
    	}
    	//var skip = page * limit; //Could err if they are not integers/floats.
    	Item.find()
    	.limit(limit)
    	.skip(skip)
    	.done(function(err, items) {
    		if (err) return res.send(err, 400);
    		res.json({ items : items  });
    	});
    },
    //
    item: function (req, res) {
    	var itemID = req.param.id;
    	Item.findOneById(itemID)
    	.done(function(err, item) {
    		if (err) return res.send(err, 400);
    		res.json({ item :  item  });
    	});
    }
};

