const a = "ai";
const e = "enter";
const i = "imes";
const o = "ober";
const u = "ufat"
let codigo;
let letra;

addEventListener("keypress", validarTeclas);
addEventListener("paste", validarPaste);

function encriptar(){
    console.log(e.key);
    console.log(e);
}

function validarTeclas(e){
    codigo = e.charCode;
    letra = e.key;

    // Aquí verificamos que las teclas sean del abcdario en minusculas, la letra ñ o espacio. Si no lo son, se previene la ejecución el evento. 
    if ((codigo >= 97 && codigo <=122) || codigo == 241 || codigo == 32){
            
    } else {
        e.preventDefault();
    }
}

function validarPaste(e){
    e.preventDefault();
    let paste = (e.clipboardData || window.clipboardData).getData("text");

    console.log(typeof(paste))

}

