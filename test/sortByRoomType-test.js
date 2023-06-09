import chai from 'chai';
const expect = chai.expect;
import { sortByRoomType } from '../src/functions/sortByRoomType'
import { sampleRooms } from '../src/data/sample-Rooms'

describe('sortByRoomType', function() {
  it('should be a function', function() {
    expect(sortByRoomType).to.be.a('function');
  });
  it('should be able to display all single rooms', function() {
    let roomsAvailable = sampleRooms
    let sortedRooms = sortByRoomType('single room', roomsAvailable)
    expect(sortedRooms.length).to.equal(13);
  })
  it('should be able to show no rooms if there are no rooms available', function() {
    let roomsAvailable = []
    let sortedRooms = sortByRoomType('single room', roomsAvailable)
    expect(sortedRooms.length).to.equal(0);
  })
  it('should be able to show no rooms if rooms available is not passed', function() {
    let sortedRooms = sortByRoomType('single room')
    expect(sortedRooms.length).to.equal(0);
  })
  it('should be able to show all rooms if nothing is passed', function() {
    let sortedRooms = sortByRoomType()
    expect(sortedRooms.length).to.equal(0);
  })
});