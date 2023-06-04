const {User} = require('../db/models');
const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = process.env;

module.exports = {
    auth: async (req, res, next) => {
        try {
            const {authorization} = req.headers;

            console.log('TOKEN :', authorization);
            if (!authorization) {
                return res.status(401).json({
                    status: false,
                    message: 'you\'re not authorized!',
                    data: null
                });
            }

            const data = await jwt.verify(authorization, JWT_SECRET_KEY);
            req.user = {
                id: data.id,
                name: data.name,
                email: data.email,
                user_type: data.user_type,
                verify: data.verify
            };

            next();
        } catch (err) {
            next(err);
        }
    },
    role: (user_type)=>{
        return async(req, res,next)=>{
        try {
            const {email} = req.user; 
            console.log(user_type)
            const role = await User.findOne({where:{user_type:user_type, email}})
            if(!role){
                return res.status(404).json({
                    status: false,
                    message: 'you\'re not authorized!',
                    data: null
                })
            }
                
            next();
        } catch (err) {
            next(err)
        }
    }}
};