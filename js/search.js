var ma_date;
var fav_list = [];

function retFavs(){
    $.ajax({
        url: "resort.json",
        dataType: "json",
        type: "get",
        success: function (data) {
            ma_date = data.resorts;
            var tmp = JSON.parse(localStorage.getItem("favs"));
            if (tmp != null) {
                fav_list = tmp;
            }
            $(fav_list).each(function (key, value) {
                addStart(value);
            });
        }
    });
}

$(document).ready(function(){
    retFavs();
});

function addFav(id) {
    console.log(id);
    if (fav_list.indexOf(id) != -1) {
        return;
    }
    fav_list.push(id);
    localStorage.setItem("favs", JSON.stringify(fav_list));

    var res = $.grep(ma_date, function (o) {
        return o.id === id;
    });
    res = res[0];
    console.log(34);
    $("#favourites").append("<div class=" + "special-grid" + "> <div class=" + "ui-widget-content" + "><img src='" + res.picture + "'<a href=" + res.url + ">" + res.name + "</a><button id="+"nbutton"+" onClick=\"remFav('" + res.id + "')\">" + "Remove" + "</button> </div> </div>");
}

function remFav(id) {
    fav_list.pop(id);
    localStorage.setItem("favs", JSON.stringify(fav_list));
    
    $("#favourites").html("");
    retFavs();
}

function addStart(id){
    var res = $.grep(ma_date, function (o) {
        return o.id === id;
    });
    res = res[0];
    console.log(34);
    $("#favourites").append("<div class=" + "special-grid" + "> <div class=" + "ui-widget-content" + "><img src='" + res.picture + "'<a href=" + res.url + ">" + res.name + "</a><br><button id="+"nbutton"+" onClick=\"remFav('" + res.id + "')\">" + "Remove" + "</button> </div> </div>");
}


$("#search").on("click", function () {
    var date = "";
    $("#datepicker").datepicker({
        onSelect: function (dateText, inst) {
            date = dateText;
        }
    });
    
    $.ajax({
        url: "resort.json",
        dataType: "json",
        type: "get",
        success: function (data) {
            ma_date = data.resorts;
            $(".searchResults").empty();
            var destination = $("#destination").val();
            var Ndate = new Date(date);
            var comfortLevel = $("comfortLevel").val();
            var activities = $("#activities").val();
            var price = $("#price").val();

            $(data.resorts).each(function (key, value) {
                var JsonDestination = value.destination;
                var JsonName = value.name;
                var JsonLocation = value.location;
                var JsonComfort = value.comfortLevel;
                var JsonActivities = value.activities;
                var JsonPrice = value.price;
                var JsonStatD = value.startDate;
                var JsonEndD = value.endDate;
                var JsonSDes = value.short_description;
                var JsonPic = value.picture;
                var JsonLDes = value.long_description;
                var JsonUrl = value.url;


                if ((destination === JsonDestination) && (comfortLevel === JsonComfort) && (date > JsonStatD && date < JsonEndD) && (activities === JsonActivities) && (price === JsonPrice)) {
                    $(".searchResults").append("<div class=" + "special-grid" + "> <div class=" + "ui-widget-content" + "><img src=" + JsonPic + "><a href=" + JsonUrl + ">" + JsonName + "</a><p>"+"PRICE - "+JsonPrice+"/="+"</p> <p>" + JsonSDes + "</p><div class=" + "ui-widget" + "><button id="+"nbutton"+" onClick=\"addFav('" + value.id + "')\" >" + "ADD" + "</button></div> </div>");
    
                }
                if ((destination === JsonDestination) || (comfortLevel === JsonComfort) || (date == null) || (activities === JsonActivities) || (price === JsonPrice)) {
                    $(".searchResults").append("<div class=" + "special-grid" + "> <div class=" + "ui-widget-content" + "><img src=" + JsonPic + "><a href=" + JsonUrl + ">" + JsonName + "</a><p>"+"PRICE - "+JsonPrice+"/="+"</p> <p>" + JsonSDes + "</p><button id="+"nbutton"+" onClick=\"addFav('" + value.id + "')\">" + "ADD" + "</button> </div>");

   
                }
                if ((destination === "") && (comfortLevel === "") && (date > JsonStatD && date < JsonEndD) && (activities === "") && (price === "")) {
                    $(".searchResults").append("<div class=" + "special-grid" + "> <div class=" + "ui-widget-content" + "><img src=" + JsonPic + "><a href=" + JsonUrl + ">" + JsonName + "</a><p>"+"PRICE - "+JsonPrice+"/="+"</p><p>" + JsonSDes + "</p><button id="+"nbutton"+" onClick=\"addFav('" + value.id + "')\">" + "ADD" + "</button> </div>");

                         
                }
            });
        }
    });
});