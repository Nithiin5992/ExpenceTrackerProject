const Expence = require('../models/expence');
const aws = require('aws-sdk');
const downloadedurl = require("../models/downloadedurl");
function uploadtoS3(data, filename) {
    const accessKeyId = '';
    const secretkey = '';
    const bucket_name = 'nithin9949';
    const s3bucket = new aws.S3({
        accessKeyId: accessKeyId,
        secretAccessKey: secretkey
    })
    var params = {
        Bucket: bucket_name,
        Key: filename,
        Body: data,
        ACL: 'public-read'
    }
    return new Promise((resolve, reject) => {
        s3bucket.upload(params, (err, s3responce) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                console.log(s3responce)
                resolve(s3responce.Location);
            }
        })
    })

}
exports.downloadexpence = async (req, res) => {
    try{
        const userId=req.userid
        
         const expences = await Expence.findAll({ where: { userId: req.userid } })
         const stringifiedexpence=JSON.stringify(expences);
         const filename="expence.txt";
         const fileurl=await uploadtoS3(stringifiedexpence,filename)
          res.status(200).json({fileurl,success:true})
          await downloadedurl.create({userId:userId,url:fileurl})
    }catch(err){
        console.log(err)
    }
}