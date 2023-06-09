

function roomsAvailableByDate(date, bookings, rooms){
  if(date.length !== 10 || date.indexOf('/') !== 4){
    return 'Oh no! please enter a valid date.'
  }
  let unavailableRooms = bookings.reduce((acc,booking) => {
    if(booking.date === date){
      acc.push(booking.roomNumber)
    }
    return acc
  },[])
  let availableRooms = rooms.filter(room=> !unavailableRooms.includes(room.number))
  if(!availableRooms.length){ return `Oh no! There are no available rooms for ${date}, please try another date.`}
return availableRooms
}

export { roomsAvailableByDate }