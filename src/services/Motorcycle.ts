import IService from '../interfaces/IService';
import { MotorcycleZodSchema, IMotorcycle } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class MotorcycleService implements IService<IMotorcycle> {
  constructor(private _motorcycle:IModel<IMotorcycle>) {}

  public async create(obj:IMotorcycle): Promise<IMotorcycle & { _id: string }> {
    const parsed = MotorcycleZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }

    const created = await this._motorcycle.create(parsed.data);

    return created as IMotorcycle & { _id: string };
  }

  public async read():Promise<IMotorcycle[]> {
    const motorcycles = await this._motorcycle.read();
    return motorcycles;
  }

  public async readOne(_id:string):Promise<IMotorcycle> {
    const motorcycle = await this._motorcycle.readOne(_id);
    if (!motorcycle) throw new Error(ErrorTypes.EntityNotFound);
    return motorcycle;
  }

  public async update(_id: string, payload: IMotorcycle): 
  Promise<IMotorcycle & { _id: string; }> {
    const parsed = MotorcycleZodSchema.safeParse(payload);
    if (!parsed.success) {
      throw parsed.error;
    }

    const updated = await this._motorcycle.update(_id, parsed.data);

    if (!updated) throw new Error(ErrorTypes.EntityNotFound);

    return updated as IMotorcycle & { _id: string };
  }

  public async delete(_id:string):Promise<IMotorcycle> {
    const motorcycle = await this._motorcycle.delete(_id);
    if (!motorcycle) throw new Error(ErrorTypes.EntityNotFound);
    return motorcycle;
  }
}

export default MotorcycleService;