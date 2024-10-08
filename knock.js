import { createServer } from 'net';

const setupFlagServer = () => {
    const server = createServer((connection) => {
        connection.on('data', (data) => {
            const message = data.toString().trim();
            if (message === 'KNOCK_KNOCK') {
                connection.write('CTF{Nutty_Nibbles}\n');
            } else {
                connection.write('Try again!\n');
            }
            connection.end(); // Close the connection after responding
        });
    });

    server.listen(31337, '0.0.0.0', () => {
        console.log('Server listening on port 31337');
    });
};

setupFlagServer();
