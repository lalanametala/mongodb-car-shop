import { CarZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import VehicleService from './Vehicle';

class CarService extends VehicleService<ICar> {
  constructor(_model:IModel<ICar>, _zodSchema = CarZodSchema) {
    super(_model, _zodSchema);
  }
}

export default CarService;