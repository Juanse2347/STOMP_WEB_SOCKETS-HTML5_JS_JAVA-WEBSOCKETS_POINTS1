var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var stompClient = null;
var drawingId = null;

function connect() {
    drawingId = document.getElementById("drawingId").value;
    if (!drawingId) {
        alert("Ingrese un ID de dibujo válido.");
        return;
    }

    var socket = new SockJS("http://localhost:8080/stomp-endpoint"); // ✅ RUTA CORRECTA
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
        console.log("✅ Conectado: " + frame);
        let topic = "/topic/newpoint." + drawingId;

        stompClient.subscribe(topic, function (message) {
            var point = JSON.parse(message.body);
            drawPoint(point.x, point.y);
        });
    });
}

function drawPoint(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "red";  // Asegurar que el color de relleno es rojo
    ctx.fill();  // Llenar el círculo
    ctx.strokeStyle = "red"; // Asegurar que el borde también es rojo (opcional)
    ctx.stroke();  // Dibujar el borde
}



canvas.addEventListener("click", function (event) {
    if (!stompClient || !drawingId) {
        alert("Debe conectarse a un dibujo primero.");
        return;
    }

    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    var point = { x: x, y: y };
    let destination = "/app/newpoint/" + drawingId;

    console.log("📤 Enviando punto a WebSocket:", point);
    stompClient.send(destination, {}, JSON.stringify(point));

    drawPoint(x, y);
});



