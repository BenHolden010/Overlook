import { bookingsData, roomsData } from "./scripts.js"
import { roomsAvailableByDate } from "./functions/roomsAvailableByDate.js";
import { sortByRoomType } from "./functions/sortByRoomType.js";
import { addBookingToAPI } from './apiCalls';
import { totalAmount } from "./functions/totalAmount.js";

let currentCustomer = {}
// querySelectors

const headerName = document.querySelector('.header__name');
const displayBookings = document.querySelector('.main__bookingsDisplay');
const viewSorted = document.querySelector('.filter-bookings-Display');
const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.home__searchInput');
const nameInput = document.querySelector('.name-input');
const passwordInput = document.querySelector('.password-input');
const loginButton = document.querySelector('.login-button');
const loginError = document.querySelector('.login-error');
const main = document.querySelector('.main');
const loginPage = document.querySelector('.login-page');

// functions

const loginUser = (customersData) => {
  customersData.forEach(customer=>{
    if (`customer${customer.id}` === nameInput.value && passwordInput.value === 'overlook2021'){
      hide([loginPage])
      show([main])
      currentCustomer = customer
      console.log(currentCustomer)
      displayCustomerName(currentCustomer)
      displayCustomerBookings(currentCustomer, bookingsData, roomsData)
    return currentCustomer
    } else {
      loginError.innerText = 'The username or password you entered is incorrect.'
    }
  })
  return currentCustomer
}

const show = (names) => {
  names.forEach((name) => name.classList.remove('hidden'));
};

const hide = (names) => {
  names.forEach((name) => name.classList.add('hidden'));
};

function viewFilteredResults(){
  show([viewSorted])
  let availableRooms = roomsAvailableByDate(searchInput.value.split('-').join('/'), bookingsData, roomsData)
  if(typeof availableRooms === 'string'){ 
    viewSorted.innerHTML = ''
    hide([viewSorted])
    return alert(availableRooms)
  }
  viewSorted.innerHTML = ''
  roomsData.forEach(room=>{
    if (document.getElementById(room.roomType).checked){
      availableRooms = sortByRoomType(room.roomType, availableRooms)
    } 
  })
  availableRooms.forEach(room=>{
    viewSorted.innerHTML +=         
    `<section class="filtered__room" style= "background-color: rgb(210, 71, 210);
    border-radius: 1em; margin: 0.5em; width: 12em; display: flex;
    align-items: center; flex-direction: column;" >
    <p class='filtered__text'>${room.numBeds} ${room.bedSize} bed ${room.roomType}<br>
    cost per night: $${room.costPerNight}</p>
    <button class="make-booking" id="${room.number}">Book</button>
    </section>`
  })
}

function displayCustomerName(currentCustomer){
headerName.innerText = "Welcome " + currentCustomer.name + "to the Overlook Resort and Spa"
}

function displayCustomerBookings(currentCustomer, bookingsData, roomsData){
  displayBookings.innerHTML = ''
  let total = totalAmount(currentCustomer, bookingsData, roomsData)
  displayBookings.innerHTML = `Your Bookings are listed below:<br>`
  bookingsData.forEach(booking=>{ 
    if (currentCustomer.id === booking.userID){
      displayBookings.innerHTML += 
      `${booking.date} in room number ${booking.roomNumber}<br>`
    }
  })
  displayBookings.innerHTML += `Total cost of your stay is $${total.toFixed(2)}`
}

export {
  currentCustomer,
  loginButton,
  searchInput,
  viewSorted,
  searchButton,
  loginUser,
  addBookingToAPI,
  viewFilteredResults,
  displayCustomerName,
  displayCustomerBookings,
}