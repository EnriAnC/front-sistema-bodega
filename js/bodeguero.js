import postFormData from "../js/utils/post_form_data.js"
import my_api from "../js/utils/my_api.js"

const librosGlobal = {}

async function formMovimientoSubmit(event){
    event.preventDefault()
    const data = await postFormData(event.target, my_api.MOVIMIENTOS)
    console.log(data)
    const myModalAlternative = new bootstrap.Modal('#exampleModal')
    console.log(myModalAlternative)
    if (!data.data) {
        myModalAlternative._element.querySelector(".modal-body").innerText = "No se pudo generar el movimiento debido a un error"
        return myModalAlternative.show()
    }
    myModalAlternative._element.querySelector(".modal-body").innerText = "Movimiento generado"

    myModalAlternative.show()
    
    event.reset()
}

document.addEventListener('DOMContentLoaded', ()=>{
    cargarUsuarioLS()
    if (location.pathname == '/pages/bodeguero.html') {
    }

    if (location.pathname == '/pages/movimiento_libro.html') {
        const formLogin = document.getElementById('form-registro-movimiento')
        formLogin.addEventListener('submit', formMovimientoSubmit)
        cargarOptionsLibros()
        cargarOptionsBodegas()
        cargarBodegueroEnFormulario()
    }
    
})

function cargarUsuarioLS(){
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    const $p = document.getElementById('datos_usuario')
    $p.textContent = `${usuario.nombre} ${usuario.apellido_p} --- ${usuario.rol} `
}

async function getAllLibros(){
    const res = await fetch(my_api.LIBROS)
    const data = await res.json()
    return data
}

async function cargarOptionsLibros(){
    const libros = await getAllLibros()
    const selectLibro = document.getElementById('id_libro')
    const options = libros.map(({id_libro, nombre_libro})=>`<option value=${id_libro}>${id_libro} - ${nombre_libro}</option>`)
    selectLibro.innerHTML = options
}

async function getAllBodegas(){
    const res = await fetch(my_api.BODEGAS)
    const data = await res.json()
    return data
}

async function cargarOptionsBodegas(){
    const bodegas = await getAllBodegas()
    const selectBodegaOrigen = document.getElementById('id_bodega_origen')
    const selectBodegaDestino = document.getElementById('id_bodega_destino')
    const options = bodegas.map(({id_bodega, nombre_bodega})=>`<option value=${id_bodega}>${id_bodega} - ${nombre_bodega}</option>`)
    selectBodegaOrigen.innerHTML = options
    selectBodegaDestino.innerHTML = options
}

function cargarBodegueroEnFormulario(){
    const {id_usuario} = JSON.parse(localStorage.getItem('usuario'))
    const $idUsuario = document.getElementById('id_usuario')
    $idUsuario.value = id_usuario
    $idUsuario.before(document.createElement('span').textContent = id_usuario)
}

document.getElementById('id_libro').addEventListener('change', async e=>{
    const res = await fetch(`${my_api.LIBROS}/${e.target.value}/stock`)
    const data = await res.json()
    const dataFiltered = data.filter(stockLibro=>stockLibro.id_bodega == document.getElementById('id_bodega_origen').value)
    const $inputCantidadLibro = document.getElementById('cantidad_libro')
    if (dataFiltered.length>0){
        $inputCantidadLibro.value =  dataFiltered[0].stock
        $inputCantidadLibro.max = dataFiltered[0].stock
        document.getElementById('max_stock_libro').textContent = dataFiltered[0].stock
    } else {
        $inputCantidadLibro.value = 0
        document.getElementById('max_stock_libro').textContent = 'Sin stock'
    }
})

document.getElementById('id_bodega_origen').addEventListener('change', async e=>{
    const res = await fetch(`${my_api.LIBROSBYBODEGA}/${e.target.value}`)
    const data = await res.json()
    const dataFiltered = data.filter(libro=>libro.id_bodega == document.getElementById('id_bodega_origen').value)

    const selectLibrosId = document.getElementById('id_libro')
    const options = dataFiltered.map(({id_libro, nombre_libro})=>`<option value=${id_libro}>${id_libro} - ${nombre_libro}</option>`)
    selectLibrosId.innerHTML = options
})