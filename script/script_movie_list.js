
$(function () {
    var dataMovieList = JSON.parse(localStorage.getItem("dataSearch"));
    console.log(dataMovieList)
    if (dataMovieList !== null) {
        localStorage.clear();
    } else {
        /* $.ajax({
        url: 'https://api.kinopoisk.dev/v1.4/movie/random?notNullFields=name&notNullFields=rating.kp&notNullFields=poster.url&type=movie&rating.kp=8-10',
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function (jqXHR) {
            jqXHR.setRequestHeader("Accept", "application/json");
            jqXHR.setRequestHeader("X-Api-Key", token);
        },
        success: function (data) {
            dataMovieList = data
        }
    });*/
    }
    /* dataMovieList = [
        {
            name: "1",
            rating: {
                kp: 8.6
            },
            poster: {
                url: "../../assets/film1.png"
            }
        },
        {
            name: "2",
            rating: {
                kp: 8.5
            },
            poster: {
                url: "../../assets/film1.png"
            }
        },
        {
            name: "3",
            rating: {
                kp: 8.4
            },
            poster: {
                url: "../../assets/film1.png"
            }
        },
        {
            name: "4",
            rating: {
                kp: 8.3
            },
            poster: {
                url: "../../assets/film1.png"
            }
        },
        {
            name: "5",
            rating: {
                kp: 8.6
            },
            poster: {
                url: "../../assets/film1.png"
            }
        },
        {
            name: "6",
            rating: {
                kp: 8.6
            },
            poster: {
                url: "../../assets/film1.png"
            }
        },
        {
            name: "7",
            rating: {
                kp: 8.6
            },
            poster: {
                url: "../../assets/film1.png"
            }
        },
        {
            name: "8",
            rating: {
                kp: 8.6
            },
            poster: {
                url: "../../assets/film1.png"
            }
        },
        {
            name: "9",
            rating: {
                kp: 8.6
            },
            poster: {
                url: "../../assets/film1.png"
            }
        },
        {
            name: "10",
            rating: {
                kp: 8.6
            },
            poster: {
                url: "../../assets/film1.png"
            }
        },
        {
            name: "11",
            rating: {
                kp: 8.6
            },
            poster: {
                url: "../../assets/film1.png"
            }
        },
        {
            name: "12",
            rating: {
                kp: 8.6
            },
            poster: {
                url: "../../assets/film1.png"
            }
        },
        {
            name: "13",
            rating: {
                kp: 8.6
            },
            poster: {
                url: "../../assets/film1.png"
            }
        },
    ];*/
    var token = "2R1MKR1-9EZ44ZB-PYJM41D-D39FVDX"


    let movieId=0;

    let catalog = document.querySelector('#main-film-catalog');
    let pagination = document.querySelector('#main-films-count-list');

    let notesOnPage = 9;
    let countOfItems = Math.ceil(dataMovieList.length / notesOnPage);
    let items = [];

    for (let i = 1; i <= countOfItems; i++) {
        let li = document.createElement('li');
        li.innerHTML = i;
        pagination.appendChild(li);
        items.push(li);
    }


    let showPage = (function () {
        let active;

        return function (item) {
            if (active) {
                active.classList.remove('active');
            }
            active = item;

            item.classList.add('active');

            let pageNum = +item.innerHTML;

            let start = (pageNum - 1) * notesOnPage;
            let end = start + notesOnPage;

            let notes = dataMovieList.slice(start, end);

            catalog.innerHTML = '';
            for (let note of notes) {
                let divPoster = document.createElement('div');
                divPoster.addEventListener('click', function () {
                    movieId = note.id;
                    localStorage.setItem("movie_id", movieId);
                    document.location.href = '../../movie/movie.html';
                })
                catalog.appendChild(divPoster);
                createPoster(note, divPoster)
            }
        };
    }());

    showPage(items[0])

    for (let item of items) {
        item.addEventListener('click', function () {
            showPage(this);
        });
    }

    function createPoster(note, divPoster) {
        let poster = document.getElementById('posterTemplate').content.cloneNode(true);
        poster.querySelector('.poster-image img').setAttribute('src', note.poster.url);
        poster.querySelector('.poster-title p').innerText = note.name;
        poster.querySelector('.poster-rating p').innerText = note.rating.kp.toFixed(1);
        divPoster.appendChild(poster)
    }
});

