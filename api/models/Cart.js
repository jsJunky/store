/**
* Cart.js
*
* @description :: This should be moved to an association table perhaps? Or an association
*                 table linking the user to the cart with the cart then holding an array of
*                 items for the user. With limited time I'm going to forgo the association tables
*                 which I have limited experience with outside of m$'s entity framework.
*                 Also need to rethink item count. This whole thing would be better with a sql
*                 database. For now it will hold an array of objects...bleh aweful.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        user: {
            type: 'string',
            required: true
        },
        items: {
        	type: 'array',
        	defaultsTo: []
        }
    }
};

