const TARGET_URL = 'http://IP_O_DOMINIO_DEL_BALANCEADOR'; // Reemplaza con la IP/dominio de tu NGINX
    const INTERVAL_MS = 1000;
    let intervalId = null;
    const logsElement = document.getElementById('logs');

    // Enviar peticiones
    async function enviaPeticiones() {
        try {
            const clienteId = 'CLIENTE_WEB_' + Math.floor(Math.random() * 1000);
            const timestamp = new Date().toLocaleTimeString();
            const response = await fetch(`${TARGET_URL}?clientId=${clientId}`);
            const data = await response.text();


            logsElement.innerHTML += `
                <p><strong>[${timestamp}]</strong> ■ <code>${clientId}</code>: ${data}</p>
            `;
            logsElement.scrollTop = logsElement.scrollHeight;
        } catch (error) {
            logsElement.innerHTML += `
                <p><strong>[${new Date().toLocaleTimeString()}]</strong> × Error: ${error.message}</p>
            `;
        }
    }

    document.getElementById('btnStart').addEventListener('click', () => {
        if (!intervalId) {
            intervalId = setInterval(sendRequest, INTERVAL_MS);
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