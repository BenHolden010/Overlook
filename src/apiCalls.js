// FETCH REQUESTS //

import { currentCustomer, displayCustomerBookings, viewFilteredResults } from "./domUpdates";
import { bookingsData, roomsData } from "./scripts";

const fetchBookings = fetch(`http://localhost:3001/api/v1/bookings`);
const fetchRooms = fetch(`http://localhost:3001/api/v1/rooms`);
const fetchCustomers = fetch(`http://localhost:3001/api/v1/customers`);
const addBookingToAPI = ( userID, date, roomNumber) => {
  fetch(`http://localhost:3001/api/v1/bookings`, {
    method: 'POST',
    body: JSON.stringify({ "userID": userID, "date": date, "roomNumber": roomNumber }),
    headers: {
      'Content-type': 'application/json'
  }
})
  .then(response => {
    if(response.ok) {
      return response.json()
    } else {
      alert(`${response.status} server request failed, please try again later`)
      console.error('Request failed with status:', response.status)
    }
  })
  
  .then(data => {
    bookingsData.push(data.newBooking)
    displayCustomerBookings(currentCustomer, bookingsData, roomsData)
    viewFilteredResults()
  })
  .catch(err => console.log(err))
};

export { fetchBookings, fetchRooms, fetchCustomers, addBookingToAPI }; 
