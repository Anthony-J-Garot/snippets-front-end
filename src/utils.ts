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

  if (process.title === 'browser') {
    return true;
  } else if (process.title.substring(process.title.length - 4) === 'node') {
    // node test runner, e.g.
    // /home/anthony/.nvm/versions/node/v14.17.5/bin/node
    return false;
  } else {
    // For now, give some sort of error. I don't know how reliable
    // 'browser' is for all possible environments.
    console.error('Unknown process title; assuming test runner.');
    return false;
  }
};

// Timeout for promise to be fulfilled.
// I got these ms times from an online example.
// I haven't optimized them.
type TResolve = (value: unknown) => void;
export const promiseTimeout = (resolve: TResolve): void => {
  setTimeout(resolve, 200 + (Math.random() * 300));
};
