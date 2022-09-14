import { ZodSchema } from 'zod';
import IService from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';
import { IMotorcycle } from '../interfaces/IMotorcycle';

abstract class VehicleService <T extends ICar | IMotorcycle> implements IService<T> {
  constructor(protected _model:IModel<T>, protected _zodSchema: ZodSchema<T>) {}

  public async create(obj:T): Promise<T & { _id: string }> {
    const parsed = this._zodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }

    const created = await this._model.create(parsed.data);

    return created as T & { _id: string };
  }

  public async read():Promise<T[]> {
    const cars = await this._model.read();
    return cars;
  }

  public async readOne(_id:string):Promise<T> {
    const car = await this._model.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async update(_id: string, payload: T): 
  Promise<T & { _id: string; }> {
    const parsed = this._zodSchema.safeParse(payload);
    if (!parsed.success) {
      throw parsed.error;
    }

    const updated = await this._model.update(_id, parsed.data);

    if (!updated) throw new Error(ErrorTypes.EntityNotFound);

    return updated as T & { _id: string };
  }

  public async delete(_id:string):Promise<T> {
    const car = await this._model.delete(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }
}

export default VehicleService;