// server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8081 });  // Portu 8080 yerine 8081 yaptık

console.log("WebSocket sunucusu 8081 portunda başladı");

wss.on('connection', ws => {
    console.log('Telefon bağlandı');

    ws.on('message', msg => {
        console.log('Komut geldi:', msg);

        // Tüm bağlı clientlara gönder (çark sayfası dinliyor)
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(msg);
            }
        });
    });
});
