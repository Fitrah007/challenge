const qr = require('qr-image');
const imagekit = require('./imagekit');

module.exports = (text, ecLevel = 'M')=>{
    return new Promise (async(resolve, reject)=>{
        try {
            const qrBuffer = await qr.imageSync(text, ecLevel)
            const qrString = qrBuffer.toString('base64');

            const qrFile = await imagekit.upload({
                fileName: text,
                file: qrString
            })
            resolve(qrFile.url)
        } catch (err) {
            reject(err)
        }
    // .then(data =>{
    //     const stringFile = data.toString('base64');

    //         imagekit.upload({
    //             fileName: req.file.originalname,
    //             file: stringFile
    //         })
    //         .then(imagekitFile =>{
    //             resolve(imagekitFile.url);
    //         })
    //         .catch(err=>{
    //             reject(err)
    //         })
    // })
    // .catch(err =>{
    //     reject(err)
    // })
 })
}
// var qr_svg = qr.image('I love QR!', { type: 'svg' });
// qr_svg.pipe(require('fs').createWriteStream('i_love_qr.svg'));
 
// var svg_string = qr.imageSync('I love QR!', { type: 'svg' });