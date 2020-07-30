function upperCase() {
  let mayuscula = document.getElementById("usuario").value;
  document.getElementById("usuario").value = mayuscula.toUpperCase();
}

function ingresar() {
  const usuario = document.getElementById("usuario").value;
  const clave = document.getElementById("clave").value;
}

function datos() {
  let user = JSON.parse(localStorage.getItem("user"));
  console.log("user");

  if (usuario == usuario) {
    usuario = result;
  } else usuario = No;

  alert(usuario);
  alert(contraseña);
}

function guardar_localstorage() {
  let user = {
    Firstname: "christian",
    contraseña: "1234",
  };

  localStorage.setItem("nombre", JSON.stringify(user));
}

function mostrardata() {
  let datos = document.getElementById("btn").value;
  document.getElementById("btn").value = datos.toUpperCase();
}

// localStorage.setItem('user', 'christian');
// var user = localStorage.getItem('user');

// let data =
