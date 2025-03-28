var stompClient = null;

// Conectar al WebSocket STOMP
function connect() {
    var socket = new SockJS('/stompendpoint');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);

        // Suscribirse al tópico "/topic/newpoint"
        stompClient.subscribe('/topic/newpoint', function (message) {
            var theObject = JSON.parse(message.body); // Convertir mensaje a JSON
            alert("Nuevo punto recibido: X = " + theObject.x + ", Y = " + theObject.y);
        });
    });
}

// Enviar punto ingresado en los campos X y Y
function sendPoint() {
    var x = document.getElementById("xCoord").value;
    var y = document.getElementById("yCoord").value;

    var point = { x: parseInt(x), y: parseInt(y) };

    // Publicar el punto en el tópico "/topic/newpoint"
    stompClient.send("/topic/newpoint", {}, JSON.stringify(point));

    // Dibujar el punto en el canvas localmente
    drawPoint(point.x, point.y);
}

// Dibujar un punto en el canvas
function drawPoint(x, y) {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();
}

// Conectar WebSocket al cargar la página
window.onload = connect;
