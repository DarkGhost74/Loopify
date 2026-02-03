var matricula = "2177709";
var llave = "5912fdbc-39b0-4071-ba39-71e52e188d78"
var dominio = "https://redsocial.luislepe.tech/api/"

function editarPublicacion(idPub, nuevoContenido) {
    $.ajax({
        url: dominio + "Publicaciones/" + idPub,
        type: 'PUT',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({
            "idPublicacion": idPub,
            "idUsuario": matricula,
            "contenido": nuevoContenido,
            "llave_Secreta": llave
        }),
        crossDomain: true
    }).done(function (result) {
        let pub = $("#publicacion-" + idPub)
        pub.find('.card-text').text(nuevoContenido)
        console.log(result)
    }).fail(function (xhr, status, error) {
        let codigoRespuesta = xhr.status
        Swal.fire({
            icon: "error",
            title: "Vaya, parece que hubo un error",
            text: "Tuvimos problemas editando la publicación. Codigo de respuesta: " + codigoRespuesta
        })
    })
}

function eliminarPublicacion(idPub) {
    $.ajax({
        url: dominio + "Publicaciones/" + idPub,
        type: 'DELETE',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({
            "idPublicacion": idPub,
            "idUsuario": matricula,
            "contenido": "a",
            "llave_Secreta": llave
        }),
        crossDomain: true
    }).done(function (result) {
        let pub = $("#publicacion-" + idPub)
        pub.remove()
        console.log(result)
    }).fail(function (xhr, status, error) {
        let codigoRespuesta = xhr.status
        Swal.fire({
            icon: "error",
            title: "Vaya, parece que hubo un error",
            text: "Tuvimos problemas eliminando la publicación. Codigo de respuesta: " + codigoRespuesta
        })
    })
}

function crearLike(idPub, botonLike) {
    $.ajax({
        url: dominio + "Likes",
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({
            "idPublicacion": idPub,
            "idUsuario": matricula,
            "llave_Secreta": llave
        }),
        crossDomain: true
    }).done(function (result) {
        let likeTexto = botonLike.text().trim()
        let likes = parseInt(likeTexto.match(/\d+/)[0])
        likes++
        botonLike.find("i").toggleClass("bi-hand-thumbs-up bi-hand-thumbs-up-fill")
        botonLike.html(`${botonLike.find("i")[0].outerHTML} ${likes} Me gusta`)
        console.log(result)
    }).fail(function (xhr, status, error) {
        let codigoRespuesta = xhr.status
        Swal.fire({
            icon: "error",
            title: "Vaya, parece que hubo un error",
            text: "Tuvimos problemas con ese like. Codigo de respuesta: " + codigoRespuesta
        })
    })
}

function eliminarLike(idPub, botonLike) {
    $.ajax({
        url: dominio + "Likes",
        type: 'DELETE',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({
            "idPublicacion": idPub,
            "idUsuario": matricula,
            "llave_Secreta": llave
        }),
        crossDomain: true
    }).done(function (result) {
        let likeTexto = botonLike.text().trim()
        let likes = parseInt(likeTexto.match(/\d+/)[0])
        likes--
        botonLike.find("i").toggleClass("bi-hand-thumbs-up-fill bi-hand-thumbs-up")
        botonLike.html(`${botonLike.find("i")[0].outerHTML} ${likes} Me gusta`)
        console.log(result)
    }).fail(function (xhr, status, error) {
        let codigoRespuesta = xhr.status
        Swal.fire({
            icon: "error",
            title: "Vaya, parece que hubo un error",
            text: "Tuvimos problemas con ese like. Codigo de respuesta: " + codigoRespuesta
        })
    })
}

$("#Publicaciones").on("click", ".likebtn", function () {
    let idPub = $(this).data("id-publicacion")
    let likeMio = $(this).find("i")
    if (likeMio.hasClass("bi-hand-thumbs-up")) {
        crearLike(idPub, $(this))
    } else {
        eliminarLike(idPub, $(this))
    }
})

$("#PublicacionesUsuario").on("click", ".likebtn", function () {
    let idPub = $(this).data("id-publicacion")
    let likeMio = $(this).find("i")
    if (likeMio.hasClass("bi-hand-thumbs-up")) {
        crearLike(idPub, $(this))
    } else {
        eliminarLike(idPub, $(this))
    }
})

$("#vistaPublicacion").on("click", ".likebtn", function () {
    let idPub = $(this).data("id-publicacion")
    let likeMio = $(this).find("i")
    if (likeMio.hasClass("bi-hand-thumbs-up")) {
        crearLike(idPub, $(this))
    } else {
        eliminarLike(idPub, $(this))
    }
})

$("#modalEditar").on("show.bs.modal", function (event) {
    let btn = $(event.relatedTarget)
    let idPublicacion = btn.data("id-publicacion")
    let contenido = btn.data("contenido")
    let modal = $(this)
    modal.find(".modal-body #message-text").val(contenido)
    modal.find(".modal-footer .btn-primary").data("id-publicacion", idPublicacion)
})

$("#footerEditar .btn-primary").on("click", function () {
    let idPub = $(this).data('id-publicacion')
    let nuevoContenido = $('#message-text').val()
    editarPublicacion(idPub, nuevoContenido)
})

$("#modalEliminar").on("show.bs.modal", function (event) {
    let btn = $(event.relatedTarget)
    let idPublicacion = btn.data("id-publicacion")
    let modal = $(this)
    modal.find(".modal-footer .btn-danger").data("id-publicacion", idPublicacion)
})

$("#footerEliminar .btn-danger").on("click", function () {
    let idPub = $(this).data('id-publicacion')
    eliminarPublicacion(idPub)
})