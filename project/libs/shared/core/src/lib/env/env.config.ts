export const DEFAULT_PORT = 3000;
export const DEFAULT_MONGO_PORT = 27017;
export const DEFAULT_RABBIT_PORT = 5672;
export const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

export type Environment = (typeof ENVIRONMENTS)[number];
