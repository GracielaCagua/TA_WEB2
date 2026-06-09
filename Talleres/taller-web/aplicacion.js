//Taller4 1. Referencias al DOM [cite: 147]
const formularioTareas = document.getElementById('formulario-tareas');
const tituloTarea = document.getElementById('titulo-tarea');
const descripcionTarea = document.getElementById('descripcion-tarea');
const listaTareas = document.getElementById('lista-tareas');
const btnExportarJson = document.getElementById('btn-exportar-json');
const btnExportarXml = document.getElementById('btn-exportar-xml');

// 2. Estado de la Aplicación (Carga inicial) [cite: 152]
let coleccionTareas = JSON.parse(localStorage.getItem('tareasGuardadas')) || [];

// 3. Función para pintar las tareas en el HTML [cite: 154]
function redibujarInterfaz() {
    listaTareas.innerHTML = ""; // Vaciar contenedor antes de actualizar [cite: 155]
    coleccionTareas.forEach((tarea, indice) => {
        const elementoLista = document.createElement('li');
        elementoLista.className = 'elemento-tarea';
        elementoLista.innerHTML = `
            <div>
                <h3>${tarea.titulo}</h3>
                <p>${tarea.descripcion}</p>
                <small style="color: #94a3b8;">Código: ${tarea.codigo} | Registro: ${tarea.fecha}</small>
            </div>
            <button class="btn-eliminar" onclick="removerTarea(${indice})">Eliminar</button>
        `; // [cite: 159, 160, 161, 162, 163, 164, 166, 167]
        listaTareas.appendChild(elementoLista); // [cite: 169]
    });
}

// 4. Guardar datos en LocalStorage convirtiéndolos a texto JSON [cite: 172]
function actualizarAlmacenamientoLocal() {
    localStorage.setItem('tareasGuardadas', JSON.stringify(coleccionTareas)); // [cite: 173]
}

// 5. Captura del evento de envío del formulario [cite: 175]
formularioTareas.addEventListener('submit', (evento) => {
    evento.preventDefault(); // Evita que la página se recargue [cite: 175]
    
    // Creamos la estructura del objeto con claves descriptivas en español [cite: 177]
    const nuevaTarea = {
        codigo: Date.now().toString(), // [cite: 179]
        titulo: tituloTarea.value, // [cite: 180]
        descripcion: descripcionTarea.value, // [cite: 181]
        fecha: new Date().toLocaleDateString() // [cite: 182]
    };
    
    coleccionTareas.push(nuevaTarea); // [cite: 183]
    actualizarAlmacenamientoLocal(); // [cite: 184]
    redibujarInterfaz(); // [cite: 185]
    formularioTareas.reset(); // Limpiar campos de texto [cite: 186]
});

// 6. Eliminar elemento del arreglo por su índice [cite: 187]
window.removerTarea = function(indice) {
    coleccionTareas.splice(indice, 1); // [cite: 189]
    actualizarAlmacenamientoLocal(); // [cite: 190]
    redibujarInterfaz(); // [cite: 191]
};

// =======================================================
// PROCESAMIENTO DE FORMATOS SEMIESTRUCTURADOS (XML y JSON) [cite: 195]
// =======================================================

// Exportación nativa a formato JSON [cite: 197]
btnExportarJson.addEventListener('click', () => {
    if (coleccionTareas.length === 0) return alert('No existen tareas para exportar.'); // [cite: 199]
    
    // Serialización: de objeto JavaScript a cadena JSON [cite: 200]
    const textoJson = JSON.stringify(coleccionTareas, null, 2);
    console.log("--- FLUJO DE DATOS: JSON GENERADO ---"); // [cite: 201]
    console.log(textoJson); // [cite: 201]
    generarDescarga(textoJson, 'tareas_academicas.json', 'application/json'); // 
});

// Exportación estructurada a formato XML mediante marcado manual [cite: 203]
btnExportarXml.addEventListener('click', () => {
    if (coleccionTareas.length === 0) return alert('No existen tareas para exportar.'); // [cite: 205]
    
    // Construcción de la cabecera e inicio del nodo raíz [cite: 206, 207]
    let textoXml = '<?xml version="1.0" encoding="UTF-8"?>\n<tareas>\n';
    
    // Iteración para anidar nodos secundarios estructurados [cite: 208]
    coleccionTareas.forEach(tarea => {
        textoXml += `  <tarea codigo="${tarea.codigo}">\n`; // [cite: 210]
        textoXml += `    <titulo>${sanitizarTextoXml(tarea.titulo)}</titulo>\n`; // [cite: 211]
        textoXml += `    <descripcion>${sanitizarTextoXml(tarea.descripcion)}</descripcion>\n`; // [cite: 212]
        textoXml += `    <fecha>${tarea.fecha}</fecha>\n`; // [cite: 216]
        textoXml += `  </tarea>\n`; // [cite: 216]
    });
    
    textoXml += '</tareas>'; // Cierre del nodo raíz [cite: 217]
    console.log("--- FLUJO DE DATOS: XML GENERADO ---"); // [cite: 218]
    console.log(textoXml); // [cite: 218]
    generarDescarga(textoXml, 'tareas_academicas.xml', 'application/xml'); // 
});

// Función utilitaria para disparar la descarga de archivos en el cliente [cite: 220]
function generarDescarga(contenidoTexto, nombreArchivo, tipoMime) {
    const bloqueDatos = new Blob([contenidoTexto], { type: tipoMime }); // [cite: 220]
    const urlDescarga = URL.createObjectURL(bloqueDatos); // [cite: 221]
    const enlaceDescarga = document.createElement('a'); // [cite: 221]
    
    enlaceDescarga.href = urlDescarga; // [cite: 223]
    enlaceDescarga.download = nombreArchivo; // [cite: 224]
    enlaceDescarga.click(); // [cite: 225]
    URL.revokeObjectURL(urlDescarga); // Liberar memoria del navegador [cite: 226]
}

// Sanitización para prevenir errores de parsing en XML [cite: 227]
function sanitizarTextoXml(textoInseguro) {
    return textoInseguro.replace(/[<>&'"]/g, (caracter) => { // [cite: 229]
        switch (caracter) {
            case '<': return '&lt;'; // [cite: 231]
            case '>': return '&gt;'; // [cite: 232]
            case '&': return '&amp;'; // [cite: 233]
            case "'": return '&apos;'; // [cite: 234]
            case '"': return '&quot;'; // [cite: 235]
            default: return caracter;
        }
    });
}

// 7. Renderizado inicial al cargar la ventana [cite: 239]
redibujarInterfaz();