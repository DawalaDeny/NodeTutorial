const path = require('path')
const {StatusCodes} = require('http-status-codes')
const customError = require('../errors/index')
const cloudinary = require('cloudinary').v2
const fs = require('fs')

const uploadProductImageLocal = async (req, res) => {
    if (!req.files){
        throw new customError.BadRequestError('no file uploaded')
    }
    const image = req.files.image;
    if (!image.mimetype.startsWith('image')){
        throw new customError.BadRequestError('please upload an image')
    }
    const maxSize = 1024*1024
    if (image.size > maxSize){
        throw new customError.BadRequestError(`please upload something smaller than ${maxSize} kb`)
    }

    const imagePath = path.join(__dirname,'../public/uploads/' + `${image.name}` );
await image.mv(imagePath);
    return res.status(StatusCodes.OK).json({image:{src:`/uploads/${image.name}`}})
}

const uploadProductImage= async (req, res) => {
  
const result = await cloudinary.uploader.upload(req.files.image.tempFilePath,{
    use_filename:true, folder:'07-file-upload'
})
fs.unlinkSync(req.files.image.tempFilePath)
return res.status(StatusCodes.OK).json({image:{src:result.secure_url}})
}

module.exports = {
    uploadProductImage
}