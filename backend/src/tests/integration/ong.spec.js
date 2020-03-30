const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () =>{
        await connection.destroy();
    });
    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name : "CINTY ONG",
	        email : "contato@email.com.br",
		    whatsapp : "119992991",
	        city : "São Paulo",
	        uf : "SP"
        });
    });

    expected(response.body).toHavyProperty('id');
    expected(response.body.id).toHavyLenght(8);
});