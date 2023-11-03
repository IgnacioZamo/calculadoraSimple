const root = document.getElementById("root");

//creacion de elementos
const tablero = document.createElement("div");
tablero.classList.add("cuerpoCalculadora");

const visorCalculadora = document.createElement("label");
visorCalculadora.setAttribute("for","numero");
visorCalculadora.classList.add("visorCalculadora")

const inputNumero = document.createElement("input");
inputNumero.setAttribute("type", "number");
inputNumero.setAttribute("name", "numero");
inputNumero.setAttribute("disabled","disabled");
inputNumero.setAttribute("value","0");


const zonaVisorNumeros = document.createElement("div");
zonaVisorNumeros.classList.add("zonaVisorNumeros")

const contenedorBotones = document.createElement("div")
contenedorBotones.classList.add("contenedorBotones")

const zonaNumeros = document.createElement("div");
zonaNumeros.classList.add("zonaNumeros");

const zonaOperaciones = document.createElement("div");
zonaOperaciones.classList.add("zonaOperaciones");


function realizarOperacion (numero1, numero2, operacion){
    switch (operacion){
        case "+":
            return numero1 + numero2;
        case "-":
            return numero1 - numero2;
        case "*":
            return numero1 * numero2;
        case "/":
            return numero1 / numero2;
        default:
            return numero2
    }
}

function actualizarVisor(){
    inputNumero.value = numeroActual;
}


const botones =[1,2,3,4,5,6,7,8,9,0];

const operaciones =["+","-","*","/","="];

let numeroActual =  "";
let operacionActual = "";
let num1 = 0;
let num2 = 0;
let numResultado = 0;

//creacion botones numericos
const creacionBotones = botones.map(function (numero) {
    const btn = document.createElement("button");
    btn.innerText = numero;
    btn.setAttribute("value", numero);
    btn.setAttribute("id",`btnNumero${numero}`)
    btn.classList.add("botoncitoNumeros")
    return btn;
});

creacionBotones.forEach(function (button) {
    button.addEventListener("click", function() {
        const numero = button.getAttribute("value");
        numeroActual += numero;
        inputNumero.value = numeroActual;

    })
zonaNumeros.appendChild(button);
});

//boton reset
const botonReset = document.createElement("button");
botonReset.classList.add("botonReset");
botonReset.innerText="Reset";

//programacion de RESET

botonReset.addEventListener("click",function(){
    num1 = 0;
    num2= 0;
    operacionActual= "";
    numeroActual = "";
    numResultado = 0;
    actualizarVisor();

})


//creacion botones operacionales
const creacionBotonesOperacionales = operaciones.map(function(op) {
    const btnOp = document.createElement("button")
    btnOp.innerText = op;
    btnOp.setAttribute("value",op);
    btnOp.setAttribute("id", `btnOp${op}`)
    btnOp.classList.add("botoncitoOperaciones");
    return btnOp
})

creacionBotonesOperacionales.forEach(function (button) {
    button.addEventListener("click",function(){
        const operacion = button.getAttribute("value");
        // operacionActual = operacion
        
        if (numeroActual !== "") {
            if (operacion === "=") {  // Corrección: Manejar el botón "="
                if (operacionActual !== "") {
                    num2 = parseInt(inputNumero.value);
                    numResultado = realizarOperacion(num1, num2, operacionActual);
                    numeroActual = numResultado;
                    num1 = numResultado;
                    num2 = "";
                    actualizarVisor();
                    operacionActual = "";  // Restablecer la operación actual
                }
            } else {
                if (operacionActual === "") {
                    num1 = parseInt(inputNumero.value);
                    numeroActual = "";
                    operacionActual = operacion;
                } else if (operacionActual !== "") {
                    num2 = parseInt(inputNumero.value);
                    numResultado = realizarOperacion(num1, num2, operacionActual);
                    numeroActual = numResultado;
                    num1 = numResultado;
                    num2 = "";
                    actualizarVisor();
                    operacionActual = operacion;
                }
            }
        }
    });






    zonaOperaciones.appendChild(button);
})


zonaVisorNumeros.appendChild(visorCalculadora);
zonaVisorNumeros.appendChild(inputNumero)

contenedorBotones.appendChild(zonaNumeros);
contenedorBotones.appendChild(zonaOperaciones);

tablero.appendChild(zonaVisorNumeros);
tablero.appendChild(contenedorBotones);
tablero.appendChild(botonReset)

root.appendChild(tablero);