const request = require('supertest');
const app = require('../../app');
const Staff = require('../../models/Staff');

jest.mock('../../src/models/Staff');

describe('Staff Controller', () => {
  it('should create a new staff member', async () => {
    Staff.prototype.save.mockResolvedValue({ id: '789', name: 'John Doe' });

    const res = await request(app)
      .post('/api/staff')
      .send({ name: 'John Doe' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', '789');
  });

  it('should get all staff members', async () => {
    Staff.find.mockResolvedValue([{ id: '789', name: 'John Doe' }]);

    const res = await request(app).get('/api/staff');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('name', 'John Doe');
  });
});
