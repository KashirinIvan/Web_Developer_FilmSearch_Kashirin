var token = "2R1MKR1-9EZ44ZB-PYJM41D-D39FVDX"
var dataMovieList = [];
var index = 0;
$(function () {
    dataMovieList = [{
        name: '1',
        rating: {
            kp: 4.55
        },
        poster: {
            url: "../../assets/film1.png"
        }
    },
    {
        name: '2',
        rating: {
            kp: 3.55
        },
        poster: {
            url: "../../assets/film1.png"
        }
    },
    {
        name: '3',
        rating: {
            kp: 6.55
        },
        poster: {
            url: "../../assets/film1.png"
        }
    },
    {
        name: '4',
        rating: {
            kp: 7.55
        },
        poster: {
            url: "../../assets/film1.png"
        }
    },
    {
        name: '5',
        rating: {
            kp: 1.55
        },
        poster: {
            url: "../../assets/film1.png"
        }
    },
    {
        name: '6',
        rating: {
            kp: 2.55
        },
        poster: {
            url: "../../assets/film1.png"
        }
    },
    {
        name: '7',
        rating: {
            kp: 9.55
        },
        poster: {
            url: "../../assets/film1.png"
        }
    },
    {
        name: '8',
        rating: {
            kp: 5.55
        },
        poster: {
            url: "../../assets/film1.png"
        }
    },
    {
        name: '9',
        rating: {
            kp: 9.55
        },
        poster: {
            url: "../../assets/film1.png"
        }
    },
    {
        name: '10',
        rating: {
            kp: 9.55
        },
        poster: {
            url: "../../assets/film1.png"
        }
    },]
    /*    dataMovieList = JSON.parse(localStorage.getItem("dataSearch"));
        if (dataMovieList !== null) {
            localStorage.clear();
            updateMovieList()
        } else {
            dataMovieList = [];
            for (let i = 0; i < 9; i++) {
                $.ajax({
                    url: 'https://api.kinopoisk.dev/v1.4/movie/random?notNullFields=name&notNullFields=rating.kp&notNullFields=poster.url&type=movie&rating.kp=8-10',
                    contentType: "application/json",
                    dataType: 'json',
                    beforeSend: function (jqXHR) {
                        jqXHR.setRequestHeader("Accept", "application/json");
                        jqXHR.setRequestHeader("X-Api-Key", token);
                    },
                    success: function (data) {
                        dataMovieList.push(data)
                        if (dataMovieList.length === 9) {
                        index=0;
                            updateMovieList(index)
                        }
                    }
                });
            }
            console.log(dataMovieList)
        }
    */
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
                    dataMovieList = data
                    index=0;
                    updateMovieList(index)
                }
            });
    
        });

    updateMovieList(index)

    var mediaQueryMin = window.matchMedia('(min-width: 361px)')
    function handleTabletChangeMin(e) {
        if (e.matches) {
            console.log("min-width 361")
            updateMovieList(index)
        }
    }
    mediaQueryMin.addListener(handleTabletChangeMin)
    handleTabletChangeMin(mediaQueryMin)

    var mediaQueryMax = window.matchMedia('(max-width: 360px)')
    function handleTabletChangeMax(e) {
        if (e.matches) {
            console.log("max-width 360")
            updateMovieList(index)
        }
    }
    mediaQueryMax.addListener(handleTabletChangeMax)
    handleTabletChangeMax(mediaQueryMax)

    function updateMovieList(index) {
        let movieId = 0;
        let notesOnPage = 0;
        let catalog = document.querySelector('#film-catalog');
        let pagination = document.querySelector('#main-films-count-list');
        pagination.innerHTML = ''
        var items = [];


        mediaQueryMin = window.matchMedia('(min-width: 361px)')
        if (mediaQueryMin.matches) {
            notesOnPage = 9;
            console.log("notesOnPage=" + notesOnPage)
        }
        mediaQueryMax = window.matchMedia('(max-width: 360px)')
        if (mediaQueryMax.matches) {
            notesOnPage = 1;
            console.log("notesOnPage=" + notesOnPage)
        }
        let countOfItems = Math.ceil(dataMovieList.length / notesOnPage);

        /*сортировка по рейтингу*/
        dataMovieList.sort(function (a, b) {
            if (a.rating.kp.toFixed(1) > b.rating.kp.toFixed(1)) {
                return 1
            }
            if (a.rating.kp.toFixed(1) < b.rating.kp.toFixed(1)) {
                return -1;
            }
            return 0;
        })
        dataMovieList.reverse()

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
                    divPoster.classList.add('poster')
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

        showPage(items[index])

        for (let item of items) {
            item.addEventListener('click', function () {
                showPage(this);
            });
        }
    }
    /*Создание и заполение постера информацией */
    function createPoster(note, divPoster) {
        let poster = document.getElementById('posterTemplate').content.cloneNode(true);
        poster.querySelector('.poster-image img').setAttribute('src', note.poster.url);
        poster.querySelector('.poster-title p').innerText = note.name;
        poster.querySelector('.poster-rating p').innerText = note.rating.kp.toFixed(1);
        divPoster.appendChild(poster)
    }
    /* кнопка переключениия каталога фильнов влево в мобильной версии */
    $('.button-left').on("click", function () {
        if (index > 0) {
            $('.button-right').prop('disabled', false);
            $('.button-right').addClass("activ");
            if (($('.titleThemeToggle').text() === 'Темная тема')) {
                $("<img src='/assets/right_day_activ.svg'>").replaceAll('.right img')
            }
            else {
                $("<img src='/assets/right_night_activ.svg'>").replaceAll('.right img')
            }
            index--
            updateMovieList(index)
            console.log("index=" + index)
        }
        else {
            $('.button-left').prop('disabled', true);
            $('.button-left').removeClass("activ");
            if (($('.titleThemeToggle').text() === 'Темная тема')) {
                $("<img src='/assets/left_day.svg'>").replaceAll('.left img')
            }
            else {
                $("<img src='/assets/left_night.svg'>").replaceAll('.left img')
            }
        }
    });
    /* кнопка переключениия каталога фильнов вправо в мобильной версии */
    $('.button-right').on("click", function () {
        if (index < dataMovieList.length) {
            $('.button-left').prop('disabled', false);
            $('.button-left').addClass("activ");
            if (($('.titleThemeToggle').text() === 'Темная тема')) {
                $("<img src='/assets/left_day_activ.svg'>").replaceAll('.left img')
            }
            else {
                $("<img src='/assets/left_night_activ.svg'>").replaceAll('.left img')
            }
            index++
            updateMovieList(index)
            console.log("index=" + index)
        }
        else {
            $('.button-right').prop('disabled', true);
            $('.button-right').removeClass("activ");
            if ($('.titleThemeToggle').text() === 'Темная тема') {
                $("<img src='/assets/right_day.svg'>").replaceAll('.right img')
            }
            else {
                $("<img src='/assets/right_night.svg'>").replaceAll('.right img')
            }
        }
    });
    
});

