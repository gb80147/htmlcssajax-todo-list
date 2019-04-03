function clearContainer(){

  var card = $(".card")
  card.remove();
}

function clearSearch() {

  var search = $(".search").val("");
}

function delCard() {

  var me = $(this);
  var cardId = me.siblings(".id");
  var id = cardId.text();

  $.ajax({

    url: "http://157.230.17.132:3004/todos/"+id,
    method: "DELETE",
    data: {},
    success: function(inData){

      readCard();
    },
    error: function(request, state, error) {
      console.log("request", request);
      console.log("state", state);
      console.log("error", error);
    }
  });
}

function stampToDo(){

  var search = $(".search").val();

  $.ajax({

    url: "http://157.230.17.132:3004/todos",
    method: "POST",
    data: {
      text: search
    },
    success: function(inData){

      readCard()
      clearSearch()
    },
    error: function(request, state, error) {
      console.log("request", request);
      console.log("state", state);
      console.log("error", error);
    }
  });
}

function readCard(){

  clearContainer();

  $.ajax({

    url: "http://157.230.17.132:3004/todos",
    method: "GET",
    data: {},
    success: function(inData){

      for (var i = 0; i < inData.length; i++) {

        var container = $(".container");
        var template = $("#cardTemplate").html();
        var compiled = Handlebars.compile(template);

        var data = inData[i];

        var outData = {

          id: data.id,
          text: data.text
        }

        var divCard = compiled(outData);
        container.append(divCard);
      }
    },
    error: function(request, state, error) {
      console.log("request", request);
      console.log("state", state);
      console.log("error", error);
    }
  });
}

function init(){

  readCard();

  var btn = $(".btn");
  btn.click(stampToDo);

  var deleteCard = $(".deleteCard");
  deleteCard.click(delCard);
}

$(document).ready(init);
