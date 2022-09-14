import { Request, Response } from 'express';
import IService from '../interfaces/IService';

export default abstract class VehicleController<T> {
  constructor(protected _service: IService<T>) { }

  public async create(
    req: Request, 
    res: Response<T>,
  ) {
    const created = await this._service.create(req.body);
    return res.status(201).json(created);
  }

  public async read(
    _req: Request,
    res: Response<T[]>,
  ) {
    const cars = await this._service.read();
    return res.status(200).json(cars);
  }

  public async readOne(
    req: Request,
    res: Response<T>,
  ) {
    const car = await this._service.readOne(req.params.id);
    return res.status(200).json(car);
  }

  public async update(
    req: Request,
    res: Response<T>,
  ) {
    const { id } = req.params;

    const updated = await this._service.update(id, req.body);

    return res.status(200).json(updated);
  }

  public async delete(
    req: Request,
    res: Response<T>,
  ) {
    await this._service.delete(req.params.id);
    return res.sendStatus(204);
  }
}