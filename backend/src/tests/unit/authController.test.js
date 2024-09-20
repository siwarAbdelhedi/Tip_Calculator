const request = require('supertest');
const app = require('../../app');
const User = require('../../models/User');
const mongoose = require('mongoose');

jest.mock('../../models/User');

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth Controller', () => {
  it('should register a new user', async () => {
    User.findOne.mockResolvedValue(null);

    User.prototype.save = jest.fn().mockResolvedValue({});

    const res = await request(app)
      .post('/api/auth/register') 
      .send({
        username: 'testuser',
        password: 'testpassword'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' });
    expect(User.prototype.save).toHaveBeenCalled();
  });

  it('should not register an existing user', async () => {
    User.findOne.mockResolvedValue({ username: 'testuser' });

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        password: 'testpassword'
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'User already exists');
    expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' });
  });
});
