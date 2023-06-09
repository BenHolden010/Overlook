import chai from 'chai';
const expect = chai.expect;
import { roomsAvailableByDate } from '../src/functions/roomsAvailableByDate'
import { sampleBookings } from '../src/data/sample-Bookings'
import { sampleRooms } from '../src/data/sample-Rooms'

describe('roomsAvailableByDate', function() {
  it('should be a function', function() {
    expect(roomsAvailableByDate).to.be.a('function');
  });
  it('should be able to return error handling if 0 rooms are available', function() {
    let sampleRooms = []
    let roomsAvailable = roomsAvailableByDate('2022/04/22', sampleBookings, sampleRooms)
    expect(roomsAvailable).to.equal('Oh no! There are no available rooms for 2022/04/22, please try another date.');
  })
  it('should be able to return 20 rooms available', function() {
    let roomsAvailable = roomsAvailableByDate('2022/01/21', sampleBookings, sampleRooms)
    expect(roomsAvailable.length).to.equal(20);
  })
  it('should be able to return rooms all 25 available', function() {
    let roomsAvailable = roomsAvailableByDate('2023/07/23', sampleBookings, sampleRooms)
    expect(roomsAvailable.length).to.equal(25);
  })
  it('should be able to return please enter a valid Date if input is incorrect', function() {
    let roomsAvailable = roomsAvailableByDate('', sampleBookings, sampleRooms)
    expect(roomsAvailable).to.equal('Oh no! please enter a valid date.');
  })
});