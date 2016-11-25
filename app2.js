//When you add do a confirm deletes and then add a new item you cannot chekc or delete the new items


'use strict';

// State Object
var state = {
  items: [],
  indexNum: 0
};


// Modify functions
function addItem(state, item, indexVal) {
  state.items.push({
    index: indexVal,
    name: item,
    completed: false,
    toDelete: false
  });
}

function completedItem(state, checkIndex, that) {
  if ($(that).is(':checked')) {

    state.items[checkIndex].completed = true;
    $(that).closest('h3').addClass('shopping-item__checked');
  } else {
    state.items[checkIndex].completed = false;
    $(that).closest('h3').removeClass('shopping-item__checked');
  }
}

function toDeleteItem(state, deleteIndex, that) {
  if ($(that).is(':checked')) {
    state.items[deleteIndex].toDelete = true;
    $(that).closest('li').addClass('delete-check');
  } else {
    state.items[deleteIndex].toDelete = false;
    $(that).closest('li').removeClass('delete-check');
  }
}


// Render functions

var itemTemplate = $(

'<li class="list-item">' +
  '<h3 class="shopping-item">' +
    '<input type="checkbox" id="" name="">' +
    '<label for=""></label>' +
  '</h3>' +

  '<div class="shopping-item-controls">' +
    '<label for="">Delete<span class="visually-hidden"></span></label>' +
    '<input type="checkbox" id="" name="">' +
  '</div>' +
'</li>'
);


function createItem(item) {
  var newItem = $(itemTemplate).clone();
  var itemIndex = item.index;
  var itemName = item.name;
  var itemCheck = item.completed

  if (itemCheck) {
    newItem.find('.shopping-item').addClass('shopping-item__checked');
    newItem.find('h3 input').attr("checked", true);
  };
  newItem.find('h3 label').attr('for', itemIndex);
  newItem.find('h3 input').attr('name', itemName + itemIndex);
  newItem.find('h3 input').attr('id', itemIndex);
  newItem.find('h3 label').text(itemName);
  newItem.find('.shopping-item-controls label').attr('for', ('delete' + itemIndex));
  newItem.find('.shopping-item-controls input').attr('id', ('delete' + itemIndex));
  newItem.find('.shopping-item-controls input').attr('name', ('delete' + itemName));
  newItem.find('.shopping-item-controls span').text(itemName);
  if (item.complete) {
    newItem.find($('h3').addClass('shopping-item__checked'));
    newItem.find($('h3 input').prop('checked'));
  };
  return newItem[0].outerHTML;
}


function displayItems(state) {

  var htmls = '';
  state.items.forEach(function(item){
    htmls += createItem(item);
  });

  $('.shopping-list').html(htmls);
  }



// Event Listeners

$(document).ready(function() {

  //Form Submit
  $('#js-shopping-list-form').submit(function(e) {
    e.preventDefault();
    state.indexNum ++;
    addItem(state, $('#js-shopping-list-form input').val(), state.indexNum);
    displayItems(state);
    $('#js-shopping-list-form input').val('');
  });


  //Checkbox Completed
  $('.shopping-list').on('change', 'li h3 input', function(e) {
    var checkIndex = $(this).attr('id');
    var indexAns = state.items.findIndex(function(x) {
      return x.index == checkIndex;
      });
      completedItem(state, indexAns, $(this));
  });


  //Checkbox Deleted
  $('.shopping-list').on('change', 'li .shopping-item-controls input', function(e) {
    var deleteIndex = $(this).closest('div').siblings('h3').children('input').attr('id');
    var indexAns = state.items.findIndex(function(x) {
      return x.index == deleteIndex;
      });
    toDeleteItem(state, indexAns, $(this));
  });

  //Confirm Deletes

  $('.confirm-delete').click(function (e) {
    e.preventDefault();
    console.log(state.items);
    state.items = state.items.filter(function (value, index) {
      console.log(value, index);
      return !value.toDelete;
    });
    console.log(state.items);
    displayItems(state);
  });


});
