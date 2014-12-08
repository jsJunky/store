/**
* Item.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    tableName: 'items',

    attributes: {
        thumbnailUrl: {
        	type: 'string',
        	defaultsTo: 'http://defailtImage.com/defaultImage'
        },

        price: {
        	type: 'float',
        	defaultsTo: 0.00,
        	required: true
        },

        description: {
        	type: 'text',
        	defaultsTo: '',
        	required: true
        },

        quantity: {
        	type: 'integer',
        	defaultsTo: 0
        },

        name: {
        	type: 'string',
        	defaultsTo: '',
        	required: true
        }
    }
};

