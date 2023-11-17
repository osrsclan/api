import { FastifyReply, FastifyRequest } from 'fastify';
import { Service } from 'typedi';

import { Controller } from '../../decorators/controller';
import { HttpGet } from '../../decorators/http-methods';
import { Policy } from '../../decorators/policy';
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