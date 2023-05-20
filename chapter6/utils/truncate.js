const {produk,komponen,pemasok,produk_komponen,komponen_pemasok} = require('../models');

module.exports = {
    Produk: async () => {
        await produk.destroy({truncate: true, restartIdentity: true});
    },
    Komponen: async () => {
        await komponen.destroy({truncate: true, restartIdentity: true});
    },
    Pemasok: async () => {
        await pemasok.destroy({truncate: true, restartIdentity: true});
    },
    Pemasok_connect: async () => {
        await komponen_pemasok.destroy({truncate: true, restartIdentity: true});
    },
    Produk_connect: async () => {
        await produk_komponen.destroy({truncate: true, restartIdentity: true});
    }
};