export function Policy(policyClass: unknown) {
    return function (target: object, propertyKey: string | symbol): void {
        Reflect.defineMetadata('osrsclan-api:policy', { policyClass }, target, propertyKey);
    }
}