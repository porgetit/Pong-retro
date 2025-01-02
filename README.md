# PONG Retro

¡Bienvenido/a a **PONG Retro**! Este proyecto es una versión moderna del clásico juego de Pong, con efectos visuales llamativos (estilo neón), power-ups con diferentes efectos y un menú de inicio. Está diseñado para jugarse en el navegador y puede ser fácilmente ampliado o personalizado.

---

## Características

- **Menú de Inicio**:  
  Se incluye un menú principal que permite iniciar el juego con solo pulsar un botón.

- **Efectos Retro-Neón**:  
  Utiliza sombras, degradados y animaciones para dar un estilo futurista y llamativo.

- **Controles Sencillos**:  
  - Jugador 1: **W** (arriba) y **S** (abajo).  
  - Jugador 2: **Flecha arriba** y **Flecha abajo**.  
  - **P** para pausar o reanudar el juego.

- **Sistema de Puntuación**:  
  Cada vez que la pelota supera a una paleta, el jugador contrario anota un punto. Por defecto, el primero en llegar a 5 puntos gana.

- **Power-Ups**:  
  Aparecen de forma aleatoria y otorgan efectos especiales a la pelota:
  - **Speed-Up (rojo)**: Aumenta la velocidad de la pelota en un 50%.  
  - **Straight (azul)**: Bloquea el movimiento vertical (ballSpeedY = 0).  
  - **Reverse (verde)**: Invierte la dirección horizontal de la pelota.  
  - **Dead (morado)**: Aumenta drásticamente la velocidad de la pelota (x5).

- **Mecánica de Victoria**:  
  Al llegar a la puntuación configurada (por defecto 5), se detiene el juego y aparece un mensaje anunciando al ganador. Desde ahí, puedes volver al menú principal y reiniciar la partida.

---

## Cómo Ejecutarlo

1. **Clona o descarga** este repositorio en tu equipo.  
2. Dentro de la carpeta principal, encontrarás tres archivos principales:
   - `index.html`
   - `style.css`
   - `pong.js`
3. **Abre** el archivo `index.html` en tu navegador favorito (Chrome, Firefox, etc.).  
4. Al cargar la página, verás el menú inicial. Presiona el botón **"Iniciar Juego"** y disfruta.

---

## Instrucciones de Juego

1. **Controles**:
   - **Jugador 1**:  
     - Moverse hacia arriba: **W**  
     - Moverse hacia abajo: **S**
   - **Jugador 2**:  
     - Moverse hacia arriba: **Flecha Arriba**  
     - Moverse hacia abajo: **Flecha Abajo**
   - **Pausa**: Presiona **P** para pausar o reanudar el juego.

2. **Objetivo**:  
   Golpear la pelota con tu paleta e impedir que traspase tu lado de la cancha. Cada gol que se anota contra un jugador, suma un punto al otro. El primero que alcance la puntuación máxima configurada (5 por defecto) gana.

3. **Power-Ups**:  
   - Aparecen de forma aleatoria cada cierto tiempo dentro del campo de juego.
   - Al colisionar la pelota con un power-up, se activa un efecto especial que modifica la dinámica de la pelota.

---

## Tecnologías Utilizadas

- **HTML5**: Estructura y semántica de la página.  
- **CSS3**: Estilos, animaciones y efectos de neón.  
- **JavaScript**: Lógica de juego, detección de colisiones, generación de power-ups, etc.

---

## Personalización

Si deseas ajustar la dificultad o realizar cambios, puedes editar variables en el archivo `pong.js`:

- `winningScore`: Puntaje al que hay que llegar para ganar.  
- `ballSpeedX`, `ballSpeedY`: Velocidades iniciales de la pelota.  
- `paddleSpeed`: Velocidad de las paletas.  
- `powerUpInterval`: Frecuencia de aparición de power-ups.

---

## Autoría

- **Autor Principal**: [Kevin Esguerra Cardona](https://github.com/porgetit)  
- **Colaboración & Asistencia de Código**: ChatGPT o1  

Este proyecto fue desarrollado con el objetivo de practicar y aprender sobre la manipulación del DOM, la detección de colisiones y la implementación de eventos en JavaScript, además de trabajar con animaciones y diseño retro en CSS.

¡Gracias por jugar **PONG Retro**! Esperamos que disfrutes de este viaje al pasado con un toque futurista. 

---

### Contacto

Para sugerencias, mejoras o reportes de bugs, no dudes en contactarnos a:  
**Kevin Esguerra Cardona** - [kevin.esguerra@utp.edu.co](mailto:kevin.esguerra@utp.edu.co)

---

¡Disfruta el juego y que gane el mejor!  
**PONG Retro** © 2025
