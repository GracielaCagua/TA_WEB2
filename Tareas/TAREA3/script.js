const formulario = document.getElementById("clienteForm");
const tablaClientes = document.getElementById("tablaClientes");

formulario.addEventListener("submit", function(e) {

    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const cedula = document.getElementById("cedula").value;
    const correo = document.getElementById("correo").value;
    const telefono = document.getElementById("telefono").value;
    const direccion = document.getElementById("direccion").value;

    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${nombre}</td>
        <td>${cedula}</td>
        <td>${correo}</td>
        <td>${telefono}</td>
        <td>${direccion}</td>
    `;

    tablaClientes.appendChild(fila);

    formulario.reset();
});