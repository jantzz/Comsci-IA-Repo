const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");

mongoose.createConnection("mongodb://localhost/sec_auth_app_Role", {useNewUrlParser:true, useUnifiedTopology:true},(err)=> {
  if(err)   console.log(err);
});

const UserSchema = mongoose.Schema({
  username : String,
  password : String,
  email: String,
  role : String,
  status : String
}
);

//Export the Model 
const User = mongoose.model("User", UserSchema);

module.exports = User;