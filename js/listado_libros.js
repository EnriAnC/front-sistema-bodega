import ajax from "./utils/ajax.js";
import Table from "./components/Table.js";
import api from './utils/my_api.js'

main()

async function main() {
    const ROL = localStorage.getItem('rol') ?? null
    if (!ROL) return document.body.innerHTML = '404 NOT FOUND'
    const bodegas = await ajax(api.BODEGAS)
    cargarOptionsBodega(bodegas).insertIntoElementById('selectBodega')
}

document.addEventListener('change', inputSelectBodegaHandler)

document.addEventListener('DOMContentLoaded', ()=>{
    cargarUsuarioLS()
})


    
async function inputSelectBodegaHandler (ev) {
    await updateTableByIdBodega(ev.target.value)
}

async function updateTableByIdBodega(id_bodega){
    const table = Table()
    table.addColumns('Nombre', 'Autor', 'Stock')
    table.addClass('table', ['clase1'])

    if (id_bodega === 'none') return table.insertBeforeElementById('selectBodega')
    const libros = await ajax(`${api.LIBROSBYBODEGA}/${id_bodega}`)
    
    table.addRows(libros.map(({nombre_libro, autor, stock})=>({nombre_libro, autor, stock})))
    table.insertAfterElementById('selectBodega')
}

function cargarOptionsBodega(bodegasData){
    let html = ''
    for (const bodega of bodegasData) {
        html += `<option value="${bodega.id_bodega}">${bodega.nombre_bodega}</option>`
    }
    return {
        insertIntoElementById: function(id){
            document.getElementById(id).innerHTML += html
        }
    }
}


function cargarUsuarioLS(){
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    const $p = document.getElementById('datos_usuario')
    $p.textContent = `${usuario.nombre} ${usuario.apellido_p} --- ${usuario.rol} `
}