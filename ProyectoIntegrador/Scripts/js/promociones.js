$(document).ready(function () {
    bebidas();
    papas();
    cantidades();
    fnListarPromociones();
});

function bebidas() {
    var bebidas = $('#_bebidas');
    var bebidas_filtro = $('#_bebidas_filtro');
    $.ajax({
        beforeSend: () => {

        },
        type: 'POST',
        dataType: 'JSON',
        url: '_All',
        data: {
            __a: 0,
            __b: ''
        },
        success: function (_s) {

            bebidas.empty();
            bebidas.append(`<option value="0">--BEBIDAS--</option>`);
            bebidas_filtro.empty();
            bebidas_filtro.append(`<option value="0">BEBIDAS (TODAS)</option>`);
            array = _s;

            $.each(array, function (k, v) {

                bebidas.append(`<option value="${v.ID}">${v.NOMBRE}</option>`);
                bebidas_filtro.append(`<option value="${v.ID}">${v.NOMBRE}</option>`);
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
function papas() {
    var papas = $('#_papas');
    var papas_filtro = $('#_papas_filtro');
    $.ajax({
        beforeSend: () => {

        },
        type: 'POST',
        dataType: 'JSON',
        url: '_All',
        data: {
            __a: 1,
            __b: ''
        },
        success: function (_s) {

            papas.empty();
            papas.append(`<option value="0">--PAPAS--</option>`);
            papas_filtro.empty();
            papas_filtro.append(`<option value="0">PAPAS (TODAS)</option>`);
            array = _s;

            $.each(array, function (k, v) {

                papas.append(`<option value="${v.ID}">${v.NOMBRE}</option>`);
                papas_filtro.append(`<option value="${v.ID}">${v.NOMBRE}</option>`);
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
function cantidades() {
    var cantidades = $('#_cantidad_realizarp');
    $.ajax({
        beforeSend: () => {

        },
        type: 'POST',
        dataType: 'JSON',
        url: '_All',
        data: {
            __a: 5,
            __b: ''
        },
        success: function (_s) {

            cantidades.empty();
            cantidades.append(`<option value="0">Elija la cantidad</option>`);
            array = _s;

            $.each(array, function (k, v) {

                cantidades.append(`<option value="${v.ID}">${v.CANTIDAD}</option>`);
                
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
function cargaArchivo() {
    var inputfile = document.getElementById('archivo');

    $('#_nombPromo').val('');
    $('#_precio').val('');
    $('#_cantidad').val('');
    $('#_bebidas').val(0);
    $('#_papas').val(0);
    inputfile.value = '';
    $("#myModal").modal('show');
}
var _nombArchivo = $('#_nombProm');
var archivo = $('#archivo');
var archivo_id = 0;
var id_carpeta = '';
function cargar() {
    if ($('#archivo').val() == '') {
        swal("¡Elija una imagen por favor!", {
            icon: "warning"
        });
        return;
    }

    subirArchivo($('#archivo'), registrarArchivo);
}
function subirArchivo(id, functioncalback) {
    $(id).upload(
        'SubirArchivo',
        { _b: '' },
        function (a) {
            var url_archivo = a;
            functioncalback(url_archivo);
        },
        'json'
    )
}
function registrarArchivo(url_archivo) {
    var parametro = [];

    var nombre = $('#_nombPromo').val();
    var precio = $('#_precio').val();
    var cantidad = $('#_cantidad').val();
    var bebidas = $('#_bebidas').val();
    var papas = $('#_papas').val();
    var id_usuario = $('#id_usuario').val();

    if (nombre == '' || nombre == 0) {
        swal("¡Escriba el nombre de la promoción!", {
            icon: "warning"
        });
        return;
    }
    if (precio == '' || precio == 0) {
        swal("¡Escriba el precio de la promoción!", {
            icon: "warning"
        });
        return;
    }
    if (cantidad == '' || cantidad == 0) {
        swal("¡Escriba la cantidad de la promoción!", {
            icon: "warning"
        });
        return;
    }
    if (bebidas == 0) {
        swal("¡Elija una bebida para la promoción!", {
            icon: "warning"
        });
        return;
    }
    if (papas == 0) {
        swal("¡Elija las papas de su preferencia!", {
            icon: "warning"
        });
        return;
    }

    parametro.push(nombre);
    parametro.push(precio);
    parametro.push(cantidad);
    parametro.push(bebidas);
    parametro.push(papas);
    parametro.push(id_usuario);
    parametro.push(url_archivo);

    console.log(parametro.join('|'));
    $.ajax({
        beforeSend: function (xhr) {
            $('#_load_action').modal('show');
        },
        url: '_RegistrarPromo',
        type: 'POST',
        dataType: 'json',
        data: {
            __a: 2,
            __b: parametro.join('|')
        },
        success: function (r) {
            console.log('r', r);
            if (r > 0) {
                swal("¡Se registró la promoción!", {
                    icon: "success"
                });
                $('#_load_action').modal('hide');
            } else {
                //$("#cargar").attr("disabled", false);

            }

            //$('#lucky-buscar').trigger('click');
            //$("#myModal").modal('hide');

        },
        complete: function (xhr) {
            $('#myModal').modal('hide');
            fnLimpiarRegistro();
            fnListarPromociones();
        },
        error: function (e) {
            swal("¡No se pudo registrar!", {
                icon: "error"
            });
            console.log(e);
        }
    });
}
function fnLimpiarRegistro() {
    var inputfile = document.getElementById('archivo');

    $('#_nombPromo').val('');
    $('#_precio').val('');
    $('#_cantidad').val('');
    $('#_bebidas').val(0);
    $('#_papas').val(0);
    inputfile.value = '';
}

$(document).keypress(function (e) {
    if (e.which == 13) {
        fnListarPromociones();
    }
});
function fnListarPromociones() {
    var perfil = $('#perfil').val();
    var papas = $('#_papas_filtro').val();
    var bebidas = $('#_bebidas_filtro').val();
    var nombreprom = $('#nombre_promocion').val();
    var parametro = [];

    parametro.push(papas);
    parametro.push(bebidas);
    parametro.push(nombreprom);
    $.ajax({
        beforeSend: () => {
            $('#_load_action').modal('show');
        },
        type: 'POST',
        dataType: 'JSON',
        url: '_All',
        data: {
            __a: 3,
            __b: parametro.join('|')
        },
        success: function (r) {
 
            console.log(r);
            if (r.length == 0) {
                swal("¡No hay Promociones!", {
                    icon: "warning"
                });
            }
            html = '';
         
            $("#dv_Promociones .panel-body").empty();
   
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
                    html += '       <div target="_blank" style="width:224.750px;"><img style="height:190px; width:500px;" src="http://localhost:64289/Temp/CargaImg/' + v.IMAGEN + '"></img></div>';
                    html += '<p style="font-size:20px;margin-top:10px;display:inline-block;">' + _titulo + '</p>';
                    html += '<p style="font-size:14px;">Bebida: ' + v.BNOMBRE + '</p>';
                    html += '<p style="font-size:14px;">Papas: ' + v.PNOMBRE + '</p>';
                html += '<p style="font-size:14px;font-weight:bold;">Precio: ' + v.PRECIO + '</p>';
                html += '<p style="font-size:14px;font-weight:bold;display:none;">Cantidad: ' + v.CANTIDAD + '</p>';
                html += '<input type="button" id="btn_realizarpmodal" onclick="rellenarDatos(' + v.ID + ',' + `'${v.IMAGEN}'` + ',' + `'${v.NOMBRE}'` + ',' + `'${v.BNOMBRE}'` + ',' + `'${v.PNOMBRE}'` + ',' + v.PRECIO + ',' + v.CANTIDAD + ');" class="btn btn-warning" value="Realizar Pedido"/>';
                if (perfil == 2) {
                    html += '<input type="button" class="btn btn-danger" value="Eliminar Promo" onclick="fn_eliminar_promocion(' + v.ID + ')"/>';
                    }
                    html += '	</div>';
                    html += '	</div>';
               
            });

            $("#dv_Promociones .panel-body").append(html);
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
$(document).on('click', '#btn_realizarpmodal', function () {
    $('#_cantidad_realizarp').val(0);
    $('#cremas_comentario').val('');
    $('#myModalRealizarPedido').modal('show');
});
function rellenarDatos(a, b, c, d, e,f,g) {
    var params = [];

    $('#img_realizarp').empty();
    $('#id_promocion').val(a);
    $('#nombre_realizarp').val(c);
    $('#bnombre_realizarp').val(d);
    $('#pnombre_realizarp').val(e);
    $('#precio_realizarp').val(f);
    $('#cantidad_actual').val(g);

    params.push(a);
    params.push(b);
    params.push(c);
    params.push(d);
    params.push(e);
    $('#img_realizarp').append('<div target="_blank" style="width:224.750px;"><img style="height:190px; width:567px;" src="http://localhost:64289/Temp/CargaImg/' + b + '"></img></div>');
    //console.log(params.join('|'));
}
function fn_eliminar_promocion(id_archivo2) {
    var eliminar = "";

    eliminar = id_archivo2;

    //console.log("El id del archivo es: " + eliminar);
    var confirmacion = confirm('¿Está seguro que desea eliminar la promoción?');

    if (confirmacion == true) {
        $.ajax({
            beforeSend: function (xhr) {
                $('#_load_action').modal('show');
            },
            url: '_All',
            type: 'POST',
            dataType: 'json',
            data: {
                __a: 4,
                __b: eliminar
            },
            success: function (a) {
                $('#_load_action').modal('hide');
                swal("¡Se eliminó la promoción!", {
                    icon: "success"
                });
                fnListarPromociones();  
            },
            error: function (xhr) {
                $('#_load_action').modal('hide');
                swal("¡No se pudo eliminar la promoción!", {
                    icon: "error"
                });
            }
        });
    }
}

function fnInsertarOrden() {
    var params = [];

    var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
    var contraseña = "";
    for (i = 0; i < 20; i++) contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));

    var id_prom = $('#id_promocion').val();
    var precio = $('#precio_realizarp').val() * $('#_cantidad_realizarp').val();
    var cantidad = $('#_cantidad_realizarp').val();
    var usuario_id = $('#id_usuario').val();
    var cremas_coment = $('#cremas_comentario').val();

    params.push(contraseña);
    params.push(id_prom);
    params.push(precio);
    params.push(cantidad);
    params.push(usuario_id);
    params.push(cremas_coment);

    var cantidad_actual = $('#cantidad_actual').val();

    if (cantidad == 0) {
        swal("¡Elija cantidad para proceder con la orden!", {
            icon: "warning"
        });
        return;
    }
    if (parseInt(cantidad) > parseInt(cantidad_actual)) {
        swal("¡Stock insuficiente!", {
            icon: "warning"
        });
        return;
    }

    //console.log(params.join('|'));

    $.ajax({
        beforeSend: function (xhr) {
            $('#_load_action').modal('show');
        },
        url: '_All',
        type: 'POST',
        dataType: 'json',
        data: {
            __a: 7,
            __b: params.join('|')
        },
        success: function (r) {
            console.log('r', r);
            if (r > 0) {
                swal("¡Se registró la orden!", {
                    icon: "success"
                });
                $('#_load_action').modal('hide');
            } else {
                //$("#cargar").attr("disabled", false);
            }
        },
        complete: function (xhr) {
            $('#myModalRealizarPedido').modal('hide');
            fnListarPromociones();
        },
        error: function (e) {
            swal("¡No se pudo registrar la orden!", {
                icon: "error"
            });
            console.log(e);
        }
    });

}

function check(e) {
    tecla = (document.all) ? e.keyCode : e.which;

    //Tecla de retroceso para borrar, siempre la permite
    if (tecla == 8) {
        return true;
    }

    patron = /[0-9]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}