// Función principal que consolida todas las verificaciones solicitadas
function validarFormulario(event) {
  
  // 1. Validación de campo vacío (Nombre)
  var nombre = document.getElementById("nombre").value;
  if (nombre == null || nombre.length == 0) {
    alert("El campo Nombre no puede estar vacío"); [cite: 181]
    event.preventDefault(); // Detiene el envío del formulario
    return false; [cite: 182]
  }

  // 2. Validación de campo numérico (Teléfono)
  var telefono = document.getElementById("telefono").value;
  if (isNaN(telefono) || telefono.length == 0) {
    alert("El campo Teléfono tiene que ser numérico"); [cite: 192]
    event.preventDefault();
    return false;
  }

  // 3. Validación de objeto Fecha
  var dia = parseInt(document.getElementById("dia").value); [cite: 203]
  var mes = parseInt(document.getElementById("mes").value) - 1; // En JS los meses van de 0 a 11 [cite: 204]
  var ano = parseInt(document.getElementById("ano").value); [cite: 205]
  var fecha = new Date(ano, mes, dia); [cite: 206]
  
  if (isNaN(fecha.getTime())) {
    alert("Por favor, introduce una fecha de nacimiento válida.");
    event.preventDefault();
    return false;
  }

  // 4. Validación de formato de Correo Electrónico mediante Expresión Regular
  var correo = document.getElementById("correo").value; [cite: 232]
  var regexEmail = /^\w+([-+. ]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (!regexEmail.test(correo)) {
    alert("El formato del correo electrónico no es válido.");
    event.preventDefault();
    return false;
  }

  // 5. Validación de Casilla de Verificación obligatoria (Checkbox)
  var condiciones = document.getElementById("campoCondiciones"); [cite: 219]
  if (!condiciones.checked) { [cite: 220]
    alert("Debe aceptar los términos y condiciones obligatoriamente.");
    event.preventDefault();
    return false; [cite: 221]
  }

  // Si todas las validaciones pasan con éxito
  alert("¡Todas las validaciones son correctas! Enviando datos...");
  return true; [cite: 183]
}