export const DEFAULT_PORT = 3000;
export const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

export type Environment = (typeof ENVIRONMENTS)[number];
