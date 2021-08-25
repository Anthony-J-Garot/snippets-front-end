
/*
 * Added input such that I can use as a noisy placeholder
 */
type Noop = (msg?: string) => void;
export const noop: Noop = (msg = ''): void => {
  if (msg) {
    console.log(msg);
  }
};
