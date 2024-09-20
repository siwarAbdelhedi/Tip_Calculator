const request = require('supertest');
const app = require('../../app');
const Tip = require('../../models/Tip');
const mongoose = require('mongoose');

jest.mock('../../models/Tip');

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Tip Controller', () => {
  it('should create a new tip', async () => {
    Tip.prototype.save.mockResolvedValue({ id: '456', amount: 50 });

    const res = await request(app)
      .post('/api/tips')
      .send({ amount: 50 });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', '456');
  });

  it('should get all tips', async () => {
    Tip.find.mockResolvedValue([{ id: '456', amount: 50 }]);

    const res = await request(app).get('/api/tips');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('amount', 50);
  });
});
