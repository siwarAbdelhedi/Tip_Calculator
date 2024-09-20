const request = require('supertest');
const app = require('../../app');
const Service = require('../../models/Service');
const mongoose = require('mongoose');

jest.mock('../../models/Service');

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Service Controller', () => {
  it('should create a new service', async () => {
    const serviceInstance = {
      _id: '123',
      name: 'Night Shift',
      save: jest.fn().mockResolvedValue(this) // Assurez-vous que `this` contient les propriétés attendues
    };
  
    // Moquer la méthode `save` pour renvoyer l'instance simulée
    Service.prototype.save = jest.fn().mockResolvedValue(serviceInstance);
  
    const res = await request(app)
      .post('/api/services')
      .send({ name: 'Night Shift' });
  
    // Debugging: Afficher le corps de la réponse pour voir ce qui est renvoyé
    console.log('Response Body:', res.body);
  
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body._id).toEqual('123'); // Vérifier que _id correspond
    expect(Service.prototype.save).toHaveBeenCalled();
  });  

  it('should get all services', async () => {
    // Moquer la méthode `find` pour renvoyer un tableau de services simulés
    Service.find = jest.fn().mockResolvedValue([{ _id: '123', name: 'Night Shift' }]);

    const res = await request(app).get('/api/services');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([{ _id: '123', name: 'Night Shift' }]);
    expect(Service.find).toHaveBeenCalled();
  });
});
