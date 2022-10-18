const fs = require('fs');

module.exports = async function  (req,res,next) {
   try {
      if(!req.files || Object.values(req.files).flat().length === 0){
         return res.status(400).json({message:"Archivos no seleccionados."})
      }
      let files = Object.values(req.files).flat();
      files.forEach((file)=>{
         if (
            file.mimetype !== "image/jpeg" &&
            file.mimetype !== "image/jpg" &&
            file.mimetype !== "image/png" &&
            file.mimetype !== "image/gif" &&
            file.mimetype !== "image/webp"
            ){
            removeTmp(file.tempFilePath)
            return res.status(400).json({message:"No soporta el tipo de formato."})
         }
         if (file.size > 1024 * 1024 * 10){
            removeTmp(file.tempFilePath)
            return res.status(400).json({message:"No soporta el peso(+5MB) del archivo."})
         }
      })
      next();
   } catch (err) {
      return res.status(500).json({message:err.message});
   }
};

const removeTmp = (path) => {
   fs.unlink(path,(err)=>{
      if(err) throw err;
   });
};