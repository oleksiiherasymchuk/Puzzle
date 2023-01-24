$(document).ready(function () {

    $.fn.randomize = function (selector) {
        let $elems = selector ? $(this).find(selector) : $(this).children(),
            $parents = $elems.parent();

        $parents.each(function () {
            $(this).children(selector).sort(function () {
                return Math.round(Math.random()) - 0.5;
            }).remove().appendTo(this);
        });
        return this;
    };

    let row = 4;
    let percentage = 100 / (row - 1)
    for (let i = 0; i < row * row; i++) {
        let xpos = (percentage * (i % row)) + '%';
        let ypos = (percentage * Math.floor(i / row)) + '%';
        let div = $('<div class = "piece" data-value= "' + (i) + '"></div>').css({
            'background-image': 'url(https://media.istockphoto.com/id/1216465339/ja/%E3%83%99%E3%82%AF%E3%82%BF%E3%83%BC/400x400.jpg?s=1024x1024&w=is&k=20&c=RHYYLgSeIWjgBQIGa7cMVJH2Hs8wV6QBn275mVf_bdU=)',
            'background-size': (row * 100) + '%',
            'background-position': xpos + ' ' + ypos,
            'width': 400 / row,
            'height': 400 / row,
        })
        $('.left').append(div)
    }
    $('.left').randomize()

    $('.start').click(function () {
        $(this).addClass('disabled')
        $('.check').removeClass('disabled')

        let timer2 = "01:00";
        let interval = setInterval(function () {
            let timer = timer2.split(':');
            let minutes = parseInt(timer[0], 10);
            let seconds = parseInt(timer[1], 10);
            --seconds;
            minutes = (seconds < 0) ? --minutes : minutes;
            if (minutes < 0) clearInterval(interval);
            seconds = (seconds < 0) ? 59 : seconds;
            seconds = (seconds < 10) ? '0' + seconds : seconds;
            if (minutes == 0 && seconds == 0) {
                $('.countdown').html('00' + ':' + '00');
                clearInterval(interval);
                $('.modalLose').css('display', 'flex')

            }

            $('.countdown').html(minutes + ':' + seconds);
            timer2 = minutes + ':' + seconds;

            $('.modalText').html(`You still have time, you sure? ${timer2}`)
        }, 1000);

        $('.new').click(function () {
            timer2 = '01:00'
            clearInterval(interval)
            $('.countdown').html('01:00');
            $('.start').removeClass('disabled')
            $('.check').addClass('disabled')

        })




        $('.piece').draggable({
            containment: '.game',
        });

        $('.pieceRight').droppable({
            drop: function (event, ui) {
                let draggableElement = ui.draggable
                let droppedOn = $(this);
                $(draggableElement).css({
                    top: 0,
                    left: 0,
                    position: 'relative',

                }).appendTo(droppedOn)
            }
        })

    })



    $('.new').click(function () {
        $('.start').removeClass('disabled')
        $('.check').addClass('disabled')
        $('.countdown').html('01:00');
        location.reload()
        $('.left').randomize()
    })

    $('.check').click(function () {
        $('.modalCheck').css('display', 'flex')

        $('.close').click(function () {
            $('.modalCheck').css('display', 'none')
        })

        $('.continue').click(function () {
            for (let i = 0; i < $('.piece').length; i++) {
                for (let j = 0; j < $('.right')[0].children.length; j++) {
                    if ($('.piece')[i].dataset.value == $('.right')[0].children[i].dataset.value - 1) {
                        $('.modalWin').css('display', 'flex')
                        $('.modalLose').css('display', 'none')
                    } else {
                        $('.modalLose').css('display', 'flex')
                        $('.modalWin').css('display', 'none')
                    }
                }
            }
            $('.modalCheck').css('display', 'none')
        })
    })


    $('.closeLose').click(function () {
        $('.modalLose').css('display', 'none')
    })
    $('.closeWin').click(function () {
        $('.modalWin').css('display', 'none')
    })

})