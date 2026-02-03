var matricula = "2177709";
var llave = "5912fdbc-39b0-4071-ba39-71e52e188d78"
var dominio = "https://redsocial.luislepe.tech/api/"

function vistaPublicacion() {
    let idPub = localStorage.getItem("idPub")
    $.ajax({
        url: dominio + "Publicaciones/" + matricula + "/" + idPub,
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        $(result).each(function (index, publicacionresponse) {
            let tipoLike = ""
            let foto = ""
            let espOp = ""
            let opciones = ""
            let contenido = publicacionresponse.contenido.replace(/\n/g, '<br>')
            let fecha = publicacionresponse.fechaPublicacion
            let fehcaTexto = moment(fecha).locale('es').format('L')
            if (publicacionresponse.likePropio) {
                tipoLike = `<i class="bi bi-hand-thumbs-up-fill me-1"></i>` 
            } else {
                tipoLike = `<i class="bi bi-hand-thumbs-up me-1"></i>` 
            }
            if (publicacionresponse.idUsuario == "2177709") {
                foto = "Imagenes/Perfil - Uziel Omar Flores Torres.png"
                espOp = "me-5"
                opciones = `
                    <div class="dropdown position-absolute top-0 end-0 p-2">
                        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-gear-fill"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalEditar" data-id-publicacion="${publicacionresponse.idPublicacion}" data-contenido="${publicacionresponse.contenido}"><i class="bi bi-pencil-square me-1"></i>Editar</a></li>
                            <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalEliminarVisPub" data-id-publicacion="${publicacionresponse.idPublicacion}"><i class="bi bi-trash me-1"></i></i>Eliminar</a></li>
                        </ul>
                    </div>
                `
            } else {
                foto = "Imagenes/Perfil.png"
            }
            let publicacion = `
                <li class="list-group-item clrtar"  id="publicacion-${publicacionresponse.idPublicacion}">
                    <div class="card-body">
                        <div class="d-flex mb-3">
                            <img src="${foto}" alt="Perfil" class="border border-secondary border-3 rounded-circle" height="60">
                            <div class="ps-3">
                                <h5 class="card-title ${espOp}">${publicacionresponse.nombre}</h5>
                                <h6 class="card-subtitle mb-1 text-body-secondary">${publicacionresponse.idUsuario}</h6>
                                <p class="small text-body-secondary">Publicación #${publicacionresponse.idPublicacion}, ${fehcaTexto}</p>
                            </div>
                        </div>
                        ${opciones}
                        <p class="card-text">${contenido}</p>
                    </div>
                </li>
                <li class="list-group-item clrtar">
                    <div class="card-footer text-body-secondary text-center">
                        <div class="btn-group w-100" role="group" aria-label="Basic outlined example">
                            <button type="button" class="btn likebtn" data-id-publicacion="${publicacionresponse.idPublicacion}">
                                ${tipoLike}${publicacionresponse.cantidadLikes} Me gusta
                            </button>
                            <button type="button" class="btn combtn" data-id-publicacion="${publicacionresponse.idPublicacion}" onclick="window.location.href='vista-publicacion.html';">
                                <i class="bi bi-chat-left me-1"></i>${publicacionresponse.cantidadComentarios} Comentarios
                            </button>
                        </div>
                    </div>
                </li>
            `
            $("#vistaPublicacion").prepend(publicacion)
        })
        console.log(result)
    }).fail(function (xhr, status, error) {
        let codigoRespuesta = xhr.status
        Swal.fire({
            icon: "error",
            title: "Vaya, parece que hubo un error",
            text: "Tuvimos problemas cargando la publicación, intentalo de nuevo mas tarde. Codigo de respuesta: " + codigoRespuesta
        })
    })
}

function comentarios() {
    let idPub = localStorage.getItem("idPub")
    $.ajax({
        url: dominio + "Comentarios/Publicacion/" + matricula + "/" + idPub,
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        $(result).each(function (index, publicacionresponse) {
            let tipoLike = ""
            let foto = ""
            let espOp = ""
            let opciones = ""
            let contenido = publicacionresponse.contenido.replace(/\n/g, '<br>')
            let fecha = publicacionresponse.fechaPublicacion
            let fehcaTexto = moment(fecha).locale('es').format('L')
            if (publicacionresponse.likePropio) {
                tipoLike = `<i class="bi bi-hand-thumbs-up-fill me-1"></i>` 
            } else {
                tipoLike = `<i class="bi bi-hand-thumbs-up me-1"></i>` 
            }
            if (publicacionresponse.idUsuario == "2177709") {
                foto = "Imagenes/Perfil - Uziel Omar Flores Torres.png"
                espOp = "me-5"
                opciones = `
                    <div class="dropdown position-absolute top-0 end-0 p-2">
                        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-gear-fill"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalEditarCom" data-id-comentario="${publicacionresponse.idComentario}" data-contenido="${publicacionresponse.contenido}"><i class="bi bi-pencil-square me-1"></i>Editar</a></li>
                            <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalEliminarCom" data-id-comentario="${publicacionresponse.idComentario}"><i class="bi bi-trash me-1"></i></i>Eliminar</a></li>
                        </ul>
                    </div>
                `
            } else {
                foto = "Imagenes/Perfil.png"
            }
            let comentario = `
                <li class="list-group-item" id="comentario-${publicacionresponse.idComentario}">
                    <div class="d-flex mb-1">
                        <img src="${foto}" alt="Perfil" class="border border-secondary border-3 rounded-circle" height="40">
                        <div class="ps-3">
                            <h6 class="card-title ${espOp}">${publicacionresponse.nombre}</h6>
                            <h6 class="small card-subtitle text-body-secondary">${publicacionresponse.idUsuario}</h6>
                            <p class="small text-body-secondary">Comentario #${publicacionresponse.idComentario}, ${fehcaTexto}</p>
                        </div>
                    </div>
                    ${opciones}
                    <p class="card-text">${contenido}</p>
                </li>
            `
            $("#vistaPublicacion").append(comentario)
        })
        console.log(result)
    }).fail(function (xhr, status, error) {
        let codigoRespuesta = xhr.status
        Swal.fire({
            icon: "error",
            title: "Vaya, parece que hubo un error",
            text: "Tuvimos problemas cargando los comentarios, intentalo de nuevo mas tarde. Codigo de respuesta: " + codigoRespuesta
        })
    })
}

function eliminarPublicacionVisPub(idPub) {
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
        window.location.href = "index.html"
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

function crearComentario() {
    let idPub = localStorage.getItem("idPub")
    let comentarioBtn = $(".combtn[data-id-publicacion='" + idPub + "']")
    let comentarioTexto = comentarioBtn.text().trim()
    let cantidadComentarios = parseInt(comentarioTexto.match(/\d+/)[0])
    $.ajax({
        url: dominio + "Comentarios",
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({
            "idComentario": 0,
            "idPublicacion": idPub,
            "idUsuario": matricula,
            "contenido": $("#textocom").val(),
            "llave_Secreta": llave
        }),
        crossDomain: true
    }).done(function (result) {
        let idCom = result.idComentario
        ComentarioNuevo(idCom)
        cantidadComentarios++
        comentarioBtn.html(`<i class="bi bi-chat-left me-1"></i> ${cantidadComentarios} Comentarios`);
        document.getElementById("textocom").value = ""
        console.log(result)
    }).fail(function (xhr, status, error) {
        let codigoRespuesta = xhr.status
        Swal.fire({
            icon: "error",
            title: "Vaya, parece que hubo un error",
            text: "Tuvimos problemas creando ese comentario. Codigo de respuesta: " + codigoRespuesta
        })
    })
}

function editarComentario(idCom, nuevoContenido) {
    let idPub = localStorage.getItem("idPub")
    $.ajax({
        url: dominio + "Comentarios/" + idCom,
        type: 'PUT',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({
            "idComentario": idCom,
            "idPublicacion": idPub,
            "idUsuario": matricula,
            "contenido": nuevoContenido,
            "llave_Secreta": llave
        }),
        crossDomain: true
    }).done(function (result) {
        let com = $("#comentario-" + idCom)
        com.find('.card-text').text(nuevoContenido)
        console.log(result)
    }).fail(function (xhr, status, error) {
        let codigoRespuesta = xhr.status
        Swal.fire({
            icon: "error",
            title: "Vaya, parece que hubo un error",
            text: "Tuvimos problemas editando ese comentario. Codigo de respuesta: " + codigoRespuesta
        })
    })
}

function eliminarComentario(idCom) {
    let idPub = localStorage.getItem("idPub")
    let comentarioBtn = $(".combtn[data-id-publicacion='" + idPub + "']")
    let comentarioTexto = comentarioBtn.text().trim()
    let cantidadComentarios = parseInt(comentarioTexto.match(/\d+/)[0])
    $.ajax({
        url: dominio + "Comentarios/" + idCom,
        type: 'DELETE',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({
            "idComentario": idCom,
            "idPublicacion": idPub,
            "idUsuario": matricula,
            "contenido": "a",
            "llave_Secreta": llave
        }),
        crossDomain: true
    }).done(function (result) {
        let com = $("#comentario-" + idCom)
        com.remove()
        cantidadComentarios--
        if (cantidadComentarios < 0) cantidadComentarios = 0
        comentarioBtn.html(`<i class="bi bi-chat-left me-1"></i> ${cantidadComentarios} Comentarios`)
        console.log(result)
    }).fail(function (xhr, status, error) {
        let codigoRespuesta = xhr.status
        Swal.fire({
            icon: "error",
            title: "Vaya, parece que hubo un error",
            text: "Tuvimos problemas eliminando ese comentario. Codigo de respuesta: " + codigoRespuesta
        })
    })
}

function ComentarioNuevo(idCom) {
    $.ajax({
        url: dominio + "Comentarios/" + matricula + "/" + idCom,
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    }).done(function (result) {
        $(result).each(function (index, publicacionresponse) {
            let tipoLike = ""
            let foto = ""
            let espOp = ""
            let opciones = ""
            let contenido = publicacionresponse.contenido.replace(/\n/g, '<br>')
            let fecha = publicacionresponse.fechaPublicacion
            let fehcaTexto = moment(fecha).locale('es').format('L')
            if (publicacionresponse.likePropio) {
                tipoLike = `<i class="bi bi-hand-thumbs-up-fill me-1"></i>` 
            } else {
                tipoLike = `<i class="bi bi-hand-thumbs-up me-1"></i>` 
            }
            if (publicacionresponse.idUsuario == "2177709") {
                foto = "Imagenes/Perfil - Uziel Omar Flores Torres.png"
                espOp = "me-5"
                opciones = `
                    <div class="dropdown position-absolute top-0 end-0 p-2">
                        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-gear-fill"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalEditarCom" data-id-comentario="${publicacionresponse.idComentario}" data-contenido="${publicacionresponse.contenido}"><i class="bi bi-pencil-square me-1"></i>Editar</a></li>
                            <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalEliminarCom" data-id-comentario="${publicacionresponse.idComentario}"><i class="bi bi-trash me-1"></i></i>Eliminar</a></li>
                        </ul>
                    </div>
                `
            } else {
                foto = "Imagenes/Perfil.png"
            }
            let comentario = `
                <li class="list-group-item" id="comentario-${publicacionresponse.idComentario}">
                    <div class="d-flex mb-1">
                        <img src="${foto}" alt="Perfil" class="border border-secondary border-3 rounded-circle" height="40">
                        <div class="ps-3">
                            <h6 class="card-title ${espOp}">${publicacionresponse.nombre}</h6>
                            <h6 class="small card-subtitle text-body-secondary">${publicacionresponse.idUsuario}</h6>
                            <p class="small text-body-secondary">Comentario #${publicacionresponse.idComentario}, ${fehcaTexto}</p>
                        </div>
                    </div>
                    ${opciones}
                    <p class="card-text">${contenido}</p>
                </li>
            `
            $("#vistaPublicacion").append(comentario)
        })
        console.log(result)
    }).fail(function (xhr, status, error) {
        let codigoRespuesta = xhr.status
        Swal.fire({
            icon: "error",
            title: "Vaya, parece que hubo un error",
            text: "Tuvimos problemas cargando el nuevo comentario. Codigo de respuesta: " + codigoRespuesta
        })
    })
}

$("#comentar").submit(function (event) {
    if (!this.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    } else {
        crearComentario()
        event.preventDefault()
    }
    this.classList.add('was-validated')
});

$("#modalEliminarVisPub").on("show.bs.modal", function (event) {
    let btn = $(event.relatedTarget)
    let idPublicacion = btn.data("id-publicacion")
    let modal = $(this)
    modal.find(".modal-footer .btn-danger").data("id-publicacion", idPublicacion);
})

$("#footerEliminarVisPub .btn-danger").on("click", function () {
    let idPub = $(this).data('id-publicacion')
    eliminarPublicacionVisPub(idPub)
})

$("#modalEditarCom").on("show.bs.modal", function (event) {
    let btn = $(event.relatedTarget)
    let idComentario = btn.data("id-comentario")
    let contenido = btn.data("contenido")
    let modal = $(this)
    modal.find(".modal-body #textoEditarCom").val(contenido)
    modal.find(".modal-footer .btn-primary").data("id-comentario", idComentario)
})

$("#footerEditarCom .btn-primary").on("click", function () {
    let idCom = $(this).data('id-comentario')
    let nuevoContenido = $('#textoEditarCom').val()
    editarComentario(idCom, nuevoContenido)
})

$("#modalEliminarCom").on("show.bs.modal", function (event) {
    let btn = $(event.relatedTarget)
    let idComentario = btn.data("id-comentario")
    let modal = $(this)
    modal.find(".modal-footer .btn-danger").data("id-comentario", idComentario)
})

$("#footerEliminarCom .btn-danger").on("click", function () {
    let idCom = $(this).data('id-comentario')
    eliminarComentario(idCom)
})

const texto = document.getElementById("textocom")
const editar = document.getElementById("message-text")
const editarCom = document.getElementById("textoEditarCom")
const altmax = 300

texto.addEventListener("input", function() {
    this.style.height = "auto"
    let nuevaAlt = Math.min(this.scrollHeight, altmax)
    this.style.height = nuevaAlt + "px"
})

editar.addEventListener("input", function() {
    this.style.height = "auto"
    let nuevaAlta = Math.min(this.scrollHeight, altmax)
    this.style.height = nuevaAlta + "px"
})

editarCom.addEventListener("input", function() {
    this.style.height = "auto"
    let nuevaAlta = Math.min(this.scrollHeight, altmax)
    this.style.height = nuevaAlta + "px"
})

$(document).ready(function () {
    vistaPublicacion()
    comentarios()
})