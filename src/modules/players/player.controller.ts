import { FastifyReply, FastifyRequest } from 'fastify';
import { Service } from 'typedi';

import { Controller, HttpGet, Policy } from '../../decorators';
import { ViewPlayersPolicy } from './policies/view-players.policy';

@Service()
@Controller('/players', { authenticate: true })
export class PlayerController {

    @HttpGet('')
    @Policy(ViewPlayersPolicy)
    public index(request: FastifyRequest, reply: FastifyReply) {
        return reply.send({
            test: true
        })
    }
}