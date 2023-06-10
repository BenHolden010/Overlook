import { bookingsData, roomsData, customersData, currentCustomer } from "./scripts.js"
import { roomsAvailableByDate } from "./functions/roomsAvailableByDate.js";
import { sortByRoomType } from "./functions/sortByRoomType.js";
import { createBooking } from "./functions/createBooking.js";
import { addBookingToAPI } from './apiCalls';

// querySelectors

const headerName = document.querySelector('.header__name');
const displayBookings = document.querySelector('.main__bookingsDisplay');
const viewSorted = document.querySelector('.filter-bookings-Display');
const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.home__searchInput');

// functions

const show = (names) => {
  names.forEach((name) => name.classList.remove('hidden'));
};

const hide = (names) => {
  names.forEach((name) => name.classList.add('hidden'));
};

function viewFilteredResults(event){
  let availableRooms = roomsAvailableByDate(searchInput.value, bookingsData, roomsData)
  if(typeof availableRooms === 'string'){ return alert(availableRooms)}
  // hide([displayBookings])
  // show([viewSorted])
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
headerName.innerText = "Welcome " + currentCustomer.name + "!"
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

function addBooking(event){
  let newBooking = createBooking(currentCustomer, searchInput.value, parseInt(event.target.id))
}

function totalAmount(customer, bookings, rooms){
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
  searchInput,
  viewSorted,
  searchButton,
  addBooking,
  addBookingToAPI,
  viewFilteredResults,
  displayCustomerName,
  displayCustomerBookings,
}