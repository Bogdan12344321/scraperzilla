const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        let decodedJwt;
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if (err) {
              res.status(404).send({ error: 'Jwt expired.' })
            }else{
                decodedJwt = decoded;
            }
          });
        const user = await User.findOne({ _id:decodedJwt.id,'tokens.token':token });
        if(!user){
            throw new Error()
        }

        req.token = token
        req.user = user;
        next();
    } catch(e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth;
