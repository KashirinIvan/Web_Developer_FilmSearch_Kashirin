/*Global parameters */
let indexPoster = 0;
let dataJSON;
var token = "2R1MKR1-9EZ44ZB-PYJM41D-D39FVDX"
var movieId;
$(function () {
    /*poster movie https://api.kinopoisk.dev */
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
    /*заполнение данными постеров */
    function dataPoster() {
        $('.poster-title-first').text(dataJSON.docs[indexPoster].name)
        $('.poster-title-second').text(dataJSON.docs[indexPoster + 1].name)
        $('.poster-title-third').text(dataJSON.docs[indexPoster + 2].name)
        $('.poster-rating-first').text(dataJSON.docs[indexPoster].rating.kp.toFixed(1))
        $('.poster-rating-second').text(dataJSON.docs[indexPoster + 1].rating.kp.toFixed(1))
        $('.poster-rating-third').text(dataJSON.docs[indexPoster + 2].rating.kp.toFixed(1))

        $("<img src='" + dataJSON.docs[indexPoster].poster.url + "'>").replaceAll('.poster-image-first img')
        $("<img src='" + dataJSON.docs[indexPoster + 1].poster.url + "'>").replaceAll('.poster-image-second img')
        $("<img src='" + dataJSON.docs[indexPoster + 2].poster.url + "'>").replaceAll('.poster-image-third img')
        movieId = dataJSON.docs[indexPoster].id;
    }
    /*movieID -> movie.js*/
    $('.poster-link-movie').on("click", function () {

    });
    /*button poster right*/
    $('.button-right').on("click", function () {
        if (indexPoster === 3) {
            $('.button-right').prop('disabled', true);
            $('.button-right').removeClass("activ");
            if ($('.titleThemeToggle').text() === 'Темная тема') {
                $("<img src='/assets/right_day.svg'>").replaceAll('.right img')
            }
            else {
                $("<img src='/assets/right_night.svg'>").replaceAll('.right img')
            }
        }
        else {
            $('.button-left').prop('disabled', false);
            $('.button-left').addClass("activ");
            if (($('.titleThemeToggle').text() === 'Темная тема')) {
                $("<img src='/assets/left_day_activ.svg'>").replaceAll('.left img')
            }
            else {
                $("<img src='/assets/left_night_activ.svg'>").replaceAll('.left img')
            }
            indexPoster = indexPoster + 1;
            dataPoster();
        }
    });
    /*button poster left*/
    $('.button-left').on("click", function () {
        if (indexPoster === 0) {
            $('.button-left').prop('disabled', true);
            $('.button-left').removeClass("activ");
            if (($('.titleThemeToggle').text() === 'Темная тема')) {
                $("<img src='/assets/left_day.svg'>").replaceAll('.left img')
            }
            else {
                $("<img src='/assets/left_night.svg'>").replaceAll('.left img')
            }
        }
        else {
            $('.button-right').prop('disabled', false);
            $('.button-right').addClass("activ");
            if (($('.titleThemeToggle').text() === 'Темная тема')) {
                $("<img src='/assets/right_day_activ.svg'>").replaceAll('.right img')
            }
            else {
                $("<img src='/assets/right_night_activ.svg'>").replaceAll('.right img')
            }
            indexPoster = indexPoster - 1;
            dataPoster()
        }
    });

    /*button search movie title https://api.kinopoisk.dev  */
    $('.search-form-buttom').on("click", function () {
        $.ajax({
            url: 'https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=45&',
            contentType: "application/json",
            dataType: 'json',
            data: $('input').serialize(),
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
});
