import { FastifyInstance, FastifyReply, FastifyRequest, HookHandlerDoneFunction, RouteGenericInterface } from 'fastify';
import Container from 'typedi';

import routes from './config/routes';

import { Policy } from './types/policy';

/**
 * Bootstrap the application, register all controllers from the configuration.
 */
export async function bootstrap(instance: FastifyInstance) {
    const controllers = routes
        .filter(controller => controller.prototype && Reflect.hasMetadata('osrsclan-api:controller', controller.prototype))
        .map(async controller => {
            let controllerInstance: object;
            const controllerMetaData = Reflect.getMetadata('osrsclan-api:controller', controller.prototype);

            await instance.register(async f => {
                controllerInstance = Container.get(controller);

                const httpHandlers = Reflect.getMetadata('osrsclan-api:handlers', controller.prototype);

                if (httpHandlers) {
                    httpHandlers.forEach((key: string) => {
                        const options = Reflect.getMetadata('osrsclan-api:handler', controllerInstance, key);
                        const policy = Reflect.getMetadata('osrsclan-api:policy', controllerInstance, key);

                        const preHandlers = [];

                        if (controllerMetaData.authenticate === true || options.authenticate === true) {
                            preHandlers.push((request: FastifyRequest<{ Querystring: { name: string }}>, reply: FastifyReply, done: HookHandlerDoneFunction) => {
                                // TODO: Implement actual JWT functionality here.
                                if (request.query.name !== 'arvcork') {
                                    return reply.send({message: 'Unauthorized'}).code(401);
                                }

                                done();
                            });
                        }

                        if (policy !== undefined) {
                            const resolvePolicy = async (request: FastifyRequest, reply: FastifyReply) => {
                                const policyClass: Policy<RouteGenericInterface> = new policy.policyClass(request);

                                if (! await policyClass.can()) {
                                    return reply.send({message: 'Not found'}).code(404);
                                }
                            }

                            preHandlers.push(resolvePolicy);
                        }

                        f.route({ ...options, preHandler: preHandlers, handler: controller.prototype[key].bind(controllerInstance) })
                    });
                }
            }, { prefix: controllerMetaData?.route || '/' });

            return controllerInstance!;
        });

        return {
            controllers: await Promise.all(controllers)
        }
}