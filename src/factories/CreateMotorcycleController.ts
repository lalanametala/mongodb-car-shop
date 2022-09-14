import MotorcycleController from '../controllers/Motorcycle';
import MotorcycleModel from '../models/Motorcycle';
import MotorcycleService from '../services/Motorcycle';

export default class CreateMotorcycleController {
  static make() {
    const model = new MotorcycleModel();
    const service = new MotorcycleService(model);
    const controller = new MotorcycleController(service);

    return controller;
  }
}