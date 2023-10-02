const isBrowser = () => typeof window !== 'undefined';

export const getEnv = () => isBrowser() ? (window as any).ENV : process.env