var stompClient = null;

function connect() {
    var socket = new SockJS('http://localhost:8080/ws');
    stompClient = Stomp.over(socket);

    stompClient.connect({}gi, function (frame) {
        console.log('Conectado: ' + frame);

        // Suscribirse a la ruta de mensajes
        stompClient.subscribe('/topic/messages', function (message) {
            console.log('Mensaje recibido: ' + message.body);
            showMessage(JSON.parse(message.body));
        });
    });
}

function sendMessage() {
    var msg = document.getElementById("message").value;
    stompClient.send("/app/sendMessage", {}, JSON.stringify(msg)); // Enviar mensaje
}

function showMessage(message) {
    var messages = document.getElementById("messages");
    var p = document.createElement("p");
    p.appendChild(document.createTextNode(message));
    messages.appendChild(p);
}

window.onload = function () {
    connect();
};
