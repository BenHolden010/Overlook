import { bookingsData, roomsData, customersData, currentCustomer } from "./scripts.js"

const headerName = document.querySelector('.header__name');
const displayBookings = document.querySelector('.main__bookingsDisplay');

function displayCustomerName(currentCustomer){
headerName.innerText = "Welcome " + currentCustomer.name + "!"
}

function displayCustomerBookings(currentCustomer, bookingsData){
  displayBookings.innerHTML = 'Your Bookings are listed below:<br>'
  bookingsData.forEach(booking=>{
    if (currentCustomer.id === booking.userID){
      displayBookings.innerHTML += 
      `${booking.date} in room number ${booking.roomNumber}<br>`
    }
  })
}

export {
  displayCustomerName,
  displayCustomerBookings,
}