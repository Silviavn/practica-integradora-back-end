const { Router } = require('express')
const passport = require('passport')
const { userModel } = require('../../Daos/Mongo/models/users.model.js')
const { createHash, isValidPassword } = require('../../utils/hashBcryp.js')
const { generateToken } = require('../../utils/jsonWebToken.js')

// __________________________________________________________ passport _____________________________________________


const router = Router()

// router.post('/login', async (req,res) => {
//     const { email, password } = req.body
   
//     // validar que venga email y password

//     // buscar el usuario 
//     const user = await userModel.findOne({email})
//     // console.log('user Login',user)
//     if (!user) return res.status(401).send({status: 'error', error: 'Usuario no existe'})

//     if (!isValidPassword(password, user)) {
//         return res.status(401).send({status: 'error', error: 'Datos ingresados incorrectos'})
//     }   

//     const token = generateToken({
//         first_name: user.first_name,
//         last_name: user.last_name,
//         email: user.email,
//         role: user.role
//     })
    
//     // dos formas de enviar el token
//     // cookie me sirve para mi habdlebar
//     res.cookie('cookieToken', token, {
//         maxAge: 60*60*10000,
//         httpOnly: true
//     }).status(200).send({
//         status: 'success',
//         // token: token,
//         message: 'loggen successfully'
//     })

//     // res.send('logueado')
// })

router.post("/login", passport.authenticate("login", { failureRedirect: "faillogin" }), async (req, res) => {
    if (!req.user) return res.status(400).send({ status: "error", message: "Error credenciales inválidas" });
    const { first_name, last_name, email } = req.user;

    req.session.user = {
        first_name,
        last_name,
        email,
    };

    res.send({ status: "success", payload: req.user });
});
  

// http://localhost:8080/api/sessions /register
// router.post('/register', async (req,res) => {
//     try {
//         const { first_name, last_name, email, password } = req.body
//         // validar campos
//         if (!first_name) {
//             return res.send({status: 'error', error: 'completar todos los campos'})
//         }
//         const exists = await userModel.findOne({email})

//         if (exists) return res.status(401).send({status: 'error', error: 'El usuario con el mail ingresado ya existe'})

//         const newUser = {
//             first_name,
//             last_name,
//             email, 
//             password: createHash(password)
//         }

//         let result = await userModel.create(newUser)
//         // validar result

//         res.send({status: 'success', message: 'El ususario fue creado correctamente'})
//     } catch (error) {
//         console.log(error)
//     }
    
// })

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => { });

router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "login" }), async (req, res) => {
  req.session.user = req.user;
  res.redirect("/profile");
});

router.post(
    "/register",
    passport.authenticate("register", { failureRedirect: "failregister" }),
    async (req, res) => {
        res.send({ status: "success", message: "Usuario registrado" });
    }
);

module.exports = router
