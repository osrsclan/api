import { FastifyReply, FastifyRequest } from 'fastify';
import { Service } from 'typedi';

import { Controller, HttpGet } from '../../decorators';

@Service()
@Controller('/clans')
export class ClanController {
    constructor() {
        //
    }

    @HttpGet('')
    public index(request: FastifyRequest, reply: FastifyReply): FastifyReply {
        return reply.send({
            test: request.query
        });
    }
}