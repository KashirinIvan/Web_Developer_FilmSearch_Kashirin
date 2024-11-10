var id = 1312838;
var dataMovie;
var token = "2R1MKR1-9EZ44ZB-PYJM41D-D39FVDX"
$(function () {
    /*request by movieid*/
    /*poster movie https://api.kinopoisk.dev */
    $.ajax({
        url: 'https://api.kinopoisk.dev/v1.4/movie/' + id,
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function (jqXHR) {
            jqXHR.setRequestHeader("Accept", "application/json");
            jqXHR.setRequestHeader("X-Api-Key", token);
        },
        success: function (data) {
            dataMovie = data
            dataPageLoad()
        }
    });

    function dataPageLoad() {
        $('.movie-title h1').text(dataMovie.name);
        $("<img src='" + dataMovie.poster.url + "'>").replaceAll('.poster-image img');
        $('.poster-rating p').text(dataMovie.rating.kp.toFixed(1));
        var genre = '';
        for (var i = 0; i < dataMovie.genres.length; i++) {
            genre += dataMovie.genres[i].name + " ";
        }
        $('.genre-info').text(genre);
        $('.country-info').text(dataMovie.countries[0].name);
        var actor = '';
        var length = 0;
        if (dataMovie.persons.length > 3) {
            length = 5
        } else {
            length = dataMovie.persons.length
        }
        for (var i = 0; i < length; i++) {
            if (dataMovie.persons[i].profession === "актеры") {
                actor += dataMovie.persons[i].name + " ";
            }
        }
        $('.actor-info').text(actor);
        var director = '';
        for (var i = 0; i < dataMovie.persons.length; i++) {
            if (dataMovie.persons[i].profession === "режиссеры") {
                director += dataMovie.persons[i].name + " ";
            }
        }
        $('.directors-info').text(director);
        if (dataMovie.premiere.world === null) {
            $('.release-info').text('---');
        } else {
            var millisecund = Date.parse(dataMovie.premiere.world);
            var date = new Date(millisecund)
            var dateString = '';
            dateString += date.getDate() + " ";
            var month = '';
            switch (date.getMonth()) {
                case 0:
                    month = 'января '
                    break;
                case 1:
                    month = 'февраля '
                    break;
                case 2:
                    month = 'марта '
                    break;
                case 3:
                    month = 'апреля '
                    break;
                case 4:
                    month = 'мая '
                    break;
                case 5:
                    month = 'июня '
                    break;
                case 6:
                    month = 'июля '
                    break;
                case 7:
                    month = 'августа '
                    break;
                case 8:
                    month = 'сентября '
                    break;
                case 9:
                    month = 'октября '
                    break;
                case 10:
                    month = 'ноября '
                    break;
                case 11:
                    month = 'декабря '
                    break;
                default: break;
            }
            dateString += month + date.getFullYear();
            $('.release-info').text(dateString);
        }
        if (dataMovie.ageRating === null) {
            $('.age-info').text('---')
        } else {
            $('.age-info').text(dataMovie.ageRating.toString(10) + "+")
        }
        $("<iframe src="+ dataMovie.videos.trailers[0].url + "></iframe>").replaceAll('video iframe');   
    }
});