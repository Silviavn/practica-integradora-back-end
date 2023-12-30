const passport = require('passport');
const local = require('passport-local')
const GitHubStrategy = require('passport-github2');

const { UserManagerMongo } = require('../Daos/Mongo/userManager');
const { createHash, isValidPassword } = require('../utils/hashBcryp');

const LocalStrategy = local.Strategy;
const userManager = new UserManagerMongo();

const initializePassport = () => {
    passport.use(
        "register",

        new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {
            const { first_name, last_name, email } = req.body;

            try {
                let user = await userManager.getUserByEmail(username);
                if (user) {
                    console.log("El usuario ya existe");
                    // null significa que no hay error y el false que no se pudo crear el usuario
                    return done(null, false);
                }

                const newUser = {
                    first_name,
                    last_name,
                    age,
                    email,
                    password: createHash(password),
                };

                let result = await userManager.createUser(newUser);
                // null significa que no hay error y result es el usuario creado
                return done(null, result);
            } catch (error) {
                return done("Error al obtener el usuario" + error);
            }
        })
    );

    passport.serializeUser((user, done) => {
        // null significa que no hay error y user._id es el id del usuario
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await userManager.getUserById(id);
        done(null, user);
    });


    passport.use("login", new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
        try {
            const user = await userManager.getUserByEmail(username);
            console.log('here', user, password, isValidPassword(password, user))
            if (!user) {
                console.log("El usuario no existe");
                return done(null, false);
            }

            if (!isValidPassword(password, user)) return done(null, false);

            return done(null, user);

        }
        catch (error) {
            return done("Error al obtener el usuario " + error);
        }
    }));

    passport.use("github", new GitHubStrategy({
        clientID: "Iv1.ec1df9050380472d",
        clientSecret: "b4d6efa25d0c0f95b05a20bcafc5f07c802a01cc",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {

            const user = await userManager.getUserByEmail(profile._json.email);
            if (!user) {
                const email = profile._json.email || profile._json.id;
                const newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    email,
                    password: '',
                }
                const result = await userManager.createUser(newUser);
                return done(null, result);
            }

            return done(null, user);

        }
        catch (error) {
            return done("Error al obtener el usuario" + error);
        }
    }));
};

module.exports = {
    initializePassport
}
