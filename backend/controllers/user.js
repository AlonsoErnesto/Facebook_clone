const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const User = require("../models/User");
const Code = require("../models/Code");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail, sendResetCode } = require("../helpers/mailer");
const generateCode = require("../helpers/generateCode")

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "invalid email address",
      });
    }
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message:
          "This email address already exists,try with a different email address",
      });
    }

    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: "first name must between 3 and 30 characters.",
      });
    }
    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: "last name must between 3 and 30 characters.",
      });
    }
    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: "password must be atleast 6 characters.",
      });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);
    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
      username: newUsername,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Register Success ! please activate your email to start",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.activateAccount = async (req, res) => {
  try {
    const validUser = req.user.id;
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const check = await User.findById(user.id);
    if(validUser !== user.id) {
      return res
        .status(400)
        .json({ message: "No tienes la autorizacion para completar esta operacion." });
    }
    if (check.verified == true) {
      return res
        .status(400)
        .json({ message: "this email is already activated" });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res
        .status(200)
        .json({ message: "Account has beeen activated successfully." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message:
          "the email address you entered is not connected to an account.",
      });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: "Invalid credentials.Please try again.",
      });
    }
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      // add line
      gender:user.gender, 
      token: token,
      verified: user.verified,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.sendVerification = async (req,res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if(user.verified === true) { 
        return res.status(400).json({ 
        message:"Esta cuenta esta activada.",
      });
    }
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    return res.status(200).json({ 
      message:"El link de verificacion se senvio a tu email.",
    });
  } catch (err) {
    res.status(500).json({message:err.message})
  }
}


exports.findUser = async (req,res) => {
  try{
    const {email} = req.body;
    const user = await User.findOne({email}).select("-password");
    if(!user){
      return res.status(400).json({ 
        message:"Este correo no se encuentra registrado.",
      })
    }
    return res.status(200).json({
      email:user.email,
      picture:user.picture
    })
  }catch(err){
    res.status(500).json({message:err.message})
  }
}

exports.sendResetPasswordCode = async (req,res) => {
  try{
    const { email } = req.body;
    const user = await User.findOne({email}).select("-password");
    await Code.findOneAndRemove({user:user._id});
    const code = generateCode(5);
    const savedCode = await new Code({
      code,
      user:user._id
    }).save();
    sendResetCode(user.email,user.first_name,code);
    return res.status(200).json({
      message:"El codigo fue enviado correctamente a su Correo."
    })
  }catch(err){
    res.status(500).json({message:err.message});
  }
}

exports.validateResetCode = async (req,res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({email});
    const Dbcode = await Code.findOne({user:user._id});
    if(Dbcode.code !== code){
      return res.status(400).json({
        message:"El codigo es incorrecto."
      })
    };
    return res.status(200).json({message:"OK"});
  } catch (err) {
    res.status(500).json({message:err.message});
  }
}

exports.changePassword = async (req,res) => {
  const { email , password } = req.body;
  const cryptedPassword = await bcrypt.hash(password,12);
  await User.findOneAndUpdate(
    {email},
    {password:cryptedPassword}
  );
    return res.status(200).json({message:"ok"});
}

exports.getProfile = async (req,res) => {
  try {
    const { username } = req.params;
    const user = await User.findById(req.user.id);
    const profile = await User.findOne({ username }).select("-password");
    const friendship = {
      friends:false,
      followers:false,
      requestSent:false,
      requestReceived:false,
    };


    if (!profile) {
      return res.json({ ok: false });
    }
    if(user.friends.includes(profile._id) && profile.friends.includes(user._id)) {
      friendship.friends = true;
    }
    if(user.following.includes(profile._id)){
      friends.following = true;
    }
    if(user.request.includes(profile,_id)){
      friendship.requestReceived = true;
    }
    if(profile.requests.includes(user._id)){
      friendship.requestSent = true;
    }

    const posts = await Post.find({ user: profile._id })
      .populate("user")
      .sort({ createdAt: -1 });
    res.json({ ...profile.toObject(), posts ,friendship});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.updateProfilePicture = async (req,res) => {
  try {
    const { url } = req.body;
    await User.findByIdAndUpdate(req.user.id,{
      picture: url,
    });
    res.send(url);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.updateCover = async (req,res) => {
  try {
    const { url } = req.body;
    await User.findByIdAndUpdate(req.user.id,{
      cover: url,
    });
    res.send(url);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.updateDetails = async (req,res) => {
  try {
    const { infos } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      {
        details:infos,
      },
      {
        new: true,
      }
    );
    res.json(updated.details);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.addFriend = async (req,res) => {
  try {
    if( req.user.id !== req.params.id){
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(req.params.id);
      if(!receiver.requests.includes(sender._id) && !receiver.friends.includes(sender._id)){
        await receiver.updateOne({
          $push : { requests:sender._id },
        });
        await receiver.updateOne({
          $push : { followers:sender._id },
        });
        await sender.updateOne({
          $push : { following:sender._id },
        });
        res.json({message:"Solicitud de amistad ha sido enviada."})
      } else {
        return res
        .status(400)
        .json({message:"No se pudo enviar la solicitud."});
      };
    }else {
      return res
      .status(400)
      .json({message:"No puedes enviarte una solicitud a ti mismo."});
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


exports.cancelRequest = async (req,res) => {
  try {
    if( req.user.id !== req.params.id){
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(req.params.id);
      if( receiver.requests.includes(sender._id) && !receiver.friends.includes(sender._id)){
        await receiver.updateOne({
          $pull : { requests:sender._id },
        });
        await receiver.updateOne({
          $pull : { followers:sender._id },
        });
        await sender.updateOne({
          $pull : { following:sender._id },
        });
        res.json({message:"Se cancelo correctamente."})
      } else {
        return res
        .status(400)
        .json({message:"No puedes cancelar una solicitud a ti mismo."});
      };
    }else {
      return res
      .status(400)
      .json({message:"Solicitud de amistad ha sido cancelada."});
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


exports.follow = async (req,res) => { 
  try {
    if( req.user.id !== req.params.id){
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(req.params.id);
      if(!receiver.followers.includes(sender._id) && !sender.following.includes(receiver._id)){
        await receiver.updateOne({
          $push : { followers:sender._id },
        });
        await sender.updateOne({
          $push : { following:receiver._id },
        });
        res.json({message:"Se siguio correctamente."})
      } else {
        return res
        .status(400)
        .json({message:"Hubo un problema en seguir, intear otra vez."});
      };
    }else {
      return res
      .status(400)
      .json({message:"No puedes seguirte a ti mismo."});
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.unfollow = async (req,res) => {
  try {
    if( req.user.id !== req.params.id){
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(req.params.id);
      if(receiver.followers.includes(sender._id) && sender.following.includes(receiver._id)){
        await receiver.updateOne({
          $push : { followers:sender._id },
        });
        await sender.updateOne({
          $pull : { following:sender._id },
        });
        // Si agregas personas que siguen al perfil
        await sender.updateOne({
          $pull : { following:receiver._id },
        });
        res.json({message:"Se dejo de seguir correctamente."})
      } else {
        return res
        .status(400)
        .json({message:"No se realizo la funcion, intentar nuevamente."});
      };
    }else {
      return res
      .status(400)
      .json({message:"No puedes dejarte de seguir a ti mismo."});
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.unfriend = async (req,res) => {
  try {
    if( req.user.id !== req.params.id){
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(req.params.id);
      if(receiver.friends.includes(sender._id) && sender.friends.includes(receiver._id)){
        await receiver.update({
          $pull : { friends:sender._id ,following:sender._id, followers:sender._id},
        });
        await sender.update({
          $pull : { friends:receiver._id ,following:receiver._id, followers:receiver._id},
        });
        res.json({message:"Se elimino el amigo correctamente."})
      } else {
        return res
        .status(400)
        .json({message:"No se realizo la funcion, intentar nuevamente."});
      };
    }else {
      return res
      .status(400)
      .json({message:"No puedes eliminarte como amigo a ti mismo."});
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.deleteRequest = async (req,res) => {
  try {
    if( req.user.id !== req.params.id){
      const receiver = await User.findById(req.user.id);
      const sender = await User.findById(req.params.id);
      if(receiver.requests.includes(sender._id)){
        await receiver.update({
          $pull : { requests:sender._id ,follow:sender._id},
        });
        await sender.update({
          $pull : { following:receiver._id },
        });
        res.json({message:"Solicitud eliminada."})
      } else {
        return res
        .status(400)
        .json({message:"No se realizo la funcion, intentar nuevamente."});
      };
    }else {
      return res
      .status(400)
      .json({message:"No puedes eliminarte a ti mismo."});
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.acceptRequest = async (req,res) => {
  try {
    if( req.user.id !== req.params.id){
      const receiver = await User.findById(req.user.id);
      const sender = await User.findById(req.params.id);
      if(receiver.requests.includes(sender._id)){
        await receiver.update({
          $push : { friends:sender._id ,following:sender._id},
        });
        await sender.update({
          $push : { friends:receiver._id, followers:receiver._id },
        });
        await receiver.updateOne({
          $pull : { requests:sender._id }, 
        });
        res.json({message:"Se acepto correctamente."})
      } else {
        return res
        .status(400)
        .json({message:"No se realizo la funcion, intentar nuevamente."});
      };
    }else {
      return res
      .status(400)
      .json({message:"No puedes aceptarte a ti mismo."});
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

