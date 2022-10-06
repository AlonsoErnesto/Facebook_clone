const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;


const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "El nombre es requerido"],
    trim: true,
    text: true,
  },
  last_name: {
    type: String,
    required: [true, "El apellido es requerido"],
    trim: true,
    text: true,
  },
  username: {
    type: String,
    required: [true, "El usuario es requerido"],
    trim: true,
    text: true,
    unique: true
  },
  email: {
    type: String,
    required: [true, "El correo es requerido"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password es requerido"],
  },
  picture: {
    type: String,
    default: "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png",
    trim: true,
  },
  cover: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    required: [true, "Genero es requerido"],
    trim: true,
  },
  bYear: {
    type: Number,
    required: true,
    trim: true,
  },
  bMonth: {
    type: Number,
    required: true,
    trim: true,
  },
  bDay: {
    type: Number,
    required: true,
    trim: true
  },
  verified: {
    type: Boolean,
    default: false,
  },
  friends: {
    type: Array,
    default: []
  },
  following: {
    type: Array,
    default: []
  },
  followers: {
    type: Array,
    default: [],
  },
  requests: {
    type: Array,
    default: [],
  },
  search: [
    {
      user: {
        type: ObjectId,
        ref: "User",
      },
    },
  ],
  details: {
    bio: {
      type: String,
    },
    otherName: {
      type: String,
    },
    job: {
      type: String,
    },
    workplace: {
      type: String,
    },
    highSchool: {
      type: String,
    },
    college: {
      type: String,
    },
    currentCity: {
      type: String,
    },
    hometown: {
      type: String,
    },
    relationsip: {
      type: String,
      enum:["Soltero","En una relacion","Casado","Divorciado"],
    },
    instagram: {
      type: String,
    },
  },
  savePost:[
    {
      post:{
        type:ObjectId,
        ref:'Post',
      },
      savedAt:{
        type:Date,
        default: new Date(),
      },
    },
  ],
},
  {
    timestamps:true,
  }
);


module.exports = mongoose.model('User',userSchema);
