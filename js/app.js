const mainMapPin = document.querySelector('.map-pin');
const mainContainer = document.querySelector('main');
const mainPinsContainer = document.querySelector('.map-pins-main');
const avatarUpload = document.querySelector('.drop-zone');
const avatarInputFile = document.querySelector('.avatar');
const avatarIcon = document.querySelector('.user-pic');
const addressInput = document.querySelector('.elem-address');
const propertyType = document.querySelector('.elem-type');
const propertyPrice = document.querySelector('.elem-price');
const roomsNumbers = document.querySelector('.elem-rooms');
const guestsNumbers = document.querySelector('.elem-guests');
const propertyHeadingPost =  document.querySelector('.elem-description');
const propertyCheckIn =  document.querySelector('.elem-check-in');
const propertyCheckOut =  document.querySelector('.elem-check-out');
const propertyDescription =  document.querySelector('.feature-item-description');
const featureElements = document.querySelectorAll('.feature-label');
const featureItem = document.querySelectorAll('.feature-item');
const propertyPhotos = document.querySelector('.elem-photo');
const propertyPhotosContainer = document.querySelector('.form-photos');
const formSubmitBtn = document.querySelector('.form-submit');
const clearInputsBtn = document.querySelector('.form-reset');
const form = document.querySelector('.notice-form');

///////Filters
const filtersItem = document.querySelectorAll('.filter-item');
const filtersItemElement = document.querySelectorAll('.filter-label');
const filterPropertyType = document.querySelector('.housing-type');
const filterPropertyPrice = document.querySelector('.housing-price');
const filterPropertyRooms = document.querySelector('.housing-rooms');
const filterPropertyGuests = document.querySelector('.housing-guests');
const filterPropertyWifi = document.querySelector('.filter-wifi');
const filterPropertyDish = document.querySelector('.filter-dishwasher');
const filterPropertyParking = document.querySelector('.filter-parking');
const filterPropertyWash = document.querySelector('.filter-washer');
const filterPropertyElevator = document.querySelector('.filter-elevator');
const filterPropertyAc = document.querySelector('.filter-conditioner');

///////Features
const wifiItem = document.querySelector('.feature-wifi');
const dishItem = document.querySelector('.feature-dish');
const parkingItem = document.querySelector('.feature-parking');
const washItem = document.querySelector('.feature-wash');
const elevatorItem = document.querySelector('.feature-elevator');
const acItem = document.querySelector('.feature-ac');

let editCoordTop,
    editCoordLeft,
    id ,
    propertesInfoItems = [],
    editId,
    imagesContainer;

mainContainer.addEventListener('click', e => {
  if(e.target.classList.contains('edit')){
    if(confirm('Wolud you like to edit?')){
      form.classList.add('form-edit');
      mainContainer.classList.add('item-edit');
      let itemDraggable = e.target.parentElement.closest('.property-item');
      itemDraggable.classList.add('dragg');
      $('.property-item.dragg').draggable({ disabled: false });  
      let editBtn = document.querySelectorAll('.property-item .edit');
      let deleteBtn = document.querySelectorAll('.property-item .delete');
      editBtn.forEach(item => {
          item.style.transform = 'scale(0)'
      })
      deleteBtn.forEach(item => {
        item.style.transform = 'scale(0)'
      })
      idEdit  = +e.target.parentElement.closest('.property-item').id;
      propertesInfoItems.filter(item => {
        let itemId = item.id;
        console.log(itemId)
        if(itemId === idEdit) {
          editItem(item);
          let offsetTop = document.querySelector('.property-item.dragg').offsetTop;
          let offsetLeft = document.querySelector('.property-item.dragg').offsetLeft
          editCoordTop = offsetTop;
          editCoordLeft = offsetLeft;
          editId = item.id;
        }
      })
    }
    e.preventDefault();
  }
})
function editItem(item){
  avatarIcon.src = item.avatar;
  propertyHeadingPost.value = item.title;
  addressInput.value = item.address;
  propertyType.value = item.type;
  propertyPrice.value = item.price;
  roomsNumbers.value = item.rooms;
  guestsNumbers.value = item.guests;
  propertyCheckIn.value = item.checkin;
  propertyCheckOut.value = item.checkout;
  propertyDescription.value = item.description;
  editFeature(item.wifi, wifiItem);
  editFeature(item.dish, dishItem);
  editFeature(item.parking, parkingItem);
  editFeature(item.wash, washItem);
  editFeature(item.elevator, elevatorItem);
  editFeature(item.ac, acItem);
  if(item.images.length !==0){
    item.images.forEach(function(item){
      let div = document.createElement('div');
      let divDelete = document.createElement('div');
      div.className = 'property-photos-elem';
      divDelete.className = 'property-photos-delete';
      divDelete.innerHTML = 'Delete image'
      let img = document.createElement('img');
      img.className = 'property-photos';
      img.src = item;
      img.alt = '';
      div.appendChild(img);
      div.appendChild(divDelete)
      propertyPhotosContainer.appendChild(div);
    })
  }
  formSubmitBtn.innerHTML = 'Save Edit';
  clearInputsBtn.innerHTML = 'Cancel Edit'
  formSubmitBtn.classList.add('submit-edit')
  clearInputsBtn.classList.add('cancel-edit')
}
function editFeature(itemFeature, parent) {
  parent.checked = false;
  parent.parentElement.classList.remove('active');
  if(itemFeature === true){
    parent.parentElement.classList.add('active');
    parent.checked = true;
  }
}
    
function editUiChanges(){
  form.classList.remove('form-edit');
  mainContainer.classList.replace('item-edit', 'item-changed');
  let editBtn = document.querySelectorAll('.property-item .edit');
  let deleteBtn = document.querySelectorAll('.property-item .delete');
  
  editBtn.forEach(item => {
    item.style.transform = 'scale(1)'
  })
  deleteBtn.forEach(item => {
    item.style.transform = 'scale(1)'
  })
  $('.property-item').draggable({ disabled: true });  
  mainMapPin.style.transform = 'scale(1)';
  formSubmitBtn.innerHTML = 'Create Post';
  clearInputsBtn.innerHTML = 'Clear Inputs'
  formSubmitBtn.classList.remove('submmit-edit')
  clearInputsBtn.classList.remove('cancel-edit')
}

form.addEventListener('submit', e => {
  let avatar = avatarIcon.src;
  let title = propertyHeadingPost.value;
  let address = addressInput.value;
  let type = propertyType.value;
  let price = propertyPrice.value;
  let checkin = propertyCheckIn.value;
  let checkout = propertyCheckOut.value;
  let rooms = roomsNumbers.value;
  let guests = guestsNumbers.value;
  let description = propertyDescription.value;
  let wifi = wifiItem.checked;
  let dish = dishItem.checked;
  let parking = parkingItem.checked;
  let wash = washItem.checked;
  let elevator = elevatorItem.checked;
  let ac = acItem.checked;
  let images = [];
  let propertyImages = document.querySelectorAll('.property-photos');
  let property;
  let ui = new UI();
  if(propertyImages.length !== 0) {
      propertyImages.forEach(item => {
      images.push(item.src)
    })
  }
  if(mainContainer.classList.contains('item-edit')) {
    propertesInfoItems.filter(item => {
      if(item.id === editId){
        item.id = editId;
        item.avatar = avatar;
        item.title = title;
        item.address = address;
        item.type = type;
        item.price = price;
        item.checkin = checkin;
        item.checkout = checkout;
        item.rooms = rooms;
        item.guests = guests;
        item.description = description;
        item.wifi = wifi;
        item.dish = dish;
        item.parking = parking;
        item.wash = wash;
        item.elevator = elevator;
        item.ac = ac;
        item.images = images;
        ui.editItem();
     }
    })
  }else {
    if(propertesInfoItems.length === 0) {
      id = 0;
    }else {
      id += 1
    }
    property = new Property(id,avatar,title,address,type,price,checkin,checkout,rooms,guests,description,wifi,dish,parking,wash,elevator,ac, images);
  }
  if(title !== '' || price !== ''){
    if(!mainContainer.classList.contains('item-edit')){
      ui.addItem(property);
      propertesInfoItems.push({id: property.id, avatar: property.avatar, title: property.title, address: property.address, type: property.type, price: property.price, checkin: property.checkin, checkout: property.checkout, rooms: property.rooms, guests: property.guests, description: property.description, wifi: property.wifi, dish: property.dish, parking: property.parking, wash: property.wash, elevator: property.elevator, ac: property.ac, images: property.images});
    }
    ui.clearFilds();
    editUiChanges()
  }
  e.preventDefault();
  let itemDraggable = document.querySelectorAll('.property-item');
  itemDraggable.forEach(function(item){
    if(item.classList.contains('dragg')){
      item.classList.remove('dragg');
    }
  })
})

form.addEventListener('click', e => {
  if(e.target.classList.contains('cancel-edit')) {
    let itemDraggable = document.querySelectorAll('.property-item');
    avatarUpload.value = '';
    propertyPhotos.value = '';
    itemDraggable.forEach(function(item){
      if(item.classList.contains('dragg')) {
        item.style.top = editCoordTop + "px";
        item.style.left = editCoordLeft + "px";
      }
      if(item.classList.contains('dragg')){
        item.classList.remove('dragg');
      }
    })
    editUiChanges()
    
  }
})

mainContainer.addEventListener('click',  e => {
  if(e.target.classList.contains('delete')) {
    if(confirm('Are you sure?')){
      let id  = +e.target.parentElement.closest('.property-item').id;
      propertesInfoItems.forEach((item, index) => {
        let itemId = item.id;
        if(itemId === id) {
          propertesInfoItems.splice(index, 1);
        }
      }) 
      e.target.parentElement.closest('.property-item').remove();
    }
    e.preventDefault();
  }
})

mainContainer.addEventListener('click', e => {
  let targetParent = e.target.parentElement.closest('.property-item')
  let propertyItems = document.querySelectorAll('.property-item');
      propertyItems.forEach(item => {
        if(item !== targetParent){
          item.classList.remove('active');
        }
      });
    if(e.target.classList.contains('property-pin') || e.target.classList.contains('property-pin-avatar')){
      targetParent.classList.toggle('active');
     
    }
    if(e.target.classList.contains('property-close')) {
      e.target.parentElement.parentElement.classList.remove('active');
    }
})


clearInputsBtn.addEventListener('click', () => {
  let ui = new UI()
  ui.clearFilds();
})
mainMapPin.addEventListener('click', () => {
  mainContainer.classList.remove('init');
  $(".map-pin").draggable({ containment: ".map-pins-main", scroll: false });
})

mainContainer.addEventListener('click', e => {
    if(e.target.closest('.property-item')){
      let parent = e.target.closest('.property-item')
      if(parent.classList.contains('dragg')) {
        $(".property-item.dragg").draggable({ containment: ".map-pins-main", scroll: false });
        mainMapPin.style.transform = 'scale(0)'
      }
    }
})

propertyPhotos.addEventListener('change', function()  {
  let file = this.files,
      container = this.parentElement.closest('.form-photos'),
      div = document.createElement('div'),
      deleteImg = document.createElement('div'),
      image = document.createElement('img');
  uploadPhotos(image, container, div, deleteImg)
  fillImage(file,image);
})

mainContainer.addEventListener('mousemove', e => {
  let pinWidth = mainMapPin.offsetLeft; 
  let pinHeight = mainMapPin.offsetTop;
  if(mainContainer.classList.contains('item-edit')){
    if(e.target.closest('.property-item.dragg')){
    let editItem = e.target.closest('.property-item.dragg')
    let editWidth = editItem.offsetLeft; 
    let editHeight = editItem.offsetTop;
    addressInput.value = `x: ${editWidth} , y: ${editHeight}`
  } 
  }else {
    addressInput.value = `x: ${pinWidth} , y: ${pinHeight}`
  }
})

avatarInputFile.addEventListener('change', function() {
  let file = this.files;
  fillImage(file,avatarIcon)
})

roomsNumbers.addEventListener('change', changeGuestNumber)

function changeGuestNumber() {
  let guestsNumbersOption = document.querySelectorAll('.elem-guests option');
  let guests = document.querySelector('.elem-guests');
  guestsNumbers.value=this.value;
  if(this.value === '1') {
    select(guestsNumbersOption, '1', '2')
  }else if(this.value === '2'){
    select(guestsNumbersOption, '1', '2')
  }else if(this.value === '3'){
     select(guestsNumbersOption, '3', '')
  }
  guests.addEventListener('change', () => {
    let r = guestsNumbers.value = this.value;
  })
}

propertyPhotosContainer.addEventListener('click', e => {
  if(e.target.classList.contains('property-photos-delete')) {
    e.target.parentElement.closest('.property-photos-elem').remove();
    propertyPhotos.value = '';
  }
})

window.ondrop = function (e) {
  return false
}

featureItem.forEach(item => {
  classListToggleArray(item, '.feature-label')
})
filtersItem.forEach(item => {
  classListToggleArray(item, '.filter-label')
})
function classListToggleArray(item, container) {
  item.onclick=function(){
    this.parentElement.closest(container).classList.toggle('active');
  }
}
function select(container, value1, value2) {
  container.forEach(item => {
     item.setAttribute('disabled', 'disabled');
     if(item.value === value1){
       item.removeAttribute('disabled', 'disabled');
     }else if(item.value === value2){
        item.removeAttribute('disabled', 'disabled');
     }
 })
};

function fillImage(el, image) {
  for(let i=0; i<el.length; i++) {
    image.src = window.URL.createObjectURL(el[i]);
  }      
};

function uploadPhotos(image, container, div, deleteImg){
  image.className = "property-photos";
  div.className = 'property-photos-elem'
  image.className= 'property-photos';
  deleteImg.className= 'property-photos-delete';
  deleteImg.innerHTML = 'Delete image';
  div.appendChild(image);
  div.appendChild(deleteImg);
  container.appendChild(div);
};

function filterCheck(){
  $(".filter-checkbox").change(function(){
    let check;
    data(check);
  })
  $(".filter-select").change(function(){
    let select;
    data(select);
  })
}
function data(data, check, select){
  let filtersSelect = $.map($(".filter-select").toArray(), function(e){
    return $(e).val();
  }).join(".");
  let filtersCheckbox = $.map($(".filter-checkbox:checked").toArray(), function(e){
    return $(e).val();
  }).join(".");
  if(data === check) {
    if(filtersCheckbox.length === 0) {
      $(".map-pins-main").find("div."  + filtersSelect).show();
    }else {
      $(".map-pins-main").find("div.property-item").hide();
      $(".map-pins-main").find("div."+filtersSelect+"."+filtersCheckbox).show();
    }
  }
  if(data === select){
    if(filtersCheckbox.length !== 0){
      $(".map-pins-main").find("div.property-item").hide();
      $(".map-pins-main").find("div."+filtersSelect+"."+filtersCheckbox).show();
    }else {
      $(".map-pins-main").find("div.property-item").hide();
      $(".map-pins-main").find("div."+filtersSelect).show();
    }
  }
}
