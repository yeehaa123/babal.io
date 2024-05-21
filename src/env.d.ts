/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference path="../.astro/db-types.d.ts" />

declare namespace App {
  interface Locals {
    auth: {
      isSignedIn: boolean
      userName: import('@clerk/clerk-sdk-node').User['username']

    }
  }
}



