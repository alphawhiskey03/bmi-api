/* eslint-disable no-unused-vars*/

import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

/* By using the declare module syntax, 
you can provide type declarations 
for external modules that don't have native TypeScript 
support or don't provide their own type definitions. 
This allows you to use these modules in your TypeScript 
codebase while still benefiting from type checking and autocompletion. */

type UserId = string;
declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
    };
  }
}
