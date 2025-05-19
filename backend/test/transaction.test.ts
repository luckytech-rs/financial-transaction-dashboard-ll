import request from 'supertest';
import app from '../src/app';
import { db } from '../src/db';

let createdId: string;

describe('Transactions API', () => {
    beforeAll(() => {
        // Optional: setup or mock DB
    });

    afterAll(() => {
        // Cleanup test data
        const transactions = db.get('transactions').value();
        db.set(
            'transactions',
            transactions.filter(t => t.category !== 'Test')
        ).write();
    });

    it('GET /transactions should return 200 and an array', async () => {
        const res = await request(app).get('/transactions');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('POST /transactions should create a new transaction', async () => {
        const res = await request(app).post('/transactions').send({
            amount: 99,
            date: '2025-01-01',
            category: 'Test',
            status: 'pending'
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.category).toBe('Test');
        createdId = res.body.id;
    });

    it('PUT /transactions/:id should update the transaction', async () => {
        const res = await request(app).put(`/transactions/${createdId}`).send({
            amount: 100,
            status: 'completed'
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.amount).toBe(100);
        expect(res.body.status).toBe('completed');
    });

    it('DELETE /transactions/:id should delete the transaction', async () => {
        const res = await request(app).delete(`/transactions/${createdId}`);
        expect(res.statusCode).toBe(204);
    });

    it('GET /transactions (after delete) should not include deleted item', async () => {
        const res = await request(app).get('/transactions');
        const deleted = res.body.data.find((t: any) => t.id === createdId);
        expect(deleted).toBeUndefined();
    });
});
