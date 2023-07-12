function agregarBodega() {
    var usuario = document.getElementById("usuario1").value;
    var nombre = document.getElementById("nombre1").value;
    var direccion = document.getElementById("direccion1").value;

    if (usuario == "" || nombre == "" || direccion == "") {
        alert("Por favor, completa todos los campos.");
        return;
    }
    else{
        alert("La bodega ha sido agregada correctamente.");
        document.getElementById("usuario1").value = "";
        document.getElementById("nombre1").value = "";
        document.getElementById("direccion1").value = "";
    }    
}