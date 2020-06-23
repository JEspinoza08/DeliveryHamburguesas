$(document).ready(function () {
    $('#btn_volver_registro').click(() => {
        window.location.href = "/LogOn/Login";
    });
});
function fn_registro_usuario() {
    var parametro = [];

    var nombres = $('#nombres_reg').val();
    var email = $('#email_reg').val();
    var celular = $('#celular_reg').val();
    var direccion = $('#direccion_reg').val();
    var dni = $('#dni_reg').val();
    var contraseña = $('#contraseña_reg').val();

    if ($('#nombres_reg').val() == '' || $('#nombres_reg').val() == 0) {
        swal("¡Escriba su nombre completo!", {
            icon: "warning"
        });
        return;
    }
    if ($('#celular_reg').val() == '' || $('#celular_reg').val() == 0) {
        swal("¡Escriba su número celular!", {
            icon: "warning"
        });
        return;
    }
    if ($('#direccion_reg').val() == '' || $('#direccion_reg').val() == 0) {
        swal("¡Escriba su dirección!", {
            icon: "warning"
        });
        return;
    }
    if ($('#dni_reg').val() == '' || $('#dni_reg').val() == 0) {
        swal("¡Escriba su DNI!", {
            icon: "warning"
        });
        return;
    }
    if ($('#contraseña_reg').val() == '' || $('#contraseña_reg').val() == 0) {
        swal("¡Escriba su contraseña!", {
            icon: "warning"
        });
        return;
    }
    if ($('#rep_contraseña_reg').val() != $('#contraseña_reg').val()) {
        swal("¡Repita contraseña!", {
            icon: "warning"
        });
        return;
    }
    parametro.push(nombres);
    parametro.push(email);
    parametro.push(celular);
    parametro.push(direccion);
    parametro.push(dni);
    parametro.push(contraseña);

    console.log(parametro.join('|'));
    $.ajax({
        beforeSend: () => {
            $('#_load_action').modal('show');
        },
        type: 'POST',
        dataType: 'JSON',
        url: '_Registrate',
        data: {
            __a: 0,
            __b: parametro.join('|')
        },
        success: function (_s) {
            swal("Se registró correctamente", {
                icon: "success",
            });
            $('#_load_action').modal('hide');
        },
        complete: () => {
            fn_Limpiar_Registro_Usuario();
            window.location.href = "/LogOn/Login";
        },
        error: () => {
            swal("¡Ocurrió un error!", {
                icon: "error"
            });
        }
    });
}
function fn_Limpiar_Registro_Usuario() {
     $('#nombres_reg').val('');
    $('#email_reg').val('');
   $('#celular_reg').val('');
    $('#direccion_reg').val('');
     $('#dni_reg').val('');
     $('#contraseña_reg').val('');
}
function fn_actualizar_perfil() {
    var parametro = [];

    var id = $('#id_usuario_perfil').val();
    var nombres = $('#nombre_usuario_perfil').val();
    var email = $('#email_usuario_perfil').val();
    var celular = $('#celular_usuario_perfil').val();
    var direccion = $('#direccion_usuario_perfil').val();
    var contraseña = $('#contraseña_usuario_perfil').val();

    if ($('#nombre_usuario_perfil').val() == '' || $('#nombre_usuario_perfil').val() == 0) {
        swal("¡Escriba su nombre completo!", {
            icon: "warning"
        });
        return;
    }
    
    if ($('#celular_usuario_perfil').val() == '' || $('#celular_usuario_perfil').val() == 0) {
        swal("¡Escriba su número de celular!", {
            icon: "warning"
        });
        return;
    }
    if ($('#direccion_usuario_perfil').val() == '' || $('#direccion_usuario_perfil').val() == 0) {
        swal("¡Escriba su dirección!", {
            icon: "warning"
        });
        return;
    }
    if ($('#contraseña_usuario_perfil').val() == '' || $('#contraseña_usuario_perfil').val() == 0) {
        swal("¡Escriba su contraseña!", {
            icon: "warning"
        });
        return;
    }
    parametro.push(id);
    parametro.push(nombres);
    parametro.push(email);
    parametro.push(celular);
    parametro.push(direccion);
    parametro.push(contraseña);
    //console.log(parametro.join('|'));

    $.ajax({
        beforeSend: () => {
            $('#_load_action').modal('show');
        },
        type: 'POST',
        dataType: 'JSON',
        url: '_Registrate',
        data: {
            __a: 1,
            __b: parametro.join('|')
        },
        success: function (_s) {
            swal("Se actualizó correctamente", {
                icon: "success",
            }).then(function () {
                window.location.href = "/LogOn/Login";
                });
            $('#_load_action').modal('hide');
        },
        complete: () => {
        },
        error: () => {
            swal("¡Ocurrió un error!", {
                icon: "error"
            });
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
function mostrarContrasena() {
    var tipo = document.getElementById("contraseña_usuario_perfil");
    if (tipo.type == "password") {
        tipo.type = "text";
    } else {
        tipo.type = "password";
    }
}
function mostrarContrasenaRegistro() {
    var tipo = document.getElementById("contraseña_reg");
    if (tipo.type == "password") {
        tipo.type = "text";
    } else {
        tipo.type = "password";
    }
}
function mostrarContrasenaRegistro2() {
    var tipo = document.getElementById("rep_contraseña_reg");
    if (tipo.type == "password") {
        tipo.type = "text";
    } else {
        tipo.type = "password";
    }
}