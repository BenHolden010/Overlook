// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

import { 
  fetchBookings, 
  fetchRooms, 
  fetchCustomers,
  addBookingToAPI,
} from './apiCalls';

import {
  currentCustomer,
  loginButton,
  loginUser,
  viewSorted,
  searchButton,
  viewFilteredResults,
  displayCustomerBookings,
  displayCustomerName,
  searchInput,
} from './domUpdates.js';

// Fetched Data

let bookingsData = [];
let roomsData = [];
let customersData = [];
// let currentCustomer = {};

window.addEventListener('load', () => {
  Promise.all([fetchBookings, fetchRooms, fetchCustomers])
  .then(responses => {
    responses.forEach(response => {
      if (response.ok) {
        response.json()
          .then(data => {
            if (response.url.includes('/bookings')) {
              bookingsData = data.bookings;
            } else if (response.url.includes('/rooms')) {
              roomsData = data.rooms;
            } else if (response.url.includes('/customers')) {
              customersData = data.customers;
              // currentCustomer = customersData[1]
              // currentCustomer = authenticateCustomer(event)
              // console.log(customersData)
              // displayCustomerName(currentCustomer)
              // displayCustomerBookings(currentCustomer, bookingsData, roomsData)
            }
          })
          .catch(error => {
            console.error('Error parsing response:', error);
          });
      } else {
        alert(`${response.status} server request failed, try again later`)
        console.error('Request failed with status:', response.status);
      }
    });
  });
});

searchButton.addEventListener('click', event => {
  viewFilteredResults(event)})

loginButton.addEventListener('click', () => {
  loginUser(customersData)})

viewSorted.addEventListener('click', event => {
  let date = searchInput.value
  let roomNumber = Number(event.target.id)
  if(event.target.className === 'make-booking'){
   addBookingToAPI(currentCustomer.id,date,roomNumber, event)
    }})



export {
addBookingToAPI,
bookingsData,
roomsData,
customersData,
// currentCustomer
}