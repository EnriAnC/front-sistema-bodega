import my_api from './utils/my_api.js'
import api from './utils/my_api.js'
import postFormData from './utils/post_form_data.js'


async function registrarUsuarioSubmit(event){
    event.preventDefault()
    const res = await postFormData(event.target, api.REGISTER)
    console.log(res)
    alert(res.message)
    location.reload()
}


document.addEventListener('DOMContentLoaded', ()=>{
    if (location.pathname == '/pages/administrador.html') {

    }
    if (location.pathname == '/pages/registrar_usuario.html'){
        document.getElementById('form-registro-usuario').addEventListener('submit', registrarUsuarioSubmit)

    }
    if (location.pathname == '/pages/crear_bodegas.html'){
        cargarJefeBodegasEnFormulario()
        document.getElementById('form-asociar-bodega').addEventListener('submit', submitAsociarBodega)
    }
    cargarUsuarioLS()
})

function cargarUsuarioLS(){
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    const $p = document.getElementById('datos_usuario')
    $p.textContent = `${usuario.nombre} ${usuario.apellido_p} --- ${usuario.rol} `
}

async function submitAsociarBodega(ev){
    ev.preventDefault()
    const data = await postFormData(ev.target, my_api.BODEGAS)
    const {id_bodega, id_usuario, nombre_bodega, direccion_bodega} = data
    alert(`
    Bodega creada y asignada!.
    Se rederigirá al menu`)
    location.href = '/pages/administrador.html'
}


async function cargarJefeBodegasEnFormulario(){
    const res = await fetch(`${my_api.USUARIOS}/jefebodegas`)
    const data = await  res.json()
    const res2 = await fetch(my_api.BODEGAS)
    const data2 = await res2.json()
    const id_usuario_bodega = data2.map(({id_usuario})=>id_usuario)
    const options = data.map(({id_usuario, nombre, apellido_p, apellido_m})=>{
        if (id_usuario_bodega.includes(id_usuario)) {
            return
        }
        return `<option value=${id_usuario}>${id_usuario} - ${nombre} ${apellido_p} ${apellido_m ?? ''}</option>`
    })
    document.getElementById('id_usuario').innerHTML = options
}