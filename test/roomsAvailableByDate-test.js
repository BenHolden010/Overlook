import chai from 'chai';
const expect = chai.expect;
import { roomsAvailableByDate } from '../src/functions/roomsAvailableByDate'
import { sampleBookings } from '../src/data/sample-Bookings'
import { sampleRooms } from '../src/data/sample-Rooms'
// console.log(sampleBookings)
// console.log(sampleRooms)

describe('roomsAvailableByDate', function() {
  it('should be a function', function() {
    expect(roomsAvailableByDate).to.be.a('function');
  });
  it('should be able to return rooms available by date', function() {
    let roomsAvailable = roomsAvailableByDate('2022/04/22', sampleBookings, sampleRooms)
    expect(roomsAvailable.length).to.equal(5);
  })
  it('should be able to return no rooms available', function() {
    let sampleRooms = []
    let roomsAvailable = roomsAvailableByDate('2022/04/22', sampleBookings, sampleRooms)
    expect(roomsAvailable).to.equal('Oh no! There are no available rooms for 2022/04/22, please try another date.');
  })
});