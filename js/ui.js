class UI {
    clearFilds = () => {
      let propertyPhotosItems = document.querySelectorAll('.property-photos-elem');
      mainMapPin.style.top = 0;
      mainMapPin.style.left = 0;
      avatarIcon.src = 'images/icon-avatar.svg';
      featureElements.forEach(function(item){
        item.classList.remove('active');
      })
      propertyPhotosItems.forEach(item => {
        item.remove();
      })
      propertyHeadingPost.value = '';
      propertyPhotos.value = '';
      propertyType.value = 'appartment';
      propertyPrice.value = '';
      propertyCheckIn.value = '12:00';
      propertyCheckOut.value = '12:00';
      roomsNumbers.value = '1';
      guestsNumbers.value = '1';
      propertyDescription.value = '';
      wifiItem.checked= false;
      dishItem.checked= false;
      parkingItem.checked= false;
      washItem.checked= false;
      elevatorItem.checked= false;
      acItem.checked= false;
    };
    editItem = () => {
      propertesInfoItems.filter(item => {
        if(item.id === editId){
          let propertyItem = document.querySelector('.property-item.dragg');
          let avatar = document.querySelector('.property-item.dragg .property-pin-avatar');
          let title = document.querySelector('.property-item.dragg .property-title span');
          let address = document.querySelector('.property-item.dragg .property-address span');
          let type = document.querySelector('.property-item.dragg .property-type span');
          let price = document.querySelector('.property-item.dragg .property-price span');
          let checkin = document.querySelector('.property-item.dragg .property-check-in span');
          let checkout = document.querySelector('.property-item.dragg .property-check-out span');
          let rooms = document.querySelector('.property-item.dragg .property-rooms span');
          let guests = document.querySelector('.property-item.dragg .property-guests span');
          let description = document.querySelector('.property-item.dragg .property-description');
          let propertyFeatures = document.querySelector('.property-item.dragg .property-features');
          let propertyPhotosContainer = document.querySelector('.property-item.dragg .property-photos-container');
          let propertyPhotos =  document.querySelectorAll('.property-item.dragg .property-photos-img');
          let featurePhotos =  document.querySelectorAll('.property-item.dragg .property-features img');
          let featureItems = document.querySelectorAll('.feature-label.active');
          propertyPhotos.forEach(item => {
            item.remove()
          })
          featurePhotos.forEach(item => {
            item.remove()
          })
          avatar.src= item.avatar;
          title.innerHTML = item.title;
          address.innerHTML = item.address;
          type.innerHTML = item.type;
          price.innerHTML = item.price;
          checkin.innerHTML = item.checkin;
          checkout.innerHTML = item.checkout;
          rooms.innerHTML = item.rooms;
          guests.innerHTML = item.guests;
          description.innerHTML = 'Description: ' + item.description;
          propertyItem.className = 'any property-item' + ' ' + item.type + ' ' + item.rooms +'room' + ' ' + item.guests +'guest';
          if(item.images.length !== 0) {
            item.images.forEach(item => {
              let img = document.createElement('img');
              img.className = 'property-photos-img';
              img.src = item;
              img.alt = '';
              propertyPhotosContainer.appendChild(img)
            })
          }
          if(featureItems.length !==0){
            featureItems.forEach(item => {
              let itemValue = item.querySelector('input').value;
              let img = document.createElement('img');
              img.src = `images/${itemValue+'.svg'}`;
              img.alt = '';
              propertyItem.className += ' ' +itemValue;
              propertyFeatures.appendChild(img);
            });
          }
          if(item.price < 1000){
            propertyItem.className += ' ' + 'low'
          }else if(item.price >= 1000 && item.price <= 3000){
            propertyItem.className += ' ' + 'middle'
          }else if(item.price > 3000){
            propertyItem.className += ' ' + 'high'
          }
        }
      })
    };
    addItem = property => {
      let container = document.querySelector('.map-pins-main');
      let div = document.createElement('div');
      div.className = 'any property-item';
      div.innerHTML = `
      <div class="property-pin">
        <img src="${property.avatar}" alt="" class="property-pin-avatar">
      </div>
      <div class="property-info">
        <div class="property-item-elem property-title">
          <span class="property-info-elem">${property.title}</span>
        </div>
      <div class="property-item-elem property-address">
          Address:  
          <span class="property-info-elem">${property.address}</span>
      </div>
      <div class="property-item-elem property-type">
          Property type:
          <span class="property-info-elem">${property.type}</span>
      </div>
      <div class="property-item-elem property-price">
          Propery price:
          <span class="property-info-elem">${property.price}$</span>
      </div>
      <div class="property-item-elem property-check-in">
          Check in:
          <span class="property-info-elem">After ${property.checkin} pm</span>
      </div>
      <div class="property-item-elem property-check-out">
          Check out:
          <span class="property-info-elem">Before ${property.checkout} pm</span>
      </div>
      <div class="property-item-elem property-rooms">
          Rooms:
          <span class="property-info-elem">${property.rooms} room(s)</span>
      </div>
      <div class="property-item-elem property-guests">
          Guests:
          <span class="property-info-elem">${property.guests} guest(s)</span>
      </div>
      <div class="property-item-elem property-description">
          Description: ${property.description}
      </div>
      <div class="property-item-elem property-features">
        Features:
      </div>
      <div class="property-item-elem property-photos-container">
        Property photos:<br>
      </div>
      <div class="property-close"></div>
      <a href="#" class="edit">Edit</a>
      <a href="#" class="delete">Delete</a>
      </div>
      `
      div.id = property.id;
      div.style.top = mainMapPin.offsetTop + 'px';
      div.style.left = (mainMapPin.offsetLeft) + 'px';
      if(property.price < 1000){
        div.className += ' ' + 'low'
      }else if(property.price >= 1000 && property.price <= 3000){
        div.className += ' ' + 'middle'
      }else if(property.price > 3000){
        div.className += ' ' + 'high'
      }
      div.className += ' ' + property.type + ' ' + property.rooms +'room' + ' ' + property.guests +'guest';
      let propertyFeatures = div.querySelector('.property-features');
      let propertyPhotos = div.querySelector('.property-photos-container');
      let featureItems = document.querySelectorAll('.feature-label.active');
      let photoItems = document.querySelectorAll('.property-photos');
      property.images.forEach(item => {
        let img = document.createElement('img');
        img.className = 'property-photos-img';
        img.src = item;
        img.alt = '';
        propertyPhotos.appendChild(img)
      })
      if(mainMapPin.offsetLeft <= 150 ){
        div.classList.add('move-right')
      }else if(mainMapPin.offsetLeft >= 900){
        div.classList.add('move-left')
      }
      featureItems.forEach(item => {
        let itemValue = item.querySelector('input').value;
        let img = document.createElement('img');
        img.src = `images/${itemValue+'.svg'}`;
        img.alt = '';
        div.className += ' ' +itemValue;
        propertyFeatures.appendChild(img);
      });
      container.appendChild(div);
      filterCheck()
    };
  };