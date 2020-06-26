$(document).ready(function () {
    fnListarPromociones();
    var imgItems = $('.slider li').length;
    var imgPos = 1;

    for (var i = 1; i <= imgItems; i++) {
        $('.paginator').append('<li><span class="fa fa-circle"></span></li>');
    }

    $('.slider li').hide();
    $('.slider li:first').show();
    $('.paginator li:first').css({
        'color': '#CD6E2E'
    });

    $('.paginator li').click(pagination);
    $('.derecha span').click(nextSlider);
    $('.izquierda span').click(prevSlider);

    setInterval(function () {
        nextSlider();
    }, 5000);

    function pagination() {

        var paginationPos = $(this).index() + 1;
        
        $('.slider li').hide();
        $('.slider li:nth-child(' + paginationPos + ')').fadeIn();
        $('.paginator li').css({ 'color': '#ccc' });
        $(this).css({
            'color': '#CD6E2E'
        });

        imgPos = paginationPos;
    }

    function nextSlider() {
        if (imgPos >= imgItems) { imgPos = 1; }
        else {
            imgPos++;
        }

        $('.paginator li').css({ 'color': '#ccc' });
        $('.paginator li:nth-child(' + imgPos + ')').css({ 'color': '#CD6E2E' });

        $('.slider li').hide();
        $('.slider li:nth-child(' + imgPos + ')').fadeIn();
    }

    function prevSlider() {
        if (imgPos <= 1) { imgPos = imgItems; }
        else {
            imgPos--;
        }

        $('.paginator li').css({ 'color': '#ccc' });
        $('.paginator li:nth-child(' + imgPos + ')').css({ 'color': '#CD6E2E' });

        $('.slider li').hide();
        $('.slider li:nth-child(' + imgPos + ')').fadeIn();
    }

});

function fnListarPromociones() {
    var perfil = $('#perfil').val();
    $.ajax({
        beforeSend: () => {
            $('#_load_action').modal('show');
        },
        type: 'POST',
        dataType: 'JSON',
        url: '_All',
        data: {
            __a: 6,
            __b: ''
        },
        success: function (r) {
            console.log(r);
            html = '';
             r.length <=3;
            $("#dv_Promociones1 .panel-body").empty();

            $.each(r, function (i, v) {

                var _titulo = '';
                //console.log(r.length);
                if (v.NOMBRE.length > 0) {
                    if (v.NOMBRE.length > 50) {
                        _titulo = v.NOMBRE.substr(0, 30) + "...";
                    } else {
                        _titulo = v.NOMBRE;
                    }
                }

                html += '<div class="col-md-3 img-thumbnail" style="width:532px; height:380px;margin-top:10px;margin-right:60px;margin-bottom:15px;font-family: Poppins, sans-serif;">';
                html += '       <div target="_blank" style="width:224.750px;"><img class="img_img_img_" style="height:190px; width:500px;" src="/Img/' + v.IMAGEN + '"></img></div>';
                html += '<p style="font-size:20px;color:black;margin-top:10px;display:inline-block;">' + _titulo + '</p>';
                html += '<p style="font-size:14px;color:black;">Bebida: ' + v.BNOMBRE + '</p>';
                html += '<p style="font-size:14px;color:black;">Papas: ' + v.PNOMBRE + '</p>';
                html += '<p style="font-size:14px;color:black;font-weight:bold;">Precio: ' + v.PRECIO + '</p>';
                html += '<input id="irPromociones" type="button" class="btn btn-info" value="Ir a Promociones"/>';
                html += '	</div>';
                html += '	</div>';
            });

            $("#dv_Promociones1 .panel-body").append(html);
        }
        ,
        complete: () => {
            $('#_load_action').modal('hide');
        },
        error: () => {
            console.log('Error');
        }
    });
}

$(document).on('click', '#irPromociones', function () {
    window.location.href = "/Principal/Promociones";
})