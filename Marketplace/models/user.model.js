import mongoose from 'mongoose'
//import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    hashed_password: {
        type: String,
        required: 'Password is required2'
    },
    salt: String
 });

 UserSchema.virtual('password')
.set(function(password) {
    console.log("password > set");
    this._password = password;
    //this.salt = this.makeSalt();
    this.hashed_password = password;
    //this.hashed_password = this.encryptPassword(password);
})
.get(function() {
    return this._password;
});
    
UserSchema.path('hashed_password').validate(function(v) {
    console.log("hashed_password");
    if (this._password && this._password.length < 6) {
        this.invalidate('password', 'Password must be at least 6 characters.');
    }
    if (this.isNew && !this._password) {
        console.log(isNew + "//" + this._password);
        this.invalidate('password', 'Password is required3');
    }
}, null);
//module.exports = mongoose.model('User', UserSchema);
export default mongoose.model('User', UserSchema);
