import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import Car from '../../../models/Car';
import { Model } from 'mongoose';
import {
	carMock,
	carMockWithId,
	carMockForChange,
	carMockForChangeWithId,
} from '../../mocks/carMock';
import { ErrorTypes } from '../../../errors/catalog';

describe('Car Model', () => {
	const carModel = new Car();

	beforeEach(() => {
		sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockWithId]);
		sinon.stub(Model, 'findOne').resolves(carMockWithId);
		sinon.stub(Model, 'findOneAndUpdate').resolves(carMockForChangeWithId);
    sinon.stub(Model, 'findOneAndDelete').resolves(carMockForChangeWithId);
	});

	afterEach(() => {
		sinon.restore();
	})

	describe('creating a car', () => {
		it('successfully created', async () => {
			const newCar = await carModel.create(carMock);
			expect(newCar).to.be.deep.equal(carMockWithId);
		});
	});

  describe('searching all cars', () => {
		it('successfully found', async () => {
			const foundCars = await carModel.read();
			expect(foundCars).to.be.deep.equal([carMockWithId]);
		});
	});

	describe('searching a car', () => {
		it('successfully found', async () => {
			const foundCar = await carModel.readOne('4edd40c86762e0fb12000003');
			expect(foundCar).to.be.deep.equal(carMockWithId);
		});

    it('car not found', async () => {
      sinon.restore();
      sinon.stub(Model, 'findOne').resolves(undefined);
      const foundCar = await carModel.readOne('7add40c86762e0fb12000003');
      expect(foundCar).to.be.undefined;
		});

		it('_id not found', async () => {
			try {
				await carModel.readOne('claudio');
			} catch (error: any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});
	
	describe('changing a car', () => {
		it('successfully changed', async () => {
			const changedCar = await carModel.update('4edd40c86762e0fb12000003', carMockForChange);
			expect(changedCar).to.be.deep.equal(carMockForChangeWithId);
		});

    it('car not found', async () => {
      sinon.restore();
      sinon.stub(Model, 'findOne').resolves(null);
      const foundCar = await carModel.readOne('7add40c86762e0fb12000003');
      expect(foundCar).to.be.null;
		});
	
		it('_id not found to change', async () => {
			try {
				await carModel.update('claudio', carMockForChange);
			} catch (error:any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});

  describe('deleting a car', () => {
		it('successfully deleted', async () => {
			const deletedCar = await carModel.delete('4edd40c86762e0fb12000003');
			expect(deletedCar).to.be.deep.equal(carMockForChangeWithId);
		});
	
		it('_id not found to delete', async () => {
			try {
				await carModel.delete('claudio');
			} catch (error:any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});
	
});