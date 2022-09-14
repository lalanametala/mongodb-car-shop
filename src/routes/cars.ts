import { Router } from 'express';
import CreateCarController from '../factories/CreateCarsController';

const route = Router();

const carController = CreateCarController.make();

route.post('/cars', (req, res) => carController.create(req, res));

export default route;