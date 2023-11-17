import { HTTPMethods, RouteShorthandOptions } from 'fastify';

const httpMethods: HTTPMethods[] = [
    'GET', 'PUT', 'POST', 'DELETE'
];

type HandlerOptions = RouteShorthandOptions & { authenticate?: boolean }

function factory(methods: HTTPMethods | HTTPMethods[], url: string, options?: HandlerOptions) {
    return function (target: object, propertyKey: string | symbol): void {
        const method = typeof methods === 'string'|| (Array.isArray(methods) && methods.length > 0) ? methods : httpMethods;

        Reflect.defineMetadata('osrsclan-api:handler', { url, method, ...options }, target, propertyKey);

        if (Reflect.hasMetadata('osrsclan-api:handlers', target)) {
            const handlers: Set<string> = Reflect.getMetadata('osrsclan-api:handlers', target);
            handlers.add(propertyKey.toString());
            return;
        } 

        Reflect.defineMetadata('osrsclan-api:handlers', new Set([propertyKey]), target);
    }
}

export function HttpGet(route: string, options?: HandlerOptions) {
    return factory('GET', route, options);
}

export function HttpPut(route: string, options?: HandlerOptions) {
    return factory('PUT', route, options);
}

export function HttpPost(route: string, options?: HandlerOptions) {
    return factory('POST', route, options);
}

export function HttpDelete(route: string, options?: HandlerOptions) {
    return factory('DELETE', route, options);
}