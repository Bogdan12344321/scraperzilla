const mongoose = require('mongoose');
const validator  = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required:true
        }
    }]

}, {
    timestamps: true
});

userSchema.methods.generateAuthToken = async function (){
    const user = this
    const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({token});

    return user.save();
};

userSchema.statics.getLoggedUser = async function (req){
    const authorization = req.header('Authorization');
    if(authorization){       
        const token = authorization.replace('Bearer ','');
        const decodedJwt =  jwt.verify(token, process.env.JWT_SECRET);
        return User.findOne({ _id:decodedJwt.id,'tokens.token':token });
    }
}

userSchema.statics.findByCredentials = async (username, password) => {

    const user = await User.findOne({username:username});

    if(!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
}

userSchema.pre('save',async function (next) {
    
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }

    next();
})


const User = mongoose.model('User', userSchema);

module.exports = User;