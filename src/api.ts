import fastify, { FastifyInstance } from 'fastify';

import { bootstrap } from './bootstrap';

class Api {
    public instance: FastifyInstance;

    /**
     * Construct the API class.
     */
    constructor() {
        this.instance = fastify();

        this.instance.register(bootstrap);
    }
}

export default new Api();