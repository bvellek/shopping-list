//completedItem and toDeleteItem functions - how do I make `this` work
//does my findItemIndex function work?
//couldnt figure out how to give my labels and inputs proper `id` & `for`




'use strict';

// State Object
var state = {
  items: [],
};


// Modify functions
function addItem(state, item) {
  state.items.push({
    name: item,
    completed: false,
    toDelete: false
  });
};

function completedItem(state, itemIndex, that) {
  console.log(state.items, itemIndex);
  if ($(that).is(':checked')) {
    state.items[itemIndex].completed = true;
  } else {
    state.items[itemIndex].completed = false;
  }
};

function toDeleteItem(state, itemIndex, that) {
  console.log(state, itemIndex, that);
  console.log($(that).is(':checked'));
  if ($(that).is(':checked')) {

    state.items[itemIndex].toDelete = true;
  } else {
    state.items[itemIndex].toDelete = false;
  }
};

function deleteItems(state) {
  for (var i=0; i < state.length; i++) {
      if (state.items[i].toDelete) {
        state.items.splice(i, 1);
      }
  }
};

function findItemIndex(state, key, value) {
  console.log(state, key, value);
  for (var i=0; i < state.items.length; i++) {
    console.log(state.items[i][key]);
    if (state.items[i][key] === value) {
      return i;
    }
  } return -1;
}


// Render functions

var renderItem = function(element, item) {
    var itemTemplate = '<li><h3 class="shopping-item"><input type="checkbox" id="" name=""><label  for="">';
    itemTemplate += item;
    itemTemplate += '</label></h3><div class="shopping-item-controls"><label for="">Delete<span class="visually-hidden">';
    itemTemplate += item;
    itemTemplate += '</span></label><input type="checkbox" id="" name=""></div></li>';
    element.append(itemTemplate);
  };


var renderList = function(state, element) {
  console.log('renderList');
  console.log(state);
  if (!state.items.length) {
    element.empty();
  }
  var htmls = '';
  for (var i=0; i < state.items.length; i++) {
    console.log(state.items[i].name);
    var nameValue = state.items[i].name;
    var completedValue = state.items[i].completed;
    var completeClass = '';
    var completeCheck = '';
    var itemMaker = function (nameValue, completedValue) {
      if (completedValue) {
        completeClass = 'shopping-item__checked';
        completeCheck = 'checked';
      } else {
        completeClass = "";
        completeCheck = "";
      };
      var itemTemplate = '<li><h3 class="shopping-item"';
      itemTemplate += completeClass;
      itemTemplate += '><input type="checkbox" id="" name=""';
      itemTemplate += completeCheck;
      itemTemplate += '><label  for=""';
      itemTemplate += '>';
      itemTemplate += nameValue;
      itemTemplate += '</label></h3><div class="shopping-item-controls"><label for="">Delete<span class="visually-hidden">';
      itemTemplate += nameValue;
      itemTemplate += '</span></label><input type="checkbox" id="" name=""></div></li>';
      return itemTemplate;
      };
    htmls += itemMaker(nameValue, completedValue);
  };
  element.html(htmls);
};


// Event Listeners

//Form Submit
$('#js-shopping-list-form').submit(function(event) {
  event.preventDefault();
  addItem(state, $('#js-shopping-list-form input').val());
  renderItem($('.shopping-list'), $('#js-shopping-list-form input').val());
  $('#js-shopping-list-form input').val('');
});


//Checkbox Completed
$('.shopping-list').on('change', 'li h3 input', function(event) {
    $(this).closest('h3').toggleClass('shopping-item__checked');
    console.log(name);
    var itemIndex = findItemIndex(state, 'name', $(this).siblings('label').text());
    completedItem(state, itemIndex, $(this));
});


//Checkbox Deleted
$('.shopping-list').on('change', 'li .shopping-item-controls input', function(event) {
    $(this).closest('li').toggleClass('delete-check');
    var itemIndex = findItemIndex(state, 'name', $(this).siblings('label').children('span').text());
    toDeleteItem(state, itemIndex, $(this));
});

//Confirm Deletes

$('.confirm-delete').click(function (event) {
  event.preventDefault();
  console.log(state.items);
  state.items = state.items.filter(function (value, index) {
    console.log(value, index);
    return !value.toDelete;
  });
  console.log(state.items);
  renderList(state, $('.shopping-list'));
});
