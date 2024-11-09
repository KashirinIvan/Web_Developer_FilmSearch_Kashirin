$(function () {
     $.ajax({
        url: 'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=6&selectFields=id&selectFields=name&selectFields=rating&selectFields=poster&notNullFields=id&notNullFields=name&notNullFields=rating.kp&notNullFields=poster.url&type=movie',
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function (jqXHR) {
            jqXHR.setRequestHeader("Accept", "application/json");
            jqXHR.setRequestHeader("X-Api-Key", token);
        },
        success: function (data) {
            dataJSON = data
            dataPoster();
        }
    });

});