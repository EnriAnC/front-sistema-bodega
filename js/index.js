import postFormData from './utils/post_form_data.js'
import api from './utils/my_api.js'

const formLogin = document.getElementById('form-login')
formLogin.addEventListener('submit', loginSubmit)

async function loginSubmit(event){
    event.preventDefault()
    console.log(event)
    if (event.target.email.value === 'administrador1@email.com' && event.target.password.value === 'administrador1'){
      const admin = {
        apellido_m: "Neo",
        apellido_p: "",
        id_usuario: 0,
        nombre: "Admin",
        rol: "administrador",
      }
      localStorage.setItem('rol', JSON.stringify({rol: "administrador"}))
      localStorage.setItem('usuario', JSON.stringify(admin))
      alert('Verificación de usuario y contraseña correcta')  
      location.href = './pages/administrador.html'
    }
    const res = await postFormData(event.target, api.LOGIN)
    console.log(res)
    if (res.message === 'Verificación de usuario y contraseña correcta'){
      alert(res.message)
      const rol = res.data[0].rol
      localStorage.setItem('rol', rol)
      localStorage.setItem('usuario', JSON.stringify(res.data[0]))
      if(rol === 'jefebodega'){
        location.href = './pages/jefebodega.html'
      }
      if(rol === 'bodeguero'){
        location.href = './pages/bodeguero.html'
      }
      if(rol === 'administrador'){
        const admin = {
          apellido_m: "Neo",
          apellido_p: "",
          id_usuario: 0,
          nombre: "Admin",
          rol: "administrador",
        }
        localStorage.setItem('rol', JSON.stringify({rol: "administrador"}))
        location.setItem('usuario', JSON.stringify(admin))
        location.href = './pages/administrador.html'
      }
    }
}

function ingresarSistema() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  
  if (email == "" || password == "") {
      alert("Por favor, Ingrese todos los datos.");
      return;
  }
  else{
      alert("El Usuario ha ingresado satisfactoriamente");
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
   
  }    
}




