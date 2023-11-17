import 'reflect-metadata';

import api from './api';

api.instance.get('/', async (request, reply) => {
    return reply.send({
        message: '⚔️ Hello from osrsclan!'
    })
})

api.instance.listen({
    port: 8080
})
