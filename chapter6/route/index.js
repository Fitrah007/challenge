const express = require('express');
const router = express.Router();
const produk = require('../controller/produk');
const komponen = require('../controller/komponen');
const pemasok = require('../controller/pemasok');

router.get('/', (req,res) => {
    res.status(200).json({
        message: `welcome to blog api`
    })
})
router.post('/produk', produk.store);
router.get('/produk', produk.index);
router.get('/produk/:id_produk', produk.show);
router.put('/produk/:id_produk', produk.update);
router.delete('/produk/:id_produk', produk.destroy);
router.post('/produk/connect', produk.connect);

router.post('/komponen', komponen.store);
router.get('/komponen', komponen.index);
router.get('/komponen/:id_komponen', komponen.show);
router.put('/komponen/:id_komponen', komponen.update);
router.delete('/komponen/:id_komponen', komponen.destroy);

router.post('/pemasok', pemasok.store);
router.get('/pemasok', pemasok.index);
router.get('/pemasok/:id_pemasok', pemasok.show);
router.put('/pemasok/:id_pemasok', pemasok.update);
router.delete('/pemasok/:id_pemasok', pemasok.destroy);
router.post('/pemasok/connect', pemasok.connect);

module.exports = router;