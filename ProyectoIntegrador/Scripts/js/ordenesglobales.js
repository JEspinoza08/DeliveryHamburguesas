
$(document).ready(function () {
    estado();
    usuarios();
});

function estado() {
    var estados = $('#_estado_orden_filtro_global');
    $.ajax({
        beforeSend: () => {

        },
        type: 'POST',
        dataType: 'JSON',
        url: '_All',
        data: {
            __a: 18,
            __b: ''
        },
        success: function (_s) {

            estados.empty();
            estados.append(`<option value="0">ESTADOS (TODOS)</option>`);
            array = _s;

            $.each(array, function (k, v) {

                estados.append(`<option value="${v.ID}">${v.NOMBRE}</option>`);

            });

            //console.log(idpersona);

        },
        complete: () => {

        },
        error: () => {
            console.log('Error');
        }
    });
}
function usuarios() {
    var usuarios = $('#_usuarios_filtro_global');
    $.ajax({
        beforeSend: () => {

        },
        type: 'POST',
        dataType: 'JSON',
        url: '_All',
        data: {
            __a: 17,
            __b: ''
        },
        success: function (_s) {

            usuarios.empty();
            usuarios.append(`<option value="0">USUARIOS</option>`);
            array = _s;

            $.each(array, function (k, v) {

                usuarios.append(`<option value="${v.ID}">${v.NOMBRE}</option>`);

            });

            //console.log(idpersona);

        },
        complete: () => {

        },
        error: () => {
            console.log('Error');
        }
    });
}

function fnListarOrdenes() {
    var id_usuario = $('#_usuarios_filtro_global').val();
    var estado_orden = $('#_estado_orden_filtro_global').val();
    console.log(estado_orden);

    var params = [];
    params.push(id_usuario);
    params.push(estado_orden);
    if (id_usuario == 0) {
        swal("¡Elija un usuario por favor!", {
                        icon: "warning"
        });
        return;
    }

    $.ajax({
        beforeSend: () => {
            $('#_load_action').modal('show');
        },
        type: 'POST',
        dataType: 'JSON',
        url: '_All',
        data: {
            __a: 16,
            __b: params.join('|')
        },
        success: function (r) {

            console.log(r);
            if (r.length == 0) {
                swal("¡No tiene Órdenes este usuario!", {
                    icon: "warning"
                });
            }

            html = '';

            $("#dv_OrdenesGlobales .panel-body").empty();

            $.each(r, function (i, v) {
                var _titulo = '';
                //console.log(r.length);
                if (v.NOMBREPROD.length > 0) {
                    if (v.NOMBREPROD.length > 50) {
                        _titulo = v.NOMBREPROD.substr(0, 30) + "...";
                    } else {
                        _titulo = v.NOMBREPROD;
                    }
                }
                $('#btnCompraDiv').empty();

                $('#btnCompraDiv').append('<input class="btn_realizarcompra" type="submit" name="btn_listar" value="Realizar Compra" id="btn_realizarcompramodal" onclick="fnRealizarPago()"/>');

                html += '<div class="col-md-3 img-thumbnail" style="width:532px; height:380px;margin-top:10px;margin-right:60px;margin-bottom:15px;font-family: Poppins, sans-serif;">';
                html += '       <div target="_blank" style="width:224.750px;"><img style="height:190px; width:500px;" src="http://localhost:64289/Temp/CargaImg/' + v.IMAGENPROD + '"></img></div>';

                html += `<input type="text" style="display:none;" id="precio_orden-${i}" value='${v.PRECIO}' disabled/>`;
                html += `<input type="text" style="display:none;" id="cantidad_orden-${i}" value='${v.CANTIDAD}' disabled/>`;
                html += `<input type="text" style="display:none;" id="idprodprom_orden-${i}" value='${v.ID_PRODPROM}' disabled/>`;
                html += `<input type="text" style="display:none;" id="id_orden-${i}" value='${v.ID}' disabled/>`;
                html += `<input type="text" style="display:none;" id="nombreestado_orden-${i}" value='${v.NOMBRE_ESTADO}' disabled/>`;

                html += '<p style="font-size:20px;margin-top:10px;display:inline-block;">' + _titulo + '</p>';
                html += '<p style="font-size:14px;font-weight:bold;display:none;">Token: ' + v.TOKEN + '</p>';
                html += '<p style="font-size:14px;font-weight:bold;display:none;">IDPROD: ' + v.ID_PRODPROM + '</p>';
                if (v.NOMBRE_ESTADO == 'EN PROCESO') {
                    html += '<p style="font-size:14px;font-weight:bold;color:#ccc;">' + v.NOMBRE_ESTADO + '</p>';
                }
                if (v.NOMBRE_ESTADO == 'APROBADO') {
                    html += '<p style="font-size:14px;font-weight:bold;color:green;">' + v.NOMBRE_ESTADO + '</p>';
                }
                if (v.NOMBRE_ESTADO == 'ESTA EN CAMINO') {
                    html += '<p style="font-size:14px;font-weight:bold;color:orange;">' + v.NOMBRE_ESTADO + '</p>';
                }
                if (v.NOMBRE_ESTADO == 'ENTREGADO') {
                    html += '<p style="font-size:14px;font-weight:bold;color:blue;">' + v.NOMBRE_ESTADO + '</p>';
                }
                html += '<p style="font-size:14px;font-weight:bold;">Precio: ' + v.PRECIO + ' /Cantidad: ' + v.CANTIDAD + '</p>';
                html += '<p style="font-size:14px;font-weight:bold;" id="cantidad_orden">Usuario: ' + v.NOMBRES + '</p>';
                html += '<p style="font-size:14px;font-weight:bold;display:none;">Cremas: ' + v.COMENTARIO + '</p>';
                html += '<input style="margin-left:5px;" type="button" class="btn btn-info" value="Cambiar estado"/>';
                html += '	</div>';
                html += '	</div>';

            });
            $("#dv_OrdenesGlobales .panel-body").append(html);
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