// Agarramos la pantalla, para poder leer y cambiar lo que muestra
const pantalla = document.getElementById('pantalla');

// Variable que guarda el texto completo de la operación (ej: "12+5")
let operacion = '';

// Se ejecuta cuando el usuario hace clic en un número (o en la coma)
function agregarNumero(numero) {
  // Si la pantalla todavía dice "0" (valor inicial), lo reemplazamos
  if (operacion === '' && numero === ',') {
    // Evitamos que la primera tecla presionada sea una coma sola
    return;
  }

  operacion = operacion + numero;
  // Vamos concatenando cada número/coma al texto de la operación

  actualizarPantalla();
}

// Se ejecuta cuando el usuario hace clic en +, -, ×, ÷ o %
function agregarOperador(operador) {
  if (operacion === '') {
    // Si todavía no hay ningún número escrito, no dejamos poner un operador
    return;
  }

  const ultimoCaracter = operacion.slice(-1);
  // .slice(-1) toma el último carácter del texto actual

  const operadores = ['+', '-', '*', '/', '%'];

  if (operadores.includes(ultimoCaracter)) {
    // INVESTIGACIÓN : Si el último carácter YA es un operador, lo reemplazamos por el nuevo para evitar algo como "12++" porque esp sería icnorrecto.
    
    operacion = operacion.slice(0, -1) + operador;
  } else {
    operacion = operacion + operador;
  }

  actualizarPantalla();
}

// Borra solo el último carácter escrito (número u operador)
function borrarUltimo() {
  operacion = operacion.slice(0, -1);
  // .slice(0, -1) devuelve todo el texto MENOS el último carácter

  actualizarPantalla();
}

// Reinicia la calculadora por completo
function reiniciar() {
  operacion = '';
  actualizarPantalla();
}

// Calcula el resultado final al presionar "="
function calcular() {
  try {
    // Antes de calcular, reemplazamos la coma "," por punto "."
    // porque JavaScript necesita el punto para entender los decimales
    const operacionValida = operacion.replace(',', '.');

    const resultado = eval(operacionValida);
    // eval() toma un texto como "12+5" y lo ejecuta como si fuera código matemático real
    // (es una forma simple de calcular, aunque en proyectos grandes se evita por seguridad)

    operacion = resultado.toString();
    // Convertimos el resultado (que es un número) de vuelta a texto,
    // para poder seguir concatenando si el usuario sigue operando

    actualizarPantalla();
  } catch (error) {
    // Si la operación estaba mal escrita (ej: "12++"), eval() lanza un error
    pantalla.textContent = 'Error';
    operacion = '';
  }
}

// Función que simplemente refleja el valor de "operacion" en la pantalla
function actualizarPantalla() {
  pantalla.textContent = operacion === '' ? '0' : operacion;
  // Si "operacion" está vacía, mostramos "0"; si no, mostramos su contenido
}