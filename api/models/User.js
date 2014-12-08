var bcrypt = require('bcrypt-nodejs'),
    SALT_WORK_FACTOR = 10,
    crypto = require('crypto');

module.exports = {

    tableName: 'users',

    attributes: {

        username: {
            type: 'string',
            minLength: 3,
            unique: true,
            required: true
        },

        password: {
            type: 'string',
            minLength: 5,
            required: true,
            columnName: 'encrypted_password'
        },

        salt: {
            type: 'string',
            required: false
        },

        firstName: {
            type: 'string',
            minLength: 2,
            maxLength: 25,
            defaultsTo: '',
            required: false
        },

        lastName: {
            type: 'string',
            minLength: 2,
            maxLength: 25,
            defaultsTo: '',
            required: false
        },

        email: {
            type: 'email',
            required: true
        },

        favorites: {
        	type: 'array',
        	defaultsTo: []
        },

        location: {
            type: 'string',
            maxLength: 25,
            defaultsTo: '',
            required: false
        },

        fullName: function() {
            return this.firstName + ' ' + this.lastName
        },

        // Remove password and salt on return
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            delete obj.salt;
            obj.fullName = this.fullName();
            obj.gravatar_hash = this.gravatarHash();
            return obj;
        },

        verifyPassword: function (plainTextPassword) {
            var encryptedInput = bcrypt.hashSync(plainTextPassword, this.salt);
            if (encryptedInput === this.password) {
                return true;
            }
            return false;
        }

    },


    // Lifecycle Callbacks
    beforeCreate: function(values, next) {
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) return next(err);
            values.salt = salt;
            bcrypt.hash(values.password, salt, function(err, hash) {
                if(err) return next(err);
                values.password = hash;
                next();
            });
        });
    },

    beforeUpdate: function (values, next) {
        if (values.password) {
            bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
                if (err) return next(err);
                values.salt = salt;
                bcrypt.hash(values.password, salt, function(err, hash) {
                    if(err) return next(err);
                    values.password = hash;
                    next();
                });
            });
        } else {
            next();
        }
    }
};
