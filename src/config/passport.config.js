const passport = require('passport');
const userService = require('../Daos/Mongo/models/users.model')

const initializePassport = () => {
    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async (id, done) => {
        let user = await userService.findById(id);
        done(null, user);
    });
}

module.exports = {
    initializePassport
}
