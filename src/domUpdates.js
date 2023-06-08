import { bookingsData, roomsData, customersData, currentCustomer } from "./scripts.js"

const headerName = document.querySelector('.header__name');
const displayBookings = document.querySelector('.main__bookingsDisplay');

function displayCustomerName(currentCustomer){
headerName.innerText = "Welcome " + currentCustomer.name + "!"
}

function displayCustomerBookings(currentCustomer, bookingsData, roomsData){
  let total = totalAmount(currentCustomer, bookingsData, roomsData)
  displayBookings.innerHTML = `Your Bookings are listed below:<br>`
  bookingsData.forEach(booking=>{
    if (currentCustomer.id === booking.userID){
      displayBookings.innerHTML += 
      `${booking.date} in room number ${booking.roomNumber}<br>`
    }
  })
  displayBookings.innerHTML += `Total cost of your stay is $${total}`
}

function totalAmount(customer, bookings, rooms){
  console.log(rooms)
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

export {
  displayCustomerName,
  displayCustomerBookings,
}