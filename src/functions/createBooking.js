

function createBooking(customerObj, userDate, roomNumber){
  if(!userDate){return 'please enter a date.'} 
  if(!roomNumber){return 'please choose a room.'} 
    let booking = {
      userID: customerObj.id, 
      date: userDate, 
      roomNumber: roomNumber
    }
    return booking
}


export { createBooking }