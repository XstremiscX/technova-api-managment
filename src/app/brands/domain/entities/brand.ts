import { BadRequestException } from "@nestjs/common";

// Domain entity representing a Brand with its business rules encapsulated
export class Brand {

    constructor(
        public readonly _id: string,
        private _name: string
    ) {
        // Initializes the brand name with validation and formatting
        this.setName(_name);
    }

    // Validates that the brand name is not empty or just whitespace
    private validateName(name: string): void {
        if (!name || name.trim().length === 0) {
            throw new BadRequestException("Brand name cannot be empty");
        }
    }

    // Applies validation and formatting to the brand name
    private setName(name: string): void {
        this.validateName(name);
        this._name = name.trim().toUpperCase();
    }

    // Public method to rename the brand, reusing internal validation
    rename(newName: string): void {
        this.setName(newName);
    }

    // Returns the formatted brand name
    getName(): string {
        return this._name;
    }
}
