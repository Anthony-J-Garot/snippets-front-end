/*
 * Immutable constants
 */

// Use 3, Noop user, for AnonymousUser, because there is an actual DB entry for it.
export const PUBLIC_USER = {id: 3, username: 'AnonymousUser'};
// This will freeze it into a constant, which may save you grief later.
// By grief I mean that using PUBLIC_USER as an initial value, instead of .assign({}, PUBLIC_USER)
// can lead to very bad things.
Object.defineProperty(PUBLIC_USER, 'id', {
  value: 3,
  writable: false,
  enumerable: true,
  configurable: true
});
Object.defineProperty(PUBLIC_USER, 'username', {
  value: 'AnonymousUser',
  writable: false,
  enumerable: true,
  configurable: true
});
