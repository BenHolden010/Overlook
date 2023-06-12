import chai from 'chai';
const expect = chai.expect;
import { totalAmount } from '../src/functions/totalAmount'
import { sampleCustomers } from '../src/data/sample-Customers';
import { sampleBookings } from '../src/data/sample-Bookings';
import { sampleRooms } from '../src/data/sample-Rooms';

let currentCustomer = sampleCustomers[0]

describe('totalAmount', function() {
  it('should be a function', function() {
    expect(totalAmount).to.be.a('function');
  });
  it('should be able to add all room prices', function() {
    let updatedBooking = totalAmount(currentCustomer, sampleBookings, sampleRooms)
    expect(updatedBooking).to.deep.equal(172.09);
  })
  it('should be able to return if no rooms are entered', function() {
    let updatedBooking = totalAmount(currentCustomer, sampleBookings)
    expect(updatedBooking).to.deep.equal('Please enter all the rooms you would like to book.');
  })
});