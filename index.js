/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
        /* global resultado */

        let selecciones = [];
        let selec = [];
        let parejas =[];
               
        function Dados() {
            dados = ['<i class="bi bi-dice-1-fill"></i>','<i class="bi bi-dice-2-fill"></i>','<i class="bi bi-dice-3-fill"></i>',
                '<i class="bi bi-dice-4-fill"></i>','<i class="bi bi-dice-5-fill"></i>','<i class="bi bi-dice-6-fill"></i>', 
                '<i class="bi bi-emoji-dizzy-fill"></i>'];
        }
        

        function generarTablero() {
            nuevo_juego();
            Dados(); // se cargan los iconos en el tablero
            let tablero = document.getElementById("tablero");// se llama al elemento tablero
            let cartas = [];// se crea un array de cartas en blanco
            for (let i = 0; i < 14 ; i++) { // se genera el tablero 
                // push permite añadir mas elementos al array cartas
                // a cada carta se le da un id con el nombre carta y # de la iteracion
                cartas.push(`
                <div class="carta" id="carta${i}" onclick="seleccionarCarta(${i})">
                    <div class="cara atras" id="atras${i}">
                        ${dados[0]}
                    </div>
                    <div class="cara adelante">
                        <i class="bi bi-file-lock"></i>
                    </div>
                </div>
                `); 
                if (i % 2 === 1) {
                    dados.splice(0,1); // splice elimina 1 elemento desde la posicion 0                
                }
            }
            cartas.sort(() => Math.random() - 0.5); // desorganiza las cartas 
            tablero.innerHTML = cartas.join(" "); // join une los elementos de una matriz 
        }
        
        
        function seleccionarCarta(i) {
            // se hace esta funcion con el indice i porque cada carta esta creada con
            // una determinada iteracion 
            let move=document.getElementById('move');
            let carta = document.getElementById("carta" + i); // se llama a la carta por iteracion
            // la propiedad style.transform rota un elemento div 
            if (carta.style.transform !== "rotateX(180deg)") {
                carta.style.transform = "rotateX(180deg)"; // si la carta no esta rotada entonces que la rote 180°
                selecciones.push(i); // y la añada al array vacio de selecciones 
                selec.push(i); // movimientos
                move.innerHTML=selec.length;    
                if  (selec.length === 20 ) {     
                    alert('PERDISTEEEEEEEE!');
                    reiniciar();                 
                }
            
            if (selecciones.length === 2) {
                deseleccionar(selecciones); // si hay mas de 2 cartas seleccionadas deseleccionar
                selecciones = []; // y que nuevamente quede vacia el array selecciones
            }
            
        }
    }
        
        
        function deseleccionar(selecciones) {
            setTimeout(() => {
                let resultado=document.getElementById('resultado');
                let atras1 = document.getElementById("atras" + selecciones[0]); // se llama a la parte de atras de la carta por iteracion y la posicion 0 de la seleccion
                let atras2 = document.getElementById("atras" + selecciones[1]); // se llama  a la otra y su posicion
                if (atras1.innerHTML === atras2.innerHTML) { //si lo que se muestra es igual
                    atras1.style.background = "#ccac00"; // si son iguales entonces que el fondo se vuelva de determinado color
                    atras2.style.background = "#ccac00";
                    parejas.push('atras1'); // contador  
                    resultado.innerHTML=parejas.length;  
                    if  (parejas.length === 7 ) {;
                        resultado.textContent = 'Felicidades encontraste todas las parejas!';
                        alert('GANASTEEEEEEEE!');
                        reiniciar();
                    }
                }else{
                    let carta1 = document.getElementById("carta" + selecciones[0]); // se llama a la carta otra vez
                    let carta2 = document.getElementById("carta" + selecciones[1]);
                    carta1.style.transform = "rotateX(0deg)"; // y vuelva a la posicion inicial de 0°
                    carta2.style.transform = "rotateX(0deg)";
                }
            }, 1000);
        }
        
        
        function nuevo_juego(){
            let move=document.getElementById('move');
            let resultado=document.getElementById('resultado');
            if ((selec.length < 20 ) && (parejas.length === 7 )) {
                selec = [];
                parejas = [];
                move.textContent = ' 0';
                resultado.textContent = ' 0';
            } else if ((selec.length < 20 )&&(parejas.length < 7)){
                selec = [];
                parejas = [];
                move.textContent = ' 0';
                resultado.textContent = ' 0';
            }
        }


        function reiniciar() {
            let resultado=document.getElementById('resultado');
            if  ((selec.length === 20 ) && (parejas.length < 7 ) ) { 
                selec = [];
                parejas = [];
                generarTablero(); 
                resultado.textContent = ' 0';
            } else if ((selec.length < 20 ) && (parejas.length === 7 )) {
                selec = [];
                parejas = [];
            }
        }
        

        
           
        
        
        
