import { bookingsData, roomsData, customersData, currentCustomer } from "./scripts.js"
import { roomsAvailableByDate } from "./functions/roomsAvailableByDate.js";

const headerName = document.querySelector('.header__name');
const displayBookings = document.querySelector('.main__bookingsDisplay');
const viewSorted = document.querySelector('.sortByDate__bookingsDisplay');
const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.home__searchInput');

const show = (names) => {
  names.forEach((name) => name.classList.remove('hidden'));
};

const hide = (names) => {
  names.forEach((name) => name.classList.add('hidden'));
};

function viewFilteredResults(){
  let availableRooms = roomsAvailableByDate(searchInput.value, bookingsData, roomsData)
  if(typeof availableRooms === 'string'){ return alert(availableRooms)}
  hide([displayBookings])
  show([viewSorted])
  viewSorted.innerHTML = ''
  availableRooms.forEach(room=>{
    console.log(room.number)
    viewSorted.innerHTML +=         
    `<button class="filtered__room" id="${room.number}">
    <p class='filtered__text' id="${room.number}">${room.numBeds} ${room.bedSize} bed ${room.roomType}<br>
    cost per night: $${room.costPerNight}</p>
    </button>`
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
  displayBookings.innerHTML += `Total cost of your stay is $${total}`
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
  searchButton,
  viewFilteredResults,
  displayCustomerName,
  displayCustomerBookings,
}