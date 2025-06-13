function toggleRespuesta(id) {
    let respuesta = document.getElementById("respuesta" + id);
    respuesta.style.display = respuesta.style.display === "block" ? "none" : "block";
}

function cambiarImagen(ruta) {
    document.querySelector(".imagen-principal").src = ruta;
}

function toggleMenu() {
    let menu = document.getElementById("menu");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}


const publicaciones = {
  "Glifosato": [
    { nombre: "María", avatar: "img/avatar.jpg" },
    { nombre: "Luis", avatar: "img/avatar.jpg" }
  ],
  "Fendona": [
    { nombre: "Carlos", avatar: "img/avatar.jpg" }
  ],
  "Dimetoxion": [
    { nombre: "Ana", avatar: "img/avatar.jpg" },
    { nombre: "Pedro", avatar: "img/avatar.jpg" }
  ]
};

const ejemploChat = [
  { user: "Comprador", text: "Hola, ¿tiene stock del producto?" },
  { user: "Tú", text: "Sí, todavía disponible." }
];

const listaPublicaciones = document.getElementById("lista-publicaciones");
const listaInteresados = document.getElementById("lista-interesados");
const chatMensajes = document.getElementById("chat-mensajes");
const encabezado = document.getElementById("encabezado-chat");

let productoActivo = null;
let interesadoActivo = null;
let interesadoAvatar = null;


if (listaPublicaciones && listaInteresados && chatMensajes && encabezado) {
  listaPublicaciones.addEventListener("click", function (evento) {
    if (evento.target.tagName === "LI") {
      productoActivo = evento.target.dataset.producto;
      interesadoActivo = null;
      interesadoAvatar = null;

      encabezado.textContent = "Chat";
      listaInteresados.innerHTML = "";
      chatMensajes.innerHTML = "Selecciona un usuario para ver el chat";

      const usuarios = publicaciones[productoActivo];

      usuarios.forEach(function (usuario) {
        const li = document.createElement("li");
        li.textContent = usuario.nombre;
        li.dataset.nombre = usuario.nombre;
        li.dataset.avatar = usuario.avatar;
        listaInteresados.appendChild(li);
      });
    }
  });
}


if (listaInteresados && chatMensajes && encabezado) {
  listaInteresados.addEventListener("click", function (evento) {
    const li = evento.target;
    if (li.tagName === "LI") {
      interesadoActivo = li.dataset.nombre;
      interesadoAvatar = li.dataset.avatar;

      encabezado.innerHTML = "";
      const contenedor = document.createElement("div");
      contenedor.style.display = "flex";
      contenedor.style.alignItems = "center";
      contenedor.style.gap = "10px";

      const img = document.createElement("img");
      img.src = interesadoAvatar;
      img.className = "avatar avatar-header";

      const texto = document.createElement("span");
      texto.textContent = interesadoActivo;

      contenedor.appendChild(img);
      contenedor.appendChild(texto);
      encabezado.appendChild(contenedor);

      chatMensajes.innerHTML = "";
      ejemploChat.forEach(function (mensaje) {
        const mensajeDiv = document.createElement("div");

        if (mensaje.user === "Tú") {
          const fuerte = document.createElement("strong");
          fuerte.style.color = "green";
          fuerte.textContent = mensaje.user + ": ";
          mensajeDiv.appendChild(fuerte);
          mensajeDiv.append(mensaje.text);
        } else {
          const fila = document.createElement("div");
          fila.style.display = "flex";
          fila.style.alignItems = "center";
          fila.style.gap = "10px";

          const imgMsg = document.createElement("img");
          imgMsg.src = interesadoAvatar;
          imgMsg.className = "avatar avatar-msg";

          const cont = document.createElement("div");
          const fuerte = document.createElement("strong");
          fuerte.style.color = "blue";
          fuerte.textContent = mensaje.user + ": ";
          cont.appendChild(fuerte);
          cont.append(mensaje.text);

          fila.appendChild(imgMsg);
          fila.appendChild(cont);
          mensajeDiv.appendChild(fila);
        }

        chatMensajes.appendChild(mensajeDiv);
      });
    }
  });
}


function toggleDropdown(event) {
  event.preventDefault(); 
  const submenu = document.getElementById("submenu-mensajes");
  submenu.style.display = submenu.style.display === "block" ? "none" : "block";
}

document.addEventListener("click", function (e) {
  const submenu = document.getElementById("submenu-mensajes");
  const isDropdown = e.target.closest(".dropdown");
  if (!isDropdown && submenu) {
    submenu.style.display = "none";
  }
});







function esMovil() {
  return window.innerWidth <= 768;
}

if (esMovil()) {
  mostrarSoloPanel('publicaciones');
}

if (listaPublicaciones) {
  listaPublicaciones.addEventListener("click", function (e) {
    if (esMovil()) {
      mostrarSoloPanel('interesados');
    }
  });
}


if (listaInteresados) {
  listaInteresados.addEventListener("click", function (e) {
    if (esMovil()) {
      mostrarSoloPanel('chat');
    }
  });
}


function mostrarSoloPanel(nombre) {
  const publicaciones = document.querySelector('.panel-publicaciones');
  const interesados = document.querySelector('.panel-interesados');
  const chat = document.querySelector('.panel-chat');

  if (publicaciones) {
    publicaciones.style.display = (nombre === 'publicaciones') ? 'block' : 'none';
  }

  if (interesados) {
    interesados.style.display = (nombre === 'interesados') ? 'block' : 'none';
  }

  if (chat) {
    chat.style.display = (nombre === 'chat') ? 'block' : 'none';
  }
}


function retrocederDesdeChat() {
  mostrarSoloPanel('interesados');
}

function retrocederDesdeInteresados() {
  mostrarSoloPanel('publicaciones');
}


const encabezadoc = document.getElementById("encabezado-chat");
const titulo = document.getElementById("titulo-chat");
const mensajes = document.getElementById("chat-mensajes");

if (encabezadoc && titulo && mensajes) {
  
  const params = new URLSearchParams(window.location.search);
  const producto = params.get("producto") || "Producto";
  const usuario = params.get("usuario") || "Usuario";

  encabezadoc.textContent = ` ${usuario}`;
  titulo.textContent = "Mensajes";

  mensajes.innerHTML = "";

  const mensajesEjemplo = [
    { user: usuario, text: "Hola, ¿sigue disponible el producto?" },
    { user: "Tú", text: "Sí, está disponible aún." }
  ];

  mensajesEjemplo.forEach(msg => {
    const div = document.createElement("div");
    div.innerHTML = `<strong style="color:${msg.user === 'Tú' ? 'green' : 'blue'}">${msg.user}:</strong> ${msg.text}`;
    mensajes.appendChild(div);
  });
}
