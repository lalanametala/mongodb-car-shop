import { expect } from 'chai';
import { Request, Response } from 'express';
import Sinon, * as sinon from 'sinon';
import CarController from '../../../controllers/Car';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import { carMock, carMockWithId } from '../../mocks/carMock';


describe('Car Controller', () => {
  const carModel = new CarModel()
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  const req = {} as Request; 
  const res = {} as Response;

  before(() => {
    sinon.stub(carService, 'create').resolves(carMockWithId);
    sinon.stub(carService, 'read').resolves([carMock]);
    sinon.stub(carService, 'readOne').resolves(carMock);
    sinon.stub(carService, 'update').resolves(carMockWithId);
    sinon.stub(carService, 'delete').resolves(carMockWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.sendStatus = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('Create Car', () => {
    it('Success', async () => {
      req.body = carMock;
      await carController.create(req, res);

      const statusStub = res.status as sinon.SinonStub
      const jsonStub = res.json as sinon.SinonStub

      expect(statusStub.calledWith(201)).to.be.true;
      expect(jsonStub.calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('Read All Cars', () => {
    it('Success', async () => {
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([carMock])).to.be.true;
    });
  });

  describe('ReadOne Car', () => {
    it('Success', async () => {
      req.params = { id: carMockWithId._id };
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });

  describe('Update Car', () => {
    it('Success', async () => {
      req.params = { id: carMockWithId._id };
      req.body = carMock;

      await carController.update(req, res);

      const statusStub = res.status as Sinon.SinonStub;
      const jsonStub = res.json as Sinon.SinonStub;

      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith(carMockWithId)).to.be.true;
    })
  })

  describe('Delete Car', () => {
    it('Success', async () => {
      req.params = { id: carMockWithId._id };

      await carController.delete(req, res);

      const sendStatusStub = res.sendStatus as Sinon.SinonStub;

      expect(sendStatusStub.calledWith(204)).to.be.true;
    })
  })
});
