const supertest = require('supertest');
const app = require('../app');
const truncate = require('../utils/truncate');

// reset database user
truncate.Produk();
truncate.Komponen();
truncate.Pemasok();
truncate.Pemasok_connect();
truncate.Produk_connect();

const produk = {
    name: 'bus',
    quantity: 25
};
const komponen = {
    name: "ban motor",
    description: "bisa digunakan untuk mobil dan motor"
};
const pemasok = {
    name: "sabrina",
    addres: "bandung"
};

describe('TEST post/produk endpoint', () => {
    // positive
    test('post berhasil : "success"', async () => {
        try {

            const res = await supertest(app)
                .post('/produk')
                .send(produk);

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toHaveProperty('id');
            expect(res.body.data).toHaveProperty('name');
            expect(res.body.data).toHaveProperty('quantity');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('success');

        } catch (error) {
            expect(error).toBe('error');
        }
    });

    test('post gagal : name and quantity is required! ', async () => {
        try {
            const res = await supertest(app)
                .post('/produk')
                .send(produk);

            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe(`produk is already exist!`);

        } catch (error) {
            expect(error).toBe('error');
        }
    });
});
// register
describe('TEST getAll/produk endpoint', () => {
    // positive
    test('GetAll berhasil : "success"', async () => {
        try {

            const res = await supertest(app)
                .get('/produk/')

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toEqual(expect.arrayContaining([expect.objectContaining({id:1})]))
            expect(res.body.status).toBe(true);             
            expect(res.body.message).toBe('success');

        } catch (error) {
            expect(error).toBe('error');
        }
    });

});
describe('TEST getOne/produk endpoint', () => {
    // positive
    test('GetOne berhasil : "success"', async () => {
        try {

            const res = await supertest(app)
                .get('/produk/1')

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toHaveProperty('id');
            expect(res.body.data).toHaveProperty('name');
            expect(res.body.data).toHaveProperty('quantity');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('success');

        } catch (error) {
            expect(error).toBe('error');
        }
    });

    test('GetOne gagal : can\'t find produk with id ${id} ', async () => {
        try {
            const id = 100
            const res = await supertest(app)
                .get(`/produk/${id}`)

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe(`can\'t find produk with id ${id}`);

        } catch (error) {
            expect(error).toBe('error');
        }
    });

});

describe('TEST put/produk endpoint', () => {
    // positive
    test('Update berhasil : "success"', async () => {
        try {

            const res = await supertest(app)
                .put('/produk/1')
                .send(produk)

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toStrictEqual([
                1
            ])
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('success');

        } catch (error) {
            expect(error).toBe('error');
        }
    });

    test('Update gagal : can\'t find produk with id ${id} ', async () => {
        try {
            const id = 100
            const res = await supertest(app)
                .get(`/produk/${id}`)

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe(`can\'t find produk with id ${id}`);

        } catch (error) {
            expect(error).toBe('error');
        }
    });

});

describe('TEST post/komponen endpoint', () => {
    // positive
    test('post berhasil : "success"', async () => {
        try {

            const res = await supertest(app)
                .post('/komponen')
                .send(komponen);

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toHaveProperty('id');
            expect(res.body.data).toHaveProperty('name');
            expect(res.body.data).toHaveProperty('description');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('success');

        } catch (error) {
            expect(error).toBe('error');
        }
    });

    test('post gagal : komponen is already exist! ', async () => {
        try {
            const res = await supertest(app)
                .post('/komponen')
                .send(komponen);

            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe(`komponen is already exist!`);

        } catch (error) {
            expect(error).toBe('error');
        }
    });
});

describe('TEST getAll/komponen endpoint', () => {
    // positive
    test('GetAll berhasil : "success"', async () => {
        try {

            const res = await supertest(app)
                .get('/komponen')

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toEqual(expect.arrayContaining([expect.objectContaining({id:1})]))
            expect(res.body.status).toBe(true);             
            expect(res.body.message).toBe('success');

        } catch (error) {
            expect(error).toBe('error');
        }
    });

});
describe('TEST getOne/komponen endpoint', () => {
    // positive
    test('GetOne berhasil : "success"', async () => {
        try {

            const res = await supertest(app)
                .get('/komponen/1')

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toHaveProperty('id');
            expect(res.body.data).toHaveProperty('name');
            expect(res.body.data).toHaveProperty('description');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('success');

        } catch (error) {
            expect(error).toBe('error');
        }
    });

    test('GetOne gagal : can\'t find komponen with id ${id} ', async () => {
        try {
            const id = 100
            const res = await supertest(app)
                .get(`/komponen/${id}`)

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe(`can\'t find komponen with id ${id}`);

        } catch (error) {
            expect(error).toBe('error');
        }
    });

});

describe('TEST put/komponen endpoint', () => {
    // positive
    test('Update berhasil : "success"', async () => {
        try {

            const res = await supertest(app)
                .put('/komponen/1')
                .send(produk)

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toStrictEqual([
                1
            ])
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('success');

        } catch (error) {
            expect(error).toBe('error');
        }
    });

    test('Update gagal : can\'t find komponen with id ${id} ', async () => {
        try {
            const id = 100
            const res = await supertest(app)
                .get(`/komponen/${id}`)

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe(`can\'t find komponen with id ${id}`);

        } catch (error) {
            expect(error).toBe('error');
        }
    });

});

describe('TEST post/pemasok endpoint', () => {
    // positive
    test('post berhasil : "success"', async () => {
        try {

            const res = await supertest(app)
                .post('/pemasok')
                .send(pemasok);

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toHaveProperty('id');
            expect(res.body.data).toHaveProperty('name');
            expect(res.body.data).toHaveProperty('addres');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('success');

        } catch (error) {
            expect(error).toBe('error');
        }
    });

    test('post gagal : pemasok is already exist! ', async () => {
        try {
            const res = await supertest(app)
                .post('/pemasok')
                .send(pemasok);

            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe(`pemasok is already exist!`);

        } catch (error) {
            expect(error).toBe('error');
        }
    });
});

describe('TEST getAll/pemasok endpoint', () => {
    // positive
    test('GetAll berhasil : "success"', async () => {
        try {

            const res = await supertest(app)
                .get('/pemasok')

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toEqual(expect.arrayContaining([expect.objectContaining({id:1})]))
            expect(res.body.status).toBe(true);             
            expect(res.body.message).toBe('success');

        } catch (error) {
            expect(error).toBe('error');
        }
    });

});
describe('TEST getOne/pemasok endpoint', () => {
    // positive
    test('GetOne berhasil : "success"', async () => {
        try {

            const res = await supertest(app)
                .get('/pemasok/1')

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toHaveProperty('id');
            expect(res.body.data).toHaveProperty('name');
            expect(res.body.data).toHaveProperty('addres');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('success');

        } catch (error) {
            expect(error).toBe('error');
        }
    });

    test('GetOne gagal : can\'t find pemasok with id ${id} ', async () => {
        try {
            const id = 100
            const res = await supertest(app)
                .get(`/pemasok/${id}`)

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe(`can\'t find pemasok with id ${id}`);

        } catch (error) {
            expect(error).toBe('error');
        }
    });

});

describe('TEST put/pemasok endpoint', () => {
    // positive
    test('Update berhasil : "success"', async () => {
        try {

            const res = await supertest(app)
                .put('/pemasok/1')
                .send(produk)

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toStrictEqual([
                1
            ])
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('success');

        } catch (error) {
            expect(error).toBe('error');
        }
    });

    test('Update gagal : can\'t find pemasok with id ${id} ', async () => {
        try {
            const id = 100
            const res = await supertest(app)
                .get(`/pemasok/${id}`)

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe(`can\'t find pemasok with id ${id}`);

        } catch (error) {
            expect(error).toBe('error');
        }
    });

});


describe('TEST post/produk/connect endpoint', () => {
    // positive
    test('Connect berhasil : "success"', async () => {
        try {

            const res = await supertest(app)
                .post('/produk/connect')
                .send({
                    id_produk:1,
                    id_komponen:1
                })

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toHaveProperty('id');
            expect(res.body.data).toHaveProperty('id_komponen');
            expect(res.body.data).toHaveProperty('id_produk');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('success');

        } catch (error) {
            expect(error).toBe('error');
        }
    });

    test('connect gagal : id_komponen and id_produk must be a valid id! ', async () => {
        try {
            const id = 100
            const res = await supertest(app)
                .post(`/produk/connect`)
                .send({
                    id_produk: 1,
                    id_komponen: 2
                })

            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe(`id_komponen and id_produk must be a valid id!`);

        } catch (error) {
            expect(error).toBe('error');
        }
    });

});

describe('TEST post/pemasok/connect endpoint', () => {
    // positive
    test('Connect berhasil : "success"', async () => {
        try {

            const res = await supertest(app)
                .post('/pemasok/connect')
                .send({
                    id_pemasok:1,
                    id_komponen:1
                })

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toHaveProperty('id');
            expect(res.body.data).toHaveProperty('id_komponen');
            expect(res.body.data).toHaveProperty('id_pemasok');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('success');

        } catch (error) {
            expect(error).toBe('error');
        }
    });

    test('connect gagal : id_komponen and id_pemasok must be a valid id! ', async () => {
        try {
            const res = await supertest(app)
                .post(`/pemasok/connect`)
                .send({
                    id_pemasok: 1,
                    id_komponen: 2
                })

            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe(`id_komponen and id_pemasok must be a valid id!`);

        } catch (error) {
            expect(error).toBe('error');
        }
    });

});

describe('TEST delete/pemasok endpoint', () => {
    // positive
    test('Delete berhasil : "success"', async () => {
        try {

            const res = await supertest(app)
                .delete('/pemasok/1')

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toBe(1)
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('success');

        } catch (error) {
            expect(error).toBe('error');
        }
    });

    test('Delete gagal : can\'t find pemasok with id ${id} ', async () => {
        try {
            const id = 90000
            const res = await supertest(app)
                .delete(`/pemasok/${id}`)

            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe(`can\'t find pemasok with id ${id}`);

        } catch (error) {
            expect(error).toBe('error');
        }
    });

});

describe('TEST delete/komponen endpoint', () => {
    // positive
    test('Delete berhasil : "success"', async () => {
        try {

            const res = await supertest(app)
                .delete('/komponen/1')

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toBe(1)
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('success');

        } catch (error) {
            expect(error).toBe('error');
        }
    });

    test('Delete gagal : can\'t find komponen with id ${id} ', async () => {
        try {
            const id = 90000
            const res = await supertest(app)
                .delete(`/komponen/${id}`)

            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe(`can\'t find komponen with id ${id}`);

        } catch (error) {
            expect(error).toBe('error');
        }
    });

});

describe('TEST delete/produk endpoint', () => {
    // positive
    test('Delete berhasil : "success"', async () => {
        try {

            const res = await supertest(app)
                .delete('/produk/1')

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toBe(1)
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('success');

        } catch (error) {
            expect(error).toBe('error');
        }
    });

    test('GetOne gagal : can\'t find produk with id ${id} ', async () => {
        try {
            const id = 90000
            const res = await supertest(app)
                .delete(`/produk/${id}`)

            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe(`can\'t find produk with id ${id}`);

        } catch (error) {
            expect(error).toBe('error');
        }
    });

});