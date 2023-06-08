// Upon selecting a date, I should be shown a list of room details
//  for only rooms that are available on that date

function roomsAvailableByDate(date, bookings, rooms){
let unavailableBookings = bookings.filter((booking) => booking.date === date)
let availableRooms = unavailableBookings.reduce((arr,unvBooking)=>{
rooms.forEach(room=>{
  if (unvBooking.roomNumber !== room.number){
    arr.push(room)
  }
})
  return arr
},[])
if(!availableRooms.length){
  return `Oh no! There are no available rooms for ${date}, please try another date.`
}
return availableRooms
}

export { roomsAvailableByDate }