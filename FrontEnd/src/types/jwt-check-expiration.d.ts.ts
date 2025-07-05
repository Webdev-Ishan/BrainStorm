// types/jwt-check-expiration.d.ts (or any .d.ts file in your project)

declare module 'jwt-check-expiration' {
  export function isJwtExpired(token: string): boolean;
}
