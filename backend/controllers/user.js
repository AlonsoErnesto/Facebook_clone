const { validateEmail,validateLength, validateUsername } = require("../helpers/validation")
const { generateToken } = require("../helpers/tokens")
const User = require("../models/User"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../helpers/mailer");


exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      //username,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;
 
    if(!validateEmail(email)){
      return res.status(400).json({
        message: "Correo Invalido .",
      });
    };

    const check = await User.findOne({email});
    if(check){
      return res.status(400).json({
        message: "Este correo ya esta registrado.",
      });
    };

    if(!validateLength(first_name,3,30)){
      return res.status(400).json({
        message: "Nombre no cuenta con mayor de 3 y menor a 30 caracteres.",
      });
    }

    if(!validateLength(last_name,3,30)){
      return res.status(400).json({
        message: "Apellido no cuenta con mayor de 3 y menor a 30 caracteres.",
      });
    };

    if(!validateLength(password,4,40)){
      return res.status(400).json({
        message: "Password mayor a 4 caracteres."
      });
    };
    //ERROR BUG
    const cryptedPassword = await bcrypt.hash(password, 12);
    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);

    const user = await new User({
      first_name,
      last_name,
      email,
      password:cryptedPassword,
      username:newUsername,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();

    const emailVerificationToken = generateToken({id: user._id.toString()}, "30m");
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email,user.first_name,url);
    const token = generateToken({id:user._id.toString()},"7d")
    res.send({
      id:user._id,
      username:user.username,
      picture:user.picture,
      first_name:user.first_name,
      last_name:user.last_name,
      token:token,
      verified:user.verified,
      message:"Cuenta registrada, porfavor active su cuenta en su correo para empezar."
    })
  } catch (err) {
    res.status(500).json({message:err.message});
  };
};



exports.activateAccount = async (req,res) => {
  try {
    const { token } = req.body;
    const user = jwt.verify(token,process.env.TOKEN_SECRET);
    const check = await User.findById(user.id);
    if(check.verified === true){
      return res.status(400).json({message:"Esta cuenta ya fue activada."})
    }else {
      await User.findByIdAndUpdate(user.id,{verified:true});
      return res.status(200).json({message:"La cuenta se activo correctamente."})
    }
  } catch (err) {
    res.status(500).json({message:err.message});
  }
}


exports.login = async (req,res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message:"EL email no es correcto"});
    const check = await bcrypt.compare(password,user.password);
    if(!check){ return res.status(400).json({message:"Credenciales incorrectas, intentelo de nuevo."})};
    //
    const token = generateToken({id:user._id.toString()},"7d")
    res.send({
      id:user._id,
      username:user.username,
      picture:user.picture,
      first_name:user.first_name,
      last_name:user.last_name,
      token:token,
      verified:user.verified,
      message:"Cuenta registrada, porfavor active su cuenta en su correo para empezar."
    });
  } catch (err) {
    res.status(500).json({message:err.message});
  }
}