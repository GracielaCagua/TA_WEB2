// --- 1. ESTADO DE LA APLICACIÓN ---
// Carga los datos guardados o inicializa un arreglo vacío si no existen registros
let libros = JSON.parse(localStorage.getItem('listaLibros')) || [];
let estaEditando = false;

// --- 2. ELEMENTOS DEL DOM ---
const formulario = document.getElementById('formulario-crud');
const entradaTitulo = document.getElementById('titulo');
const entradaAutor = document.getElementById('autor');
const entradaId = document.getElementById('id-elemento');
const cuerpoTabla = document.getElementById('cuerpo-tabla');
const botonGuardar = document.getElementById('boton-guardar');
const botonCancelar = document.getElementById('boton-cancelar');

// --- 3. FUNCIONES OPERATIVAS (CRUD) ---

// [LEER] Dibuja las filas de la tabla de acuerdo al arreglo globalizado
function renderizarLibros() {
    cuerpoTabla.innerHTML = ""; // Vaciar la tabla para evitar duplicados
    
    if (libros.length === 0) {
        cuerpoTabla.innerHTML = `<tr><td colspan="3" style="text-align:center;">No hay libros registrados.</td></tr>`;
        localStorage.setItem('listaLibros', JSON.stringify(libros));
        return;
    }
    
    libros.forEach(libro => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>
                <button class="btn-editar" onclick="prepararEdicion('${libro.id}')">Editar</button>
                <button class="btn-eliminar" onclick="eliminarLibro('${libro.id}')">Eliminar</button>
            </td>
        `;
        cuerpoTabla.appendChild(fila);
    });
    
    // Guardar el estado actualizado en el almacenamiento local
    localStorage.setItem('listaLibros', JSON.stringify(libros));
}

// [CREAR Y ACTUALIZAR] Escuchar el envío del formulario
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault(); // Evita que la página web se recargue por defecto
    
    const valorTitulo = entradaTitulo.value.trim();
    const valorAutor = entradaAutor.value.trim();
    const idActual = entradaId.value;
    
    if (estaEditando) {
        // [ACTUALIZAR] Mapea el estado reemplazando el elemento editado coincidente
        libros = libros.map(libro => 
            libro.id === idActual ? { ...libro, titulo: valorTitulo, autor: valorAutor } : libro
        );
        estaEditando = false;
        botonGuardar.textContent = 'Guardar Libro';
        botonCancelar.classList.add('oculto');
    } else {
        // [CREAR] Construye un nuevo objeto con un identificador único persistente (UUID)
        const nuevoLibro = {
            id: crypto.randomUUID(),
            titulo: valorTitulo,
            autor: valorAutor
        };
        libros.push(nuevoLibro);
    }
    
    reiniciarFormulario();
    renderizarLibros();
});

// [ACTUALIZAR - PREPARACIÓN] Mueve la información seleccionada directamente al formulario
window.prepararEdicion = function(id) {
    const libroEncontrado = libros.find(libro => libro.id === id);
    if (!libroEncontrado) return;
    
    entradaTitulo.value = libroEncontrado.titulo;
    entradaAutor.value = libroEncontrado.autor;
    entradaId.value = libroEncontrado.id;
    
    estaEditando = true;
    botonGuardar.textContent = 'Actualizar Libro';
    botonCancelar.classList.remove('oculto');
};

// [ELIMINAR] Remueve de forma definitiva un registro filtrando el arreglo
window.eliminarLibro = function(id) {
    if (confirm('¿Está seguro de que desea eliminar este libro?')) {
        libros = libros.filter(libro => libro.id !== id);
        
        // Si borramos el libro que justo se estaba editando, limpiamos el formulario
        if (estaEditando && entradaId.value === id) {
            reiniciarFormulario();
        }
        renderizarLibros();
    }
};

// Cancelar explícitamente el estado dinámico de edición
botonCancelar.addEventListener('click', reiniciarFormulario);

// Limpieza de campos restableciendo los elementos gráficos originales
function reiniciarFormulario() {
    formulario.reset();
    entradaId.value = "";
    estaEditando = false;
    botonGuardar.textContent = 'Guardar Libro';
    botonCancelar.classList.add('oculto');
}

// --- 4. INICIALIZACIÓN DE LA APLICACIÓN ---
renderizarLibros();