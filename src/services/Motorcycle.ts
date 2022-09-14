import { MotorcycleZodSchema, IMotorcycle } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import VehicleService from './Vehicle';

class MotorcycleService extends VehicleService<IMotorcycle> {
  constructor(_model:IModel<IMotorcycle>, _zodSchema = MotorcycleZodSchema) {
    super(_model, _zodSchema);
  }
}

export default MotorcycleService;