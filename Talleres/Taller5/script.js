document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studentForm');
    const tabla = document.getElementById('tablaEstudiantes').getElementsByTagName('tbody')[0];
    const mensajeDiv = document.getElementById('mensaje');

    // Inicializar vista de registros
    renderizarTabla();

    form.addEventListener('submit', (evento) => {
        evento.preventDefault();

        // Extracción de datos limpios
        const datosEstudiante = {
            cedula: document.getElementById('cedula').value.trim(),
            apellidos: document.getElementById('apellidos').value.trim(),
            nombres: document.getElementById('nombres').value.trim(),
            direccion: document.getElementById('direccion').value.trim(),
            telefono: document.getElementById('telefono').value.trim(),
            correo: document.getElementById('correo').value.trim(),
            facultad: document.getElementById('facultad').value.trim(),
            nivel: document.getElementById('nivel').value.trim(),
            paralelo: document.getElementById('paralelo').value.trim()
        };

        // --- VALIDACIONES CON EXPRESIONES REGULARES ---
        const v_cedula = /^\d{10}$/; 
        const v_telefono = /^\d{9,10}$/;
        const v_correo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!v_cedula.test(datosEstudiante.cedula)) {
            mostrarNotificacion('La cédula ingresada debe contener exactamente 10 dígitos numéricos.', 'error');
            return;
        }

        if (!v_telefono.test(datosEstudiante.telefono)) {
            mostrarNotificacion('El número de teléfono debe tener entre 9 y 10 dígitos.', 'error');
            return;
        }

        if (!v_correo.test(datosEstudiante.correo)) {
            mostrarNotificacion('El formato del correo electrónico no es válido.', 'error');
            return;
        }

        // Guardar cambios en el almacenamiento persistente local
        almacenarEstudiante(datosEstudiante);
        
        form.reset();
        mostrarNotificacion('Estudiante registrado y almacenado correctamente.', 'exito');
        renderizarTabla();
    });

    function almacenarEstudiante(objetoEstudiante) {
        let listado = JSON.parse(localStorage.getItem('db_estudiantes')) || [];
        listado.push(objetoEstudiante);
        localStorage.setItem('db_estudiantes', JSON.stringify(listado));
    }

    function renderizarTabla() {
        tabla.innerHTML = ''; 
        let listado = JSON.parse(localStorage.getItem('db_estudiantes')) || [];

        listado.forEach(item => {
            let fila = tabla.insertRow();
            
            // Columna 1: Cédula
            fila.insertCell(0).textContent = item.cedula;
            
            // Columna 2: Nombre Completo
            fila.insertCell(1).innerHTML = `<strong>${item.apellidos}</strong>, ${item.nombres}`;
            
            // Columna 3: Contacto combinado 
            fila.insertCell(2).innerHTML = `${item.correo}<br><small style="color:#777">${item.telefono}</small>`;
            
            // Columna 4: Datos de ubicación en la Universidad
            fila.insertCell(3).textContent = `${item.facultad} (${item.nivel} - "${item.paralelo}")`;
        });
    }

    function mostrarNotificacion(mensajeTexto, claseTipo) {
        mensajeDiv.textContent = mensajeTexto;
        mensajeDiv.className = claseTipo;
        
        setTimeout(() => {
            mensajeDiv.textContent = '';
            mensajeDiv.className = '';
        }, 4500);
    }
});