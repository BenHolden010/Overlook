import chai from 'chai';
const expect = chai.expect;
import { createBooking } from '../src/functions/createBooking'
import { sampleBookings } from '../src/data/sample-Bookings'
import { sampleCustomers } from '../src/data/sample-Customers'

let currentCustomer = sampleCustomers[0]

describe('createBooking', function() {
  it('should be a function', function() {
    expect(createBooking).to.be.a('function');
  });
  it('should be able to create a booking', function() {
    let updatedBooking = createBooking(currentCustomer, '2023/07/23', '1')
    expect(updatedBooking).to.deep.equal({userID: 1,date: '2023/07/23',roomNumber: '1'});
  })
  it('should be able to return error handling for no room', function () {
    let updatedBooking = createBooking(currentCustomer, '2023/07/23')
    expect(updatedBooking).to.equal('please choose a room.');
  })
  it('should be able to return error handling', function () {
    let updatedBooking = createBooking(currentCustomer)
    expect(updatedBooking).to.equal('please enter a date.');
  })
});