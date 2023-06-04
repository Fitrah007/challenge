const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const media = require('../controllers/media');
const produk = require('../controllers/produk');
const komponen = require('../controllers/komponen');
const pemasok = require('../controllers/pemasok');
const storage = require('../utils/storage');
const multer = require('multer')();
const nodemailer = require('../utils/nodemailer');

const middlewares = require('../utils/middlewares');

router.get('/', (req, res) => {
    return res.status(200).json({
        status: true,
        message: 'welcome to auth api!',
        data: null
    });
});

router.post('/produk',middlewares.auth,middlewares.role('admin'), produk.store);
router.get('/produk',middlewares.auth,middlewares.role(['basic','admin']), produk.index);
router.get('/produk/:id_produk',middlewares.auth,middlewares.role(['basic','admin']), produk.show);
router.put('/produk/:id_produk',middlewares.auth,middlewares.role('admin'), produk.update);
router.delete('/produk/:id_produk',middlewares.auth,middlewares.role('admin'), produk.destroy);
router.post('/produk/connect',middlewares.auth,middlewares.role('admin'), produk.connect);

router.post('/komponen',middlewares.auth,middlewares.role('admin'), komponen.store);
router.get('/komponen',middlewares.auth,middlewares.role(['basic','admin']), komponen.index);
router.get('/komponen/:id_komponen',middlewares.auth,middlewares.role(['basic','admin']), komponen.show);
router.put('/komponen/:id_komponen',middlewares.auth,middlewares.role('admin'), komponen.update);
router.delete('/komponen/:id_komponen',middlewares.auth,middlewares.role('admin'), komponen.destroy);

router.post('/pemasok',middlewares.auth,middlewares.role('admin'), pemasok.store);
router.get('/pemasok',middlewares.auth,middlewares.role(['basic','admin']), pemasok.index);
router.get('/pemasok/:id_pemasok',middlewares.auth,middlewares.role(['basic','admin']), pemasok.show);
router.put('/pemasok/:id_pemasok',middlewares.auth,middlewares.role('admin'), pemasok.update);
router.delete('/pemasok/:id_pemasok',middlewares.auth,middlewares.role('admin'), pemasok.destroy);
router.post('/pemasok/connect',middlewares.auth,middlewares.role('admin'), pemasok.connect);

router.post('/auth/register', user.register);
router.post('/auth/login', user.login);
router.get('/auth/oauth', user.googleOauth2);
router.get('/auth/whoami', middlewares.auth,middlewares.role(['basic','admin']), user.whoami);
router.get('/reset-password', user.resetPasswordPage);
router.post('/auth/forgot-password', user.forgotPassword);
router.post('/auth/reset-password', user.resetPassword);
router.get('/verify-email', user.verifikasiPage);
router.post('/auth/verifikasi-email', user.verifikasiEmail);
router.post('/auth/verify-email', user.verifyEmail);

router.post('/storage/images', storage.image.single('media'), media.strogeSingle);
router.post('/storage/multi/images', storage.image.array('media'), media.storageArray);
router.post('/imagekit/upload', multer.single('media'), media.imagekitUpload);



router.get('/test/mailer', async (req, res) => {
    try {
        // send email
        const html = await nodemailer.getHtml('welcome.ejs', {user: {name: 'fitrah'}});
        nodemailer.sendMail('fitrah0212@gmail.com', 'Ini Judul 3', html);

        return res.status(200).json({
            status: true,
            message: 'success',
            data: null
        });
    } catch (error) {
        throw error;
    }
});


module.exports = router;