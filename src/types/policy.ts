import { FastifyRequest, RouteGenericInterface } from 'fastify';

export abstract class Policy<TRequest extends RouteGenericInterface = Partial<RouteGenericInterface>> {
    protected request: FastifyRequest<TRequest>;

    constructor(request: FastifyRequest<TRequest>) {
        this.request = request;
    }

    abstract can(): Promise<boolean>;
}