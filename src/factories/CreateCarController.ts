import CarController from '../controllers/Car';
import CarModel from '../models/Car';
import CarService from '../services/Car';

export default class CreateCarController {
  static make() {
    const model = new CarModel();
    const service = new CarService(model);
    const controller = new CarController(service);

    return controller;
  }
}