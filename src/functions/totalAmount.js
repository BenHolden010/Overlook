

function totalAmount(customer, bookings, rooms){
  if (!rooms){
    return 'Please enter all the rooms you would like to book.'
  }
  let total = bookings.filter(booking=> customer.id === booking.userID).reduce((acc, booking)=>{
    rooms.forEach(room=>{
      if (booking.roomNumber===room.number){
        acc+=room.costPerNight
      }
    })
      return acc
    },0)
  return total
}


export { totalAmount }