var matricula = "2177709";
var llave = "5912fdbc-39b0-4071-ba39-71e52e188d78"
var dominio = "https://redsocial.luislepe.tech/api/"

function PublicacionesUsuario() {
    $.ajax({
        url: dominio + "Publicaciones/all/" + matricula + "/" + matricula,
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
                            <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalEliminar" data-id-publicacion="${publicacionresponse.idPublicacion}"><i class="bi bi-trash me-1"></i></i>Eliminar</a></li>
                        </ul>
                    </div>
                `
            } else {
                foto = "Imagenes/Perfil.png"
            }
            let publicacion = `
                <div class="card mb-3 clrtar" id="publicacion-${publicacionresponse.idPublicacion}">
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
                    <div class="card-footer text-body-secondary text-center">
                        <div class="btn-group w-100" role="group" aria-label="Basic outlined example">
                            <button type="button" class="btn likebtn" data-id-publicacion="${publicacionresponse.idPublicacion}">
                                ${tipoLike}${publicacionresponse.cantidadLikes} Me gusta
                            </button>
                            <button type="button" class="btn combtn" data-id-publicacion="${publicacionresponse.idPublicacion}" onclick="window.location.href='vista publicacion.html';">
                                <i class="bi bi-chat-left me-1"></i>${publicacionresponse.cantidadComentarios} Comentarios
                            </button>
                        </div>
                    </div>
                </div>
            `
            $("#PublicacionesUsuario").append(publicacion)
        })
        console.log(result)
    }).fail(function (xhr, status, error) {
        let codigoRespuesta = xhr.status
        Swal.fire({
            icon: "error",
            title: "Vaya, parece que hubo un error",
            text: "Tuvimos problemas cargando las publicaciones, intentalo de nuevo mas tarde. Codigo de respuesta: " + codigoRespuesta
        })
    })
}

function PublicacionNueva(idPub) {
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
                            <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalEliminar" data-id-publicacion="${publicacionresponse.idPublicacion}"><i class="bi bi-trash me-1"></i></i>Eliminar</a></li>
                        </ul>
                    </div>
                `
            } else {
                foto = "Imagenes/Perfil.png"
            }
            let publicacion = `
                <div class="card mb-3 clrtar" id="publicacion-${publicacionresponse.idPublicacion}">
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
                    <div class="card-footer text-body-secondary text-center">
                        <div class="btn-group w-100" role="group" aria-label="Basic outlined example">
                            <button type="button" class="btn likebtn" data-id-publicacion="${publicacionresponse.idPublicacion}">
                                ${tipoLike}${publicacionresponse.cantidadLikes} Me gusta
                            </button>
                            <button type="button" class="btn combtn" data-id-publicacion="${publicacionresponse.idPublicacion}">
                                <i class="bi bi-chat-left me-1"></i>${publicacionresponse.cantidadComentarios} Comentarios
                            </button>
                        </div>
                    </div>
                </div>
            `
            $("#PublicacionesUsuario").prepend(publicacion)
        })
        console.log(result)
    }).fail(function (xhr, status, error) {
        let codigoRespuesta = xhr.status
        Swal.fire({
            icon: "error",
            title: "Vaya, parece que hubo un error",
            text: "Tuvimos problemas cargando la nueva publicación. Codigo de respuesta: " + codigoRespuesta
        })
    })
}

function crearPublicacion() {
    $.ajax({
        url: dominio + "Publicaciones",
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({
            "idPublicacion": 0,
            "idUsuario": matricula,
            "contenido": $("#textopub").val(),
            "llave_Secreta": llave
        }),
        crossDomain: true
    }).done(function (result) {
        let idPub = result.idPublicacion
        document.getElementById("textopub").value = ""
        PublicacionNueva(idPub)
        console.log(result)
    }).fail(function (xhr, status, error) {
        let codigoRespuesta = xhr.status
        Swal.fire({
            icon: "error",
            title: "Vaya, parece que hubo un error",
            text: "Tuvimos problemas creando esa publicación. Codigo de respuesta: " + codigoRespuesta
        })
    })
}

$("#publicar").submit(function (event) {
    if (!this.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    } else {
        crearPublicacion()
        event.preventDefault()
    }
    this.classList.add('was-validated')
})

$("#PublicacionesUsuario").on("click", ".combtn", function () {
    let idPub = $(this).data("id-publicacion")
    localStorage.setItem("idPub", idPub)
    window.location.href = "vista-publicacion.html"
})

const texto = document.getElementById("textopub")
const editar = document.getElementById("message-text")
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

$(document).ready(function () {
    PublicacionesUsuario()
})