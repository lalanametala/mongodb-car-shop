import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import errorHandler from './middlewares/error';
import carsRoute from './routes/cars';
import motorcyclesRoute from './routes/motorcycles';
import doc from '../docs';

const app = express();
app.use(express.json());
app.use('/cars', carsRoute);
app.use('/motorcycles', motorcyclesRoute);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(doc));

app.use(errorHandler);

export default app;
