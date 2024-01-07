var rondaActual = 1;//number
var maximaRonda = 1;//number
var ultimaRonda = 1;//number
var dificultad = 1;//0:facil,1:medio,2:dificil
var idioma = 0;//0:ingles,1:español
var formaCasilla = 0;//number
var timeTemporizador;//[number,number] / undefined
let temporizador;//interval
function inicializarPartida() {
    actualizarTemporizador(100)
    document.querySelector('#subindice').innerHTML = ''
    temporizador = setInterval(() => {
        timeTemporizador[0] -= 0.5
        const progreso = (timeTemporizador[0] * 100) / timeTemporizador[1]
        actualizarTemporizador(progreso)
        if (timeTemporizador[0] <= 0) {//terminado
            actualizarTemporizador(0)
            finJuego()
        }
    }, 500);
}
function generarCasillas() {
    const datosRonda = generarDatosRonda()//[number,[number,number]]
    const coloresCasillas = generarColores(datosRonda[0], datosRonda[1])//[strings,number]
    //generar casillas
    const formaCasilla = obtenerFormaCasilla()
    let casillas = new Array(datosRonda[0]).fill(formaCasilla)
    for (let i = 0; i < casillas.length; i++) {
        casillas[i] = casillas[i].replaceAll('{color}', coloresCasillas[0][i])
        if (i == coloresCasillas[1]) {//casilla color modificado
            casillas[i] = casillas[i].replaceAll(`id=""`, `id="casilla-modificada"`)
        }
    }
    //mostrar casillas
    document.querySelector('#partida').innerHTML = ""
    casillas.forEach((item) => {
        document.querySelector('#partida').innerHTML += item
    })
    //interacciones de las casillas
    document.querySelectorAll('.casilla').forEach((item) => item.addEventListener('click', () => {
        if (rondaActual == 1 || timeTemporizador[0] > 0) {
            if (item.id == 'casilla-modificada') {
                rondaGanada()
            }
            else {//penalizacion
                timeTemporizador[0] -= 1.5
                const progreso = (timeTemporizador[0] * 100) / timeTemporizador[1]
                actualizarTemporizador(progreso)
                if (timeTemporizador[0] <= 0) {//terminado
                    actualizarTemporizador(0)
                    finJuego()
                }
            }
        }
    }))
}
function generarDatosRonda() {
    //cantidad casillas y dificultad(rango)
    let cantidadCasillas;
    let diferenciaColor;//[max,min]
    if (rondaActual == 1) {
        cantidadCasillas = 3
        if (dificultad == 2) {
            diferenciaColor = [35, 35]
        }
        else if (dificultad == 1) {
            diferenciaColor = [40, 40]
        }
        else {
            diferenciaColor = [55, 65]
        }
        timeTemporizador = undefined
    }
    else if (rondaActual > 1 && rondaActual <= 4) {
        cantidadCasillas = 4
        if (dificultad == 2) {
            diferenciaColor = [35, 28]
        }
        else if (dificultad == 1) {
            diferenciaColor = [40, 32]
        }
        else {
            diferenciaColor = [48, 38]
        }
        timeTemporizador = [7, 7]
    }
    else if (rondaActual > 4 && rondaActual <= 7) {
        cantidadCasillas = 6
        diferenciaColor = [32, 25]
        if (dificultad == 2) {
            diferenciaColor = [30, 24]
        }
        else if (dificultad == 1) {
            diferenciaColor = [35, 26]
        }
        else {
            diferenciaColor = [40, 30]
        }
        timeTemporizador = [7, 7]
    }
    else if (rondaActual > 7 && rondaActual <= 9) {
        cantidadCasillas = 8
        if (dificultad == 2) {
            diferenciaColor = [26, 20]
        }
        else if (dificultad == 1) {
            diferenciaColor = [30, 23]
        }
        else {
            diferenciaColor = [36, 27]
        }
        timeTemporizador = [7, 7]
    }
    else if (rondaActual > 9 && rondaActual <= 13) {
        cantidadCasillas = 9
        if (dificultad == 2) {
            diferenciaColor = [22, 15]
        }
        else if (dificultad == 1) {
            diferenciaColor = [26, 20]
        }
        else {
            diferenciaColor = [34, 25]
        }
        timeTemporizador = [8, 8]
    }
    else if (rondaActual > 13 && rondaActual <= 20) {
        cantidadCasillas = 16
        cantidadCasillas = 9
        if (dificultad == 2) {
            diferenciaColor = [18, 14]
        }
        else if (dificultad == 1) {
            diferenciaColor = [22, 16]
        }
        else {
            diferenciaColor = [27, 22]
        }
        timeTemporizador = [10, 10]
    }
    else if (rondaActual > 13 && rondaActual <= 20) {
        cantidadCasillas = 16
        cantidadCasillas = 9
        if (dificultad == 2) {
            diferenciaColor = [22, 16]
        }
        else if (dificultad == 1) {
            diferenciaColor = [19, 18]
        }
        else {
            diferenciaColor = [23, 25]
        }
        timeTemporizador = [11, 11]
    }
    else if (rondaActual > 20 && rondaActual <= 25) {
        cantidadCasillas = 25
        cantidadCasillas = 9
        diferenciaColor = [18, 15]
        if (dificultad == 2) {
            diferenciaColor = [20, 15]
        }
        else if (dificultad == 1) {
            diferenciaColor = [22, 17]
        }
        else {
            diferenciaColor = [25, 24]
        }
        timeTemporizador = [12, 12]
    }
    else if (rondaActual > 25) {
        cantidadCasillas = 30
        cantidadCasillas = 9
        if (dificultad == 2) {
            diferenciaColor = [16, 13]
        }
        else if (dificultad == 1) {
            diferenciaColor = [19, 15]
        }
        else {
            diferenciaColor = [23, 23]
        }
        timeTemporizador = [14, 14]
    }

    return [cantidadCasillas, diferenciaColor]
}
function generarColores(cantidad = 0, diferencia = 0) {
    if (cantidad > 1 && diferencia.length > 0) {
        //generar casillas con un color comun en hsl
        const colorPrincipal = [Math.floor(Math.random() * 360), Math.floor(Math.random() * (100 - 55 + 1) + 55), Math.floor(Math.random() * (80 - 25 + 1) + 25)]
        let coloresGenerados = new Array(cantidad).fill(`hsl(${colorPrincipal[0]},${colorPrincipal[1]}%,${colorPrincipal[2]}%)`)
        //generar color modificado
        let colorModificado = colorPrincipal
        //h
        const diferenciaDificultadH = [7, 3.5, 2]
        if (Math.round(Math.random() * 1) == 1) {//sumar
            let colorModificadoH = colorModificado[0] + (Math.random() * diferenciaDificultadH[dificultad])
            if (colorModificadoH > 360) { colorModificadoH -= 360 }
            colorModificado[0] = colorModificadoH
        }
        else {//restar
            let colorModificadoH = colorModificado[0] - (Math.random() * diferenciaDificultadH[dificultad])
            if (colorModificadoH < 0) { colorModificadoH += 360 }
            colorModificado[0] = colorModificadoH
        }
        //s
        if (Math.round(Math.random() * 1) == 1) {//sumar
            //ajustar diferencias
            const diferenciaMaximaS = (diferencia[0] + colorModificado[1]) > 100 ? (diferencia[0] - ((diferencia[0] + colorModificado[1]) - 100)) : diferencia[0]
            const diferenciaMinimaS = (diferencia[1] + colorModificado[1]) > 100 ? (diferencia[1] - ((diferencia[1] + colorModificado[1]) - 100)) : diferencia[1]

            colorModificado[1] += (Math.random() * (diferenciaMaximaS - diferenciaMinimaS + 1) + diferenciaMinimaS)
        }
        else {//restar
            //ajustar diferencias
            const diferenciaMaximaS = (colorModificado[1] - diferencia[0]) < 55 ? (diferencia[0] - (55 - ((colorModificado[1] - diferencia[0])))) : diferencia[0]
            const diferenciaMinimaS = (colorModificado[1] - diferencia[1]) < 55 ? (diferencia[1] - (55 - ((colorModificado[1] - diferencia[1])))) : diferencia[1]

            colorModificado[1] -= (Math.random() * (diferenciaMaximaS - diferenciaMinimaS + 1) + diferenciaMinimaS)
        }
        //l
        if (Math.round(Math.random() * 1) == 1) {//sumar
            //ajustar diferencias
            const diferenciaMaximaL = (diferencia[0] + colorModificado[2]) > 80 ? (diferencia[0] - ((diferencia[0] + colorModificado[2]) - 80)) : diferencia[0]
            const diferenciaMinimaL = (diferencia[1] + colorModificado[2]) > 25 ? (diferencia[1] - ((diferencia[1] + colorModificado[2]) - 25)) : diferencia[1]

            colorModificado[2] += (Math.random() * (diferenciaMaximaL - diferenciaMinimaL + 1) + diferenciaMinimaL)
        }
        else {//restar
            //ajustar diferencias
            if ((colorModificado[2] - diferencia[0]) < 0) {
                diferencia[0] += colorModificado[2] - diferencia[0]
            }
            if ((colorModificado[2] - diferencia[1]) < 0) {
                diferencia[1] += colorModificado[2] - diferencia[1]
            }
            const diferenciaMaximaS = (colorModificado[2] - diferencia[0]) < 25 ? (diferencia[0] - (25 - ((colorModificado[2] - diferencia[0])))) : diferencia[0]
            const diferenciaMinimaS = (colorModificado[2] - diferencia[1]) < 25 ? (diferencia[1] - (25 - ((colorModificado[2] - diferencia[1])))) : diferencia[1]

            colorModificado[2] -= (Math.random() * (diferenciaMaximaS - diferenciaMinimaS + 1) + diferenciaMinimaS)
        }
        //modificar una de las casillas
        const casillaModificar = Math.trunc(Math.random() * (coloresGenerados.length) + 0)
        coloresGenerados[casillaModificar] = `hsl(${colorModificado[0]},${colorModificado[1]}%,${colorModificado[2]}%)`

        return [coloresGenerados, casillaModificar]
    }
}
function rondaGanada() {
    clearInterval(temporizador)
    rondaActual++
    actualizarTemporizador(100)
    actualizarDatos()
    generarCasillas()
    inicializarPartida()
}
function finJuego() {
    clearInterval(temporizador)
    timeTemporizador = undefined
    const texto = ['restart', 'reiniciar']
    document.querySelector('#subindice').innerHTML = `<button id="reiniciar-bt"style="opacity:0">${texto[idioma]}</button>`
    $("#reiniciar-bt").animate({
        opacity: '1'
    });
    document.querySelector('#reiniciar-bt').addEventListener('click', () => {
        reiniciarJuego()
    })
}
function reiniciarJuego() {
    rondaActual = 1;
    clearInterval(temporizador)
    actualizarDatos(rondaActual)
    actualizarTemporizador(100)
    const textoDificultad = ['easy', 'medium', 'dificult'];
    const estilosMensaje = "width:100%;display:flex;align-items:center;    justify-content: center;font-family: 'Outfit', sans-serif;font-weight:500";
    const texto = ['find it to start', 'encuentralo para comenzar']
    document.querySelector('#subindice').innerHTML = `<div style="${estilosMensaje}"><span id="mensaje-inical" style="text-align:center">${texto[idioma]}<br>${textoDificultad[dificultad]}</span></div>`;
    generarCasillas()
}
function obtenerFormaCasilla() {
    const formasCasilla = {
        0: '    width: 75px;height:75px;border-radius:50%;background:{color}'
    }
    return (`<div class="casilla"id=""style="${formasCasilla[formaCasilla]}"></div>`)
}
function actualizarDatos(UltimaRonda = 1) {
    if (UltimaRonda > maximaRonda) {
        maximaRonda = UltimaRonda
    }
    const texto1 = ['Best round', 'Máxima ronda']
    document.querySelector('#ronda-maxima').innerHTML = `${texto1[idioma]}: <font>${maximaRonda}</font>`
    const texto2 = ['Last round', 'Última ronda']
    document.querySelector('#ronda-ultima').innerHTML = `${texto2[idioma]}: <font>${UltimaRonda}</font>`
    document.querySelector('#ronda-actual').innerHTML = rondaActual
}
function actualizarTemporizador(progreso) {
    if (progreso >= 70) {
        document.querySelector('#temporizador').style.background = "rgb(107, 187, 227)"
    }
    else if (progreso < 70 && progreso >= 50) {
        document.querySelector('#temporizador').style.background = "rgb(88, 214, 141)"
    }
    else if (progreso < 50 && progreso >= 25) {
        document.querySelector('#temporizador').style.background = "rgb(248, 196, 113)"
    }
    else if (progreso < 25 && progreso >= 10) {
        document.querySelector('#temporizador').style.background = "rgb(255, 87, 51)"
    }
    else {
        document.querySelector('#temporizador').style.background = "rgb(192, 57, 43)"
    }
    $("#temporizador").animate({
        width: `${progreso}%`
    }, 500);

}
globalThis.addEventListener('load', () => {
    reiniciarJuego()
    actualizarAjustesDificultad(dificultad)
})
document.querySelectorAll('.modo-tema').forEach((item) => item.addEventListener('click', () => {
    //colores
    const oscuro = 'rgb(28, 28, 28)'
    const claro = 'rgb(255, 255, 255)'
    //elementos
    const $paginaAjustes = document.querySelector('#pagina-ajustes')
    //cambiar temas
    if (document.body.style.background == oscuro) {
        document.body.style.background = claro
        $paginaAjustes.style.background = claro
    }
    else {
        document.body.style.background = oscuro
        $paginaAjustes.style.background = oscuro
    }
}))
let paginaAjustesDesplegada = false
document.querySelectorAll('.panel-ajustes').forEach((item) => item.addEventListener('click', () => {
    if (timeTemporizador == undefined) {
        const $paginaAjustes = $('#pagina-ajustes')
        if (paginaAjustesDesplegada) {
            $paginaAjustes.animate({ right: '-100%' }, 280, function () {
                $paginaAjustes.css('display', 'none');
            })
        }
        else {
            $paginaAjustes.css('display', 'block');
            $paginaAjustes.animate({ right: 0 }, 280)
        }
        paginaAjustesDesplegada = !paginaAjustesDesplegada
    }
}))
//ajustes
function actualizarAjustesDificultad(dificultad) {
    const $facil = document.querySelector('#selecionado-dificultad-facil')
    const $medio = document.querySelector('#selecionado-dificultad-medio')
    const $dificil = document.querySelector('#selecionado-dificultad-dificil')
    if (dificultad == 0) {
        $medio.style.display = "none"
        $dificil.style.display = "none"
        $facil.style.display = "block"
    }
    else if (dificultad == 1) {
        $facil.style.display = "none"
        $dificil.style.display = "none"
        $medio.style.display = "block"
    }
    else {
        $facil.style.display = "none"
        $medio.style.display = "none"
        $dificil.style.display = "block"
    }
}
document.querySelector('#bt-dificultad-facil').addEventListener('click', () => {
    dificultad = 0;
    actualizarAjustesDificultad(dificultad)
})
document.querySelector('#bt-dificultad-medio').addEventListener('click', () => {
    dificultad = 1;
    actualizarAjustesDificultad(dificultad)
})
document.querySelector('#bt-dificultad-dificil').addEventListener('click', () => {
    dificultad = 2;
    actualizarAjustesDificultad(dificultad)
})