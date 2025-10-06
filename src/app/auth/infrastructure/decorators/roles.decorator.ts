import { SetMetadata } from "@nestjs/common";

// Custom decorator to assign roles to route handlers for authorization
export const Roles=(...roles: string[]) => SetMetadata('roles',roles);