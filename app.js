//Constantes globales
const a = "ai";
const e = "enter";
const i = "imes";
const o = "ober";
const u = "ufat";

const input = document.querySelector("TEXTAREA");
const aviso = document.querySelector(".output-texto div");
const output = document.querySelector(".output-texto p");
const botonCopiar = document.querySelector(".copiar");
const tituloOutput = document.querySelector(".output-texto h2")


//Variables globales
let codigo;
let letra;

//Eventos
addEventListener("keypress", validarTeclas);
addEventListener("paste", validarPaste);


//Funciones

//Función ejecutada al presionar el boton "Encriptar"
function encriptar(){
    const mensajeInicial = input.value;
    const mensajeInicialArray = mensajeInicial.split("");
    let mensajeSalida = mensajeInicial;

    iniciar();

    // Se verificar carácter por carácter y se sustituyen por la clave que le corresponde.
    for (let c = 0; c< mensajeInicial.length; c++) {
        if (mensajeInicialArray[c]=='a') {
            mensajeInicialArray[c] = a;
        } else if (mensajeInicialArray[c]=='e'){
            mensajeInicialArray[c] = e;
        } else if (mensajeInicialArray[c]=='i'){
            mensajeInicialArray[c] = i;
        } else if (mensajeInicialArray[c]=='o'){
            mensajeInicialArray[c] = o;
        } else if (mensajeInicialArray[c]=='u'){
            mensajeInicialArray[c] = u;
        }
    }
    
    //Unimos el array en un solo mensaje y lo mostramos en la salida.
    mensajeSalida = mensajeInicialArray.join("");
    output.textContent = mensajeSalida;

    //Actualizamos el mensaje
    tituloOutput.textContent = "Texto encriptado:"
}

// Función ejecutada al presionar el boton "Desencriptar"
function desencriptar(){
    const mensajeInicial = input.value;
    const mensajeInicialArray = mensajeInicial.split("");
    let mensajeSalida = mensajeInicial;
    let c = 0;

    iniciar();

    while (c < mensajeSalida.length){
        mensajeSalida = buscarClave(mensajeSalida, c, e, 'e');
        mensajeSalida = buscarClave(mensajeSalida, c, i, 'i');
        mensajeSalida = buscarClave(mensajeSalida, c, o, 'o');
        mensajeSalida = buscarClave(mensajeSalida, c, u, 'u');
        mensajeSalida = buscarClave(mensajeSalida, c, a, 'a');
        c++;
    }
    output.textContent = mensajeSalida;

    //Actualizamos el mensaje
    tituloOutput.textContent = "Texto desencriptado:"
}

//Función ejecutada al presionar el botón "Copiar"
function copiar(){
    // Obtenemos el mensaje y lo copiamos al portapapeles
    mensaje = output.textContent
    navigator.clipboard.writeText(mensaje)
}

//Función para validar la pulsación de teclas por medio de un evento "key press"
function validarTeclas(e){
    codigo = e.charCode;
    letra = e.key;

    // Aquí verificamos que las teclas sean del abcdario en minusculas, la letra ñ o espacio. Si no lo son, se previene la ejecución el evento. 
    if ((codigo >= 97 && codigo <=122) || codigo == 241 || codigo == 32){
            
    } else {
        e.preventDefault();
    }
}

// Función para validar el texto pegado con el evento paste
function validarPaste(e){
    e.preventDefault();

    //Obtenemos informacion del portapapeles
    let paste = (e.clipboardData || window.clipboardData).getData("text");

    //Separamos el string en un arreglo para procesarlo
    pasteArray = paste.split("");

    pasteCharCodes = [];
    //Convertimos todos los elementos del sting paste a su charCode
    pasteArray.forEach( (item,index) =>{pasteCharCodes.push(paste.charCodeAt(index));})

    //Filtramos los charCodes que nos interesan
    let flag = true;
    while(flag){
        flag = false;
        pasteCharCodes.forEach( (item, index, object) => {
            let code = parseInt(item);
            if ((code >= 97 && code <=122) || code == 241 || code == 32){
                
            } else {
                object.splice(index, 1);
                flag = true;
            }
        });
    }

    //Convertimos los charcodes a char para forma el nuevo string
    let nuevoArreglo = [];
    pasteCharCodes.forEach( (item) => {
        nuevoArreglo.push(String.fromCharCode(item));
    })
    
    //Concatenamos el nuevo areglo y lo asignamos al pasteFiltrado
    let pasteFiltrado = nuevoArreglo.join("");

    //Obtener posición actal del cursor
    const posicionInicial = input.selectionStart;
    const posicionFinal = input.selectionEnd;
    const textoActual = input.value;
    let textoAntes =  textoActual.substring(0, posicionInicial);
    let textoDespues = textoActual.substring(posicionFinal, textoActual.length);

    //Se añade el pasteFiltrado en la posición actual del cursor
    input.value = textoAntes + pasteFiltrado + textoDespues;

    //Colocarse al final del texto insertado.
    input.selectionStart = input.selectionEnd = posicionInicial + pasteFiltrado.length;
}


function buscarClave(mensaje, inicio, clave, letra){
    let antes, despues;
    let extracto = mensaje.substring(inicio, inicio + clave.length);

    if (mensaje.length >= (inicio + clave.length)) {
        if (extracto == clave){
            antes = mensaje.substring(0,inicio);
            despues = mensaje.substring(inicio + clave.length, mensaje.length); 
            return antes + letra + despues; 
        } 
    }
    return mensaje;
}

function iniciar(){
    // Ocultamos el aviso de "ningún mensaje encontrado"
    aviso.style.visibility = "hidden";

    // Mostramos el botón oculto de copiar
    botonCopiar.style.display = "block";
}