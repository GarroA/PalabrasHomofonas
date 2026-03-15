// Accesibilidad: cambiar tamaño de letra

function cambiarLetra(tamaño) { 
    // Cambia el tamaño de la fuente en todo el documento
    document.body.style.fontSize = tamaño + "px"; 
}


// 🔹 Lista de pares de palabras homófonas para el juego de memoria
const palabras = [ 
    { palabra: "Tubo", tipo: "texto" }, 
    { palabra: "Tuvo", tipo: "texto" }, 
    { palabra: "Casa", tipo: "texto" }, 
    { palabra: "Caza", tipo: "texto" }, 
    { palabra: "Gira", tipo: "texto" }, 
    { palabra: "Jira", tipo: "texto" },
    { palabra: "Vota", tipo: "texto" },
    { palabra: "Bota", tipo: "texto" }
];

// Variables de control del juego
let cartas = [];  // Contendrá las cartas duplicadas y mezcladas
let seleccionadas = []; // Guarda las cartas que el usuario ha volteado
let bloqueadas = false;  // Evita que se volteen más cartas mientras se verifica

// 🔹 Función para iniciar el juego de memoria
function iniciarJuego() { 
    const juego = document.getElementById("juego"); 
    juego.innerHTML = ""; // Limpia el tablero
    
    // Duplica las palabras para formar pares y las mezcla aleatoriamente
    cartas = [...palabras, ...palabras] 
        .sort(() => Math.random() - 0.5); // Mezcla aleatoriamente
    
    // Crea las cartas en el tablero 
    cartas.forEach((item, index) => {
        const carta = document.createElement("div");
        carta.classList.add("carta");
        carta.dataset.index = index;
        carta.innerHTML = "?";      // reverso inicial
        carta.addEventListener("click", voltearCarta);
        juego.appendChild(carta); 
    }); 
}

// Función para voltear cartas 
function voltearCarta(e) { 
    if (bloqueadas) return;  // Si está bloqueado, no permite voltear
    const carta = e.target;
    const index = carta.dataset.index;
    
    // Si ya está volteada, no hacer nada 
    if (carta.classList.contains("volteada")) return;
    
    // Voltea la carta y muestra la palabra
    carta.classList.add("volteada");
    carta.innerHTML = cartas[index].palabra;
    // Guarda la carta seleccionada
    seleccionadas.push({ index, carta });
    
    // Si hay dos cartas seleccionadas, verificar si son pareja
    if (seleccionadas.length === 2) {
        bloqueadas = true;
        setTimeout(verificarPareja, 1000);
    } 
}

// Función para verificar si las cartas son iguales 
function verificarPareja() {
    const [seleccion1, seleccion2] = seleccionadas;
    if (cartas[seleccion1.index].palabra === cartas[seleccion2.index].palabra) {
        // Si son iguales, se quedan volteadas con fondo verde
        seleccion1.carta.style.backgroundColor = "#4CAF50";
        seleccion2.carta.style.backgroundColor = "#4CAF50";
        
        //borra el mensaje
        document.getElementById("mensajeJuego").innerText = "";
        
    }  else {
            // Si no son iguales, se vuelven a tapar
            seleccion1.carta.classList.remove("volteada");
            seleccion2.carta.classList.remove("volteada");
            seleccion1.carta.innerHTML = "?";
            seleccion2.carta.innerHTML = "?";
        
            mostrarError();// Muestra mensaje de error
        // 🔹 Borrar el mensaje después de 1 segundo y medio
        setTimeout(() => {
            document.getElementById("mensajeJuego").innerText = "";
            }, 1500);
        }
    // Reinicia selección
        seleccionadas = [];
        bloqueadas = false;
    
}
/* -------------------------------
   Retroalimentación de errores
--------------------------------*/
function mostrarError() {
    const mensaje = document.getElementById("mensajeJuego");
    mensaje.innerText = "❌ No es la pareja correcta, sigue intentando.";
    mensaje.style.color = "red";
}    
// 🔹 Reinicia el juego de memoria
function reiniciarJuegoMemoria() {
    // Se reinician variables
    cartas = [];
    seleccionadas = [];
    bloqueadas = false;
    
    // Aquí se limpia tablero y mensaje
    document.getElementById("juego").innerHTML = "";
    document.getElementById("mensajeJuego").innerText = "";
    
    //Se inicia de nuevo el juego
    iniciarJuego();
}    
    
/*ACTIVIDAD VERDADERO/FALSO*/
let aciertos = 0;              // Contador de respuestas correctas
let preguntasRespondidas = 0;  // Contador de preguntas contestadas
const totalPreguntas = 5;      // Número total de preguntas

// 🔹 Verifica la respuesta seleccionada
function verificar(respuesta, esCorrecto, idResultado) {
    const resultado = document.getElementById(idResultado);
    
    if (resultado.innerText !== "") { 
        return; // Evita cambiar la respuesta una vez marcada
    }
    
    if (respuesta === esCorrecto) {
        resultado.innerText = "✅ Correcto";
        resultado.style.color = "green";
        aciertos++;
    } else {
        resultado.innerText = "❌ Incorrecto";
        resultado.style.color = "red";
    }
    
    preguntasRespondidas++;
    document.getElementById("puntaje").innerText = "Aciertos: " + aciertos;
    
    if (preguntasRespondidas === totalPreguntas) { 
        mostrarMensajeFinal();
    }
    
}   
/*muestra un mensaje según la respuesta*/
function mostrarMensajeFinal() {
    const mensaje = document.getElementById("mensajeFinal");
    if (aciertos === totalPreguntas) {
        mensaje.innerText = "🎉 ¡Excelente! Respondiste todas correctamente.";
        mensaje.style.color = "green";
        
    } else if (aciertos >= 1) {   
        mensaje.innerText = "👍 Muy bien, sigue practicando.";
        mensaje.style.color = "orange";
    } else {
        mensaje.innerText = "📘 Necesitas repasar un poco más. ¡Ánimo!";
        mensaje.style.color = "red";
    }
}

    /* -------------------------------
   PARA REINICIAR ACTIVIDAD VERDADERO/FALSO
--------------------------------*/
function reiniciarActividadVF() {
    // Reinicia variables
    aciertos = 0;
    preguntasRespondidas = 0;
    
    // Limpia los resultados de cada pregunta
    const resultados = document.querySelectorAll(".resultado");
    resultados.forEach(r => {
        r.innerText = "";
        r.style.color = "";
    });
    
    // Limpia el puntaje
    document.getElementById("puntaje").innerText = "Aciertos: 0";
    
    // Limpia el mensaje final
    document.getElementById("mensajeFinal").innerText = "";   
}   