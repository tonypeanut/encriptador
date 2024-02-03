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

}

