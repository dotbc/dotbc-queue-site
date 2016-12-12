import aws from 'aws-sdk';
const config = require('cconfig')();

export default function (app) {

  app.get('/sign-s3', (req, res) => {
    
    const s3 = new aws.S3();
    
    const fileName = req.query.name;
    const fileType = req.query.type;
    
    const s3Params = {
      Bucket: config.AWS_BUCKET,
      Key: `${config.NODE_ENV}/${req.user._id}/logo-${fileName}`,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) return res.end();
      
      res.write(JSON.stringify({
        signedRequest: data,
        url: `https://${config.AWS_BUCKET}.s3.amazonaws.com/${config.NODE_ENV}/${req.user._id}/logo-${fileName}`
      }));

      res.end();
    });

  });

}