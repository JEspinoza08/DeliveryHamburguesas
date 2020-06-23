$(document).ready(function () {
    estados();
    estados_change();
    fnListarOrdenes();
});
function estados() {
    var estados = $('#_estado_orden_filtro');
    $.ajax({
        beforeSend: () => {

        },
        type: 'POST',
        dataType: 'JSON',
        url: '_All',
        data: {
            __a: 9,
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
function estados_change() {
    var estados = $('#_estado_orden_change');
    $.ajax({
        beforeSend: () => {

        },
        type: 'POST',
        dataType: 'JSON',
        url: '_All',
        data: {
            __a: 12,
            __b: ''
        },
        success: function (_s) {

            estados.empty();
            estados.append(`<option value="0">ESTADOS</option>`);
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
function fnListarOrdenes() {
    var id_usuario = $('#id_usuario').val();
    var estado_orden = $('#_estado_orden_filtro').val();
    var id_perfil = $('#id_perfil').val();
    console.log(estado_orden);

    var params = [];
    params.push(id_usuario);
    params.push(estado_orden);
    $.ajax({
        beforeSend: () => {
            $('#_load_action').modal('show');
        },
        type: 'POST',
        dataType: 'JSON',
        url: '_All',
        data: {
            __a: 8,
            __b: params.join('|')
        },
        success: function (r) {

            console.log(r);
            if (r.length == 0) {
                if (estado_orden == 1)
                    swal("¡No hay Órdenes en Proceso!", {
                        icon: "warning"
                    });
                else if (estado_orden == 2)
                    swal("¡No hay Órdenes Aprobadas!", {
                        icon: "warning"
                    });
                else if (estado_orden == 3)
                    swal("¡No hay Órdenes en Camino!", {
                        icon: "warning"
                    });
                else if (estado_orden == 4)
                    swal("¡No hay Órdenes Entregadas!", {
                        icon: "warning"
                    });
                else if (estado_orden == 5)
                    swal("¡No hay Órdenes Canceladas!", {
                        icon: "warning"
                    });
                else {
                    swal("¡No hay Órdenes!", {
                        icon: "warning"
                    });
                }
            }

            html = '';

            $("#dv_Ordenes .panel-body").empty();

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
                if (v.NOMBRE_ESTADO == 'CANCELADO') {
                    html += '<p style="font-size:14px;font-weight:bold;color:red;">' + v.NOMBRE_ESTADO + '</p>';
                }
                html += '<p style="font-size:14px;font-weight:bold;">Precio: ' + v.PRECIO + '</p>';
                html += '<p style="font-size:14px;font-weight:bold;" id="cantidad_orden">Cantidad: ' + v.CANTIDAD + '</p>';
                html += '<p style="font-size:14px;font-weight:bold;display:none;">Cremas: ' + v.COMENTARIO + '</p>';
                if (v.NOMBRE_ESTADO == 'EN PROCESO' || v.NOMBRE_ESTADO == 'APROBADO' || v.NOMBRE_ESTADO == 'ESTA EN CAMINO' || v.NOMBRE_ESTADO == 'ENTREGADO')
                html += '<input type="button" class="btn btn-warning" value="Ver detalle" id="btnAbrirDetallePedido" onclick="jalarDetalle(' + v.ID + ',' + `'${v.TOKEN}'` + ',' + v.ID_PRODPROM + ',' + `'${v.NOMBREPROD}'` + ',' + `'${v.FECHAORDEN}'` + ',' + v.PRECIO + ',' + `'${v.COMENTARIO}'` + ');" />';
                if (v.NOMBRE_ESTADO == 'EN PROCESO') {
                    html += '<input type="button" class="btn btn-danger" value="Cancelar Pedido" id="btnAbrirEliminarPedido" onclick="jalarEliminarPedido(' + v.ID + ',' + v.CANTIDAD + ',' + v.ID_PRODPROM + ')"/>';
                }
                if (v.NOMBRE_ESTADO == 'ESTA EN CAMINO') {
                    html += '<input type="button" class="btn btn-info" value="Dar Seguimiento"/>';
                }
                if (id_perfil == 2) {
                    html += '<input style="margin-left:5px;" type="button" class="btn btn-info" value="Cambiar estado" id="btnAbrirModalCambiarEstado" onclick="jalarCambiarEstado(' + v.ID + ',' + `'${v.NOMBRE_ESTADO}'` + ')"/>';
                }
                if (v.NOMBRE_ESTADO == 'CANCELADO' || v.NOMBRE_ESTADO == 'ENTREGADO') {
                    html += '<input style="margin-left:5px;" type="button" class="btn btn-primary" value="Limpiar historial" id="btnAbrirModalLimpiarHistorial" onclick="jalarLimpiarHistorial(' + v.ID + ');"/>';
                }
                html += '	</div>';
                html += '	</div>';

            });
            $("#dv_Ordenes .panel-body").append(html);
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

$(document).on('click', '#btnAbrirDetallePedido', function () {
    $('#myModalDetallesPedido').modal('show');
});

function jalarDetalle(a, b, c, d, e, f, g) {
    $('#id_orden_detalle').val(a);
    $('#token_orden_detalle').val(b);
    $('#idprod_orden_detalle').val(c);
    $('#nombreprod_orden_detalle').val(d);
    $('#fecha_orden_detalle').val(e);
    $('#precio_orden_detalle').val(f);
    $('#comentario_orden_detalle').val(g);
}
$(document).on('click', '#btnAbrirEliminarPedido', function () {
    $('#myModalEliminarPedido').modal('show');
});
function jalarEliminarPedido(a, b, c) {
    $('#id_orden_eliminar').val(a);
    $('#cantidad_orden_eliminar').val(b);
    $('#idprod_orden_eliminar').val(c);
}

function fnCancelarPedido() {
    var params = [];

    var id_orden = $('#id_orden_eliminar').val();
    var cantidad = $('#cantidad_orden_eliminar').val();
    var idprod = $('#idprod_orden_eliminar').val();

    params.push(id_orden);
    params.push(idprod);
    params.push(cantidad);

    console.log(params.join('|'));
    $.ajax({
        beforeSend: () => {
            $('#_load_action').modal('show');
        },
        type: 'POST',
        dataType: 'JSON',
        url: '_All',
        data: {
            __a: 10,
            __b: params.join('|')
        },
        success: function (_s) {
            $('#_load_action').modal('hide');
            swal("¡Se canceló la orden!", {
                icon: "success"
            });
            fnListarOrdenes();  
        },
        complete: () => {

        },
        error: () => {
            $('#_load_action').modal('hide');
            swal("¡No se pudo cancelar la orden!", {
                icon: "error"
            });
        }
    });
}

$(document).on('click', '#btnAbrirModalLimpiarHistorial', function () {
    $('#myModalLimpiarHistorial').modal('show');
});

function jalarLimpiarHistorial(a) {
    $('#id_orden_limpiar').val(a);
}

function fnLimpiarHistorial() {
    var params = [];

    var id_orden = $('#id_orden_limpiar').val();

    params.push(id_orden);

    console.log(params.join('|'));
    $.ajax({
        beforeSend: () => {
            $('#_load_action').modal('show');
        },
        type: 'POST',
        dataType: 'JSON',
        url: '_All',
        data: {
            __a: 11,
            __b: params.join('|')
        },
        success: function (_s) {
            $('#_load_action').modal('hide');
            swal("¡Se limpio el historial!", {
                icon: "success"
            });
            fnListarOrdenes();
        },
        complete: () => {

        },
        error: () => {
            $('#_load_action').modal('hide');
            swal("¡No se pudo limpiar el historial!", {
                icon: "error"
            });
        }
    });
}

$(document).on('click', '#btnAbrirModalCambiarEstado', function () {
    $('#_estado_orden_change').val(0);
    var estado_actual = $('#nombre_estado_actual').val();
    if (estado_actual == 'ENTREGADO') {
        document.getElementById("btnCambiarEstado_").disabled = true;
    } else {
        document.getElementById("btnCambiarEstado_").disabled = false;
    }
    $('#myModalCambiarEstado').modal('show');
});

function jalarCambiarEstado(a,b) {
    $('#id_orden_cambiar_estado').val(a);
    $('#nombre_estado_actual').val(b);
}

function fnCambiarEstado() {
    var params = [];

    var id = $('#id_orden_cambiar_estado').val();
    var estado = $('#_estado_orden_change').val();
    /*-------------------------------------------*/ 
    var numero = 0;
    var estado_actual = $('#nombre_estado_actual').val();

    params.push(id);
    params.push(estado);

    if (estado == 0) {
        swal("¡Elija un estado por favor!", {
                icon: "warning"
        });
        return;
    }
    if (estado_actual == 'EN PROCESO') {
        numero = 1;
        if (estado == numero) {
            swal("¡La orden ya está en proceso!", {
                icon: "warning"
            });
            return;
        }
    }
    if (estado_actual == 'APROBADO') {
        numero = 2;
        if (estado == numero) {
            swal("¡La orden ya fue aprobado!", {
                icon: "warning"
            });
            return;
        }
        if (estado == 1) {
            swal("¡La orden ya paso el proceso respectivo!", {
                icon: "warning"
            });
            return;
        }
    }
    if (estado_actual == 'ESTA EN CAMINO') {
        numero = 3;
        if (estado == numero) {
            swal("¡La orden está en camino!", {
                icon: "warning"
            });
            return;
        }
        if (estado == 1 || estado == 2) {
            swal("¡La orden ya paso el proceso respectivo!", {
                icon: "warning"
            });
            return;
        }
    }
    if (estado_actual == 'ENTREGADO') {
        numero = 4;
        if (estado == numero) {
            swal("¡La orden ya fue entregada!", {
                icon: "warning"
            });
            return;
        }
        if (estado == 1 || estado == 2 || estado == 3) {
            swal("¡La orden ya paso el proceso respectivo!", {
                icon: "warning"
            });
            return;
        }
    }
    console.log(params.join('|'));
    $.ajax({
        beforeSend: () => {
            $('#_load_action').modal('show');
        },
        type: 'POST',
        dataType: 'JSON',
        url: '_All',
        data: {
            __a: 13,
            __b: params.join('|')
        },
        success: function (_s) {
            $('#_load_action').modal('hide');
            swal("¡Se cambió el estado de la orden!", {
                icon: "success"
            });
            fnListarOrdenes();
        },
        complete: () => {
        },
        error: () => {
            $('#_load_action').modal('hide');
            swal("¡No se pudo cambiar el estado de la orden!", {
                icon: "error"
            });
        }
    });
}

function fnRealizarPago() {
    let tabla = $('#dv_Ordenes .panel-body> div');
 
    var param = [];
    var id_usuario = $('#id_usuario').val();
    var suma = 0;
    var cantidades = 0;
 
    for (var i = 0; i < tabla.length; i++) {

        var estado_orden = $(`#nombreestado_orden-${i}`).val();
        if (estado_orden == 'EN PROCESO') {
            var precio = $(`#precio_orden-${i}`).val();
            var cantidad = $(`#cantidad_orden-${i}`).val();
            suma = suma + parseFloat(precio);
            cantidades = cantidades + parseInt(cantidad);
        }
    }
    if (suma == 0 && cantidades == 0) {
        swal("No tienes pedidos en proceso", {
            icon: "info",
        });
        return;
    }
            param.push(suma);
            param.push(cantidades);
            param.push(id_usuario);

            console.log(param.join('|'));

        swal({
            title: "¿Desea comprar estas promociones?",
            text: 'Podras ver el estado de tu compra en la pestaña de Mis Ordenes',
            icon: "info",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
                if (willDelete) {
                    $.ajax({
                        beforeSend: () => {
                            $('#_load_action').modal('show');
                        },
                        type: 'POST',
                        dataType: 'JSON',
                        url: '_All',
                        data: {
                            __a: 14,
                            __b: param.join('|')
                        },
                        success: (_r) => {
                            console.log(_r);

                            swal("Compra exitosa", {
                                icon: "success",
                            });
                            fnRealizarPagoDetalle();
                            setTimeout(function () { fnListarOrdenes();}, 2000);
                            $('#_load_action').modal('hide');

                        },
                        complete: () => {
                        },
                        error: () => {
                            swal("No se procedió a la compra", {
                                icon: "warning",
                            });
                            $('#_load_action').modal('hide');
                        }
                    });
                }else {
                    swal("Lo esperamos uwu", {
                    icon: "info",
                    });
                }
        });
        
    
}
function fnRealizarPagoDetalle() {
    let tabla = $('#dv_Ordenes .panel-body> div');

    for (var i = 0; i < tabla.length; i++) {
        var param = [];
        var estado_orden = $(`#nombreestado_orden-${i}`).val();
        if (estado_orden == 'EN PROCESO') {
            var id_usuario = $('#id_usuario').val();
            var precio = $(`#precio_orden-${i}`).val();
            var cantidad = $(`#cantidad_orden-${i}`).val();
            var id_prodprom = $(`#idprodprom_orden-${i}`).val();
            var id_orden = $(`#id_orden-${i}`).val();

            param.push(id_prodprom);
            param.push(cantidad);
            param.push(precio);
            param.push(id_usuario);
            param.push(id_orden);

        $.ajax({
            beforeSend: () => {
                $('#_load_action').modal('show');
            },
            type: 'POST',
            dataType: 'JSON',
            url: '_All',
            data: {
                __a: 15,
                __b: param.join('|')
            },
            success: (_r) => {

            },
            complete: () => {

            },
            error: () => {
                console.error();
            }
        });
        }
    }
}