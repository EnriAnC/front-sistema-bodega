import api from './my_api.js'

const formLogin = document.getElementById('form-login')
formLogin.addEventListener('submit', loginSubmit)

async function loginSubmit(event){
    event.preventDefault()
    const res = await submitFormData(event.target, api.LOGIN)
    console.log(res)
    if (res.message === 'Verificación de usuario y contraseña correcta'){
      alert(res.message)
      const rol = res.data[0].rol
      localStorage.setItem('rol', rol)
      if(rol === 'jefebodega'){
        location.href = './jefebodega.html'
      }
      if(rol === 'bodeguero'){
        location.href = './bodeguero.html'
      }
      if(rol === 'administrador'){
        location.href = './administrador.html'
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
      alert("El Usurio ha ingresado satisfactoriamente");
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
   
  }    
}


async function submitFormData(target, url){
    const formData = new FormData(target); // Crea un objeto iterable FormData con los datos del formulario
    const jsonData = {}
    for (const data of formData) {
      jsonData[data[0]] = data[1]
    } 
    const res = await fetch(url, {
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(jsonData),
    })
    return await res.json()
}

