import { Constructable } from '../types';

export function Controller(route?: string, options?: { authenticate?: boolean }): (target: Constructable) => void {
    return function<T extends Constructable>(target: T) {
        Reflect.defineMetadata('osrsclan-api:controller', { route, authenticate: options?.authenticate }, target.prototype);
    }
}