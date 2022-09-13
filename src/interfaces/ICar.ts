import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const CarZodSchema = VehicleZodSchema.extend({
  doorsQty: z.number({
    required_error: 'doorsQty is required',
    invalid_type_error: 'doorsQty must be a number',
  }).int()    
    .gte(2)
    .lte(4),
  seatsQty: z.number({
    required_error: 'seatsQty is required',
    invalid_type_error: 'seatsQty must be a number',
  }).int()    
    .gte(2)
    .lte(7),
});

type ICar = z.infer<typeof CarZodSchema>;

export { CarZodSchema, ICar };