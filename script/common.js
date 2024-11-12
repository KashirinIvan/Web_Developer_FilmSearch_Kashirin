$(function () {
    /*theme toggle*/
    $('.themeToggle').on('click', function () {
        if ($('.titleThemeToggle').text() === 'Темная тема') {
            $('.titleThemeToggle').text('Светлая тема')
            $('header').css("background-color", "black").css("color", "white")
            $('body').css("background-color", "black").css("color", "white")
            $("<img src='/assets/topic_night.svg'>").replaceAll('.themeToggle img')
            if ($('button.button-left').attr('class').includes('activ')) {
                $("<img src='/assets/left_night_activ.svg'>").replaceAll('.left img')
            }
            else {
                $("<img src='/assets/left_night.svg'>").replaceAll('.left img')
            }
            if (($('button.button-right').attr('class').includes('activ'))) {
                $("<img src='/assets/right_night_activ.svg'>").replaceAll('.right img')
            }
            else {
                $("<img src='/assets/right_night.svg'>").replaceAll('.right img')
            }
            $('.button-right').css("background-color", "black")
            $('.button-left').css("background-color", "black")
            $('#menu-container').css("background-color", "black").css("color","white")
            $('.themeToggle').css("background-color", "black")
            $('input#menu-hamburger~label').css("background-color", "black").css("color","white")
        }
        else {
            $('.titleThemeToggle').text('Темная тема')
            $('header').css("background-color", "white").css("color", "black")
            $('body').css("background-color", "white").css("color", "black")
            $("<img src='/assets/topic_day.svg'>").replaceAll('.themeToggle img')
            if (($('button.button-left').attr('class').includes('activ'))) {
                $("<img src='/assets/left_day_activ.svg'>").replaceAll('.left img')
            }
            else {
                $("<img src='/assets/left_day.svg'>").replaceAll('.left img')
            }
            if (($('button.button-right').attr('class').includes('activ'))) {
                $("<img src='/assets/right_day_activ.svg'>").replaceAll('.right img')
            }
            else {
                $("<img src='/assets/right_day.svg'>").replaceAll('.right img')
            }
            $('.button-right').css("background-color", "white")
            $('.button-left').css("background-color", "white")
            $('#menu-container').css("background-color", "white").css("color","black")
            $('.themeToggle').css("background-color", "white")
            $('input#menu-hamburger~label').css("background-color", "white").css("color","black")
        }
    });
    /*button search hover*/
    $('.search-form-buttom').hover(
        function () {
            $(this).css("background-color", "#504C4C")
        },
        function () {
            $(this).css("background-color", "#020202")
        }
    );

    /*social telegram hover*/
    $('.social-telegram').hover(
        function () {
            $("<img src='/assets/tg_hover.svg'>").replaceAll('.social-telegram img')
        },
        function () {
            $("<img src='/assets/tg.svg'>").replaceAll('.social-telegram img')
        }
    );
    /*social dzen hover*/
    $('.social-dzen').hover(
        function () {
            $("<img src='/assets/dzen_hover.svg'>").replaceAll('.social-dzen img')
        },
        function () {
            $("<img src='/assets/dzen.svg'>").replaceAll('.social-dzen img')
        }
    );
    /*social youtube hover*/
    $('.social-youtube').hover(
        function () {
            $("<img src='/assets/youtube_hover.svg'>").replaceAll('.social-youtube img')
        },
        function () {
            $("<img src='/assets/youtube.svg'>").replaceAll('.social-youtube img')
        }
    );
    /*social vk hover*/
    $('.social-vk').hover(
        function () {
            $("<img src='/assets/vk_hover.svg'>").replaceAll('.social-vk img')
        },
        function () {
            $("<img src='/assets/vk.svg'>").replaceAll('.social-vk img')
        }
    );
});