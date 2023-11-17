export interface Constructable<T = object> {
  new(...args: unknown[]): T;
}