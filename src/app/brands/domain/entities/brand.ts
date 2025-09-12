import { BadRequestException } from "@nestjs/common";
import { v4 as uuid } from "uuid";

// Domain entity representing a Brand with its business rules encapsulated
export class Brand {

    constructor(
        private name: string,
        public readonly id?: string
    ) {
        // Initializes the brand name with validation and formatting
        this.setName(name);
        this.id = id ? id : uuid();
    }

    // Validates that the brand name is not empty or just whitespace
    private validateName(name: string): void {
        if (!name || name.trim().length === 0) {
            throw new BadRequestException("Brand name cannot be empty");
        }
    }

    // Applies validation and formatting to the brand name
    private setName(name: string): boolean | void {
        this.validateName(name);
        this.name = name.trim().toUpperCase();
    }

    // Public method to rename the brand, reusing internal validation
    rename(newName: string): void {
        // Validates that the new name is actually different from the current one
        if(this.name === newName.toUpperCase()) {
            throw new BadRequestException("The new name must be different from the current name.");
        }
        this.setName(newName);
    }

    // Returns the formatted brand name
    getName(): string {
        return this.name;
    }
}
