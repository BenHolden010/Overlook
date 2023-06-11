

function sortByRoomType(type, roomsAvailable) {
  if(!roomsAvailable){
    roomsAvailable=[]
  }
return roomsAvailable.filter(room=> room.roomType === type)
}

export { sortByRoomType }