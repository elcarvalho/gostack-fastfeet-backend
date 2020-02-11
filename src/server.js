import express from 'express';

const server = express();

server.use(express.json());

server.get('/', (req, res) => res.json({ message: 'Hello express' }));

server.listen(3333);
