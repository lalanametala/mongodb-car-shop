import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import { carMock, carMockWithId } from '../../mocks/carMock';

describe('Car Service', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);

	before(() => {
		sinon.stub(carModel, 'create').resolves(carMockWithId);
		sinon.stub(carModel, 'read').resolves([carMockWithId]);
		sinon.stub(carModel, 'readOne')
			.onCall(0).resolves(carMockWithId)
			.onCall(1).resolves(null);
		
		sinon.stub(carModel, 'update')
			.onCall(0).resolves(carMockWithId)
			.onCall(1).resolves(null);
		sinon.stub(carModel, 'delete')
			.onCall(0).resolves(carMockWithId)
			.onCall(1).resolves(null);		
	});

	after(() => {
		sinon.restore()
	});
  
	describe('Create Car', () => {
		it('Success', async () => {
			const createdCar = await carService.create(carMock);

			expect(createdCar).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			try {
				await carService.create({});
			} catch (error: any) {
			  expect(error).to.be.instanceOf(ZodError);
			}

		});
	});

	describe('Read All Cars', () => {
		it('Success', async () => {
			const foundCars = await carService.read();

			expect(foundCars).to.be.deep.equal([carMockWithId]);
		});
	});

	describe('ReadOne Car', () => {
		it('Success', async () => {
			const foundCar = await carService.readOne(carMockWithId._id);

			expect(foundCar).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			try {
				await carService.readOne(carMockWithId._id);
			} catch (error:any) {
				const err = error as Error;
				expect(err.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

	describe('Update Car', () => {
		it('Success', async () => {
			const updated = await carService.update(carMockWithId._id, carMock);

			expect(updated).to.be.deep.eq(carMockWithId)
		})

		it('Failure - Not Found', async () => {
			try {
				await carService.update('any-id', carMock);
			} catch(error) {
				const err = error as Error;
				expect(err.message).to.be.eq(ErrorTypes.EntityNotFound);
			}

		})

		it('Failure - Zod Fails', async () => {
			try {
				await carService.update('any-id', {});
			} catch(error: any) {
			  expect(error).to.be.instanceOf(ZodError);
			}
		})
	})

	describe('Delete Car', () => {
		it('Success', async () => {
			const deleted = await carService.delete(carMockWithId._id);

			expect(deleted).to.be.deep.eq(carMockWithId)
		})

		it('Failure - Not Found', async () => {
			try {
				await carService.delete('any-id');
			} catch(error) {
				const err = error as Error;
				expect(err.message).to.be.eq(ErrorTypes.EntityNotFound);
			}

		})
	})
});