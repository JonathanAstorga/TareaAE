const TARGET_URL = 'http://localhost:8190/Servidor'; 
    const INTERVAL_MS = 1000;
    let intervalId = null;
    const logsElement = document.getElementById('logs');

    async function enviaPeticiones() {
        const clientId = 'CLIENTE_WEB_' + Math.floor(Math.random() * 1000);
        const timestamp = new Date().toLocaleTimeString();

        try {
            const response = await fetch(`${TARGET_URL}?clientId=${clientId}`);
            const data = await response.text();
            logsElement.innerHTML += `<p><strong>[${timestamp}]</strong> ${data}</p>`;
            logsElement.scrollTop = logsElement.scrollHeight;
        } catch (error) {
            logsElement.innerHTML += `<p><strong>[${timestamp}]</strong> × Error: ${error.message}</p>`;
        }
    }

    document.getElementById('btnStart').addEventListener('click', () => {
        if (!intervalId) {
            intervalId = setInterval(enviaPeticiones, INTERVAL_MS);
            logsElement.innerHTML += `<p>¤ <em>Iniciando peticiones cada ${INTERVAL_MS}ms...</em></p>`;
        }
    });

    document.getElementById('btnStop').addEventListener('click', () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            logsElement.innerHTML += `<p>» <em>Peticiones detenidas</em></p>`;
        }
    });