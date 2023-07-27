import my_api from "./utils/my_api.js"
import postFormData from "./utils/post_form_data.js"


main()

async function main() {
    const ROL = localStorage.getItem('rol') ?? null
    if (!ROL) return document.body.innerHTML = '404 NOT FOUND'
}

document.addEventListener('DOMContentLoaded', ()=>{
    if (location.pathname == '/pages/crear_bodegas.html'){
        cargarBodeguerosEnFormulario()
    }
    if (location.pathname == '/pages/ingresar_libro.html'){
        cargarUsuario()
        cargarUsuarioLS()
        cargarCategorias()
        cargarEditoriales()
        document.addEventListener('submit', handleSubmitFormIngresarLibro)
    }
    cargarUsuarioLS()
})

async function cargarUsuario(){
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    const res = await fetch(`${my_api.BODEGAS}/${usuario.id_usuario}`)
    const bodega = await res.json()
    document.getElementById('id_bodega').value = bodega[0].id_bodega
    document.getElementById('bodega_actual').innerHTML = ` <br>${bodega[0].id_bodega} - ${bodega[0].nombre_bodega}`
}


function cargarUsuarioLS(){
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    const $p = document.getElementById('datos_usuario')
    $p.textContent = `${usuario.nombre} ${usuario.apellido_p} --- ${usuario.rol} `
}

async function handleSubmitFormIngresarLibro(ev){
    ev.preventDefault()
    const data = await postFormData(ev.target, `${my_api.LIBROS}/bodega`)
    alert(`Libro ingresado!`)
    location.reload()
}

async function cargarCategorias(){
    const res = await fetch(my_api.CATEGORIAS);
    const data = await res.json()
    console.log(data)
    const options = data.map(({id_categoria, nombre_categoria })=>`<option value=${id_categoria}>${id_categoria} - ${nombre_categoria}</option>`)
    document.getElementById('id_categoria').innerHTML = options
}

async function cargarEditoriales(){
    const res = await fetch(my_api.EDITORIALES);
    const data = await res.json()
    console.log(data)
    const options = data.map(({id_editorial, nombre_editorial })=>`<option value=${id_editorial}>${id_editorial} - ${nombre_editorial}</option>`)
    document.getElementById('id_editorial').innerHTML = options
}