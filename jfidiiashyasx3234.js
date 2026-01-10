











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



