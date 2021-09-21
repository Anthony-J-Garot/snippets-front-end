/*
 * Added input such that I can use as a noisy placeholder.
 * A wrapper to console.log() can be handy because I could conceivably
 * turn off all logging right here.
 */

type Noop = (msg?: string) => void;
export const noop: Noop = (msg = ''): void => {
  if (msg) {
    console.log('NOOP: ', msg);
  }
};

export const isBrowser = (): boolean => {
  // console.log('isBrowser: ', process.title);
  return (typeof window !== 'undefined');
};

// Timeout for promise to be fulfilled.
// I got these ms times from an online example.
// I haven't optimized them.
type TResolve = (value: unknown) => void;
export const promiseTimeout = (resolve: TResolve): void => {
  setTimeout(resolve, 200 + (Math.random() * 300));
};
