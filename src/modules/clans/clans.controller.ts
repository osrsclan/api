import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller } from '../../decorators/controller';
import { HttpGet } from '../../decorators/http-methods';
import { Service } from 'typedi';

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