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
  fetchCustomers 
} from './apiCalls';

import {
  displayCustomerBookings,
  displayCustomerName
} from './domUpdates.js';

// Fetched Data

let bookingsData = [];
let roomsData = [];
let customersData = [];
let currentCustomer = {};

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
              console.log(customersData)
              currentCustomer = customersData[0]
              displayCustomerName(currentCustomer)
              displayCustomerBookings(currentCustomer, bookingsData)
              // currentCustomer = createRandomCustomer(customersData)
              // displayBookings(currentCustomer, bookingsData, savedbookings)
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

export {
bookingsData,
roomsData,
customersData,
currentCustomer
}