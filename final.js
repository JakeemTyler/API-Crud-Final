/** @format */

let breweryData;
let currentSelected, currentSelectedIndex;

const process = (data) => {

  breweryData = data;

  data.forEach((brewery) => {
    let breweryInfo = $(`<option>${brewery.name}, ${brewery.city}, ${brewery.state}</option>`);

    $("#breweryList").append(breweryInfo);
  });
};

// This issues the GET request
const getBreweryData = () => {
  $.ajax({
    type: "GET",
    url: "https://api.openbrewerydb.org/breweries",
    dataType: "json",
    success: function (result, status, xhr) {
      process(result);
    },
    error: function (xhr, status, error) {
      alert(
        "Result: " +
          status +
          " " +
          error +
          " " +
          xhr.status +
          " " +
          xhr.statusText
      );
    },
  });
};

const setUp = () => {
// add the select listbox
  let breweryBox = $("<select id='breweryList' name='brewerylist' Size=25>");
  $(".lists").append(breweryBox);

  getBreweryData();

  breweryBox.on("dblclick", function () {

    let index = $("select[name='brewerylist'] option:selected").index();
    console.log(index);
    

    $("#name").text("The brewery you chose is " + breweryData[index].name + ". So CHEEERS mate!");
    $("#city").text("This brewery is located in " + breweryData[index].city + ", " + breweryData[index].state + ". Enjoy the brewery!");
    
    $(".popup").fadeIn(300); });

  $(".closeBtn").on("click", function () {
  $(".popup").fadeOut(300);
  });
  
  $(".popup")
    .on("click", function () {
      $(".popup").fadeOut(300);
    })
    .children()
    .click(function () {
      return false;
    });

  // establish the modal, register as a dialog with jQuery
  
  $(function () {
    $("#dialog").dialog();
  });


  $("#delete_brewery").on("click", function () {
    console.log("deleting");
    let index = $("select[name='brewerylist'] option:selected").index();
    console.log("index to be deleted ", index);
    $("select[name='brewerylist'] option:selected").remove();

    breweryData.splice(index, 1);
  });

  $("#update_record").on("click", function () {
    console.log("updating brewery");

    $("#update_record").show();

    currentSelected.name = $("#brewery_name").val();
    currentSelected.city = $("#brewery_city").val();
    currentSelected.address = $("#brewery_address").val();
    currentSelected.state = $("#brewery_state").val();
    console.log(currentSelected);

    $("select[name='brewerylist'] option:selected").remove();

    let updatedStr = `<option>${currentSelected.name}, ${currentSelected.state} ${currentSelected.address}</option>`;

    console.log(updatedStr);
    console.log(currentSelectedIndex);

    let posn = currentSelectedIndex - 1;

    let element = $("#breweryList option:eq(" + posn + ")");
    console.log(element);
    element.after(updatedStr); 
  });

  $("#breweryList").on("click", function () {
    currentSelectedIndex = $("select[name='brewerylist'] option:selected").index();
    currentSelected = breweryData[currentSelectedIndex];
  });

  // add record
  
  $("#add_brewery").on("click", function () {

    let newBrewery = {
      name: $("#brewery_name").val(),
      breed: $("#brewery_address").val(),
      city: $("#brewery_city").val(),
      state: $("#brewery_state").val(),
    };
    console.log(newBrewery);

    // add the object at the end of the listbox and the list
    let breweryStr = `<option>${newBrewery.name}, ${newBrewery.state} ${newBrewery.breed}</option>`;
    $("#breweryList option:last").after(breweryStr);
    breweryData.push(newBrewery);
  });
};

$(document).ready(setUp);
