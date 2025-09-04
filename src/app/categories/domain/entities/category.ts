import { BadRequestException } from "@nestjs/common";

// Domain entity representing a Category with its business rules encapsulated
export class Category {

    constructor(
        public readonly _id: string,
        private _name: string,
        private _description: string,
    ) {
        // Initializes the category with validated name and description
        this.setName(_name);
        this.setDescription(_description);
    }

    // Validates that the name is not empty or undefined
    private validateName(name: string): void {
        if (!name || name.trim().length === 0) {
            throw new BadRequestException("Category name must be different from undefined");
        }
    }

    // Validates that the description is not empty or undefined
    private validateDescription(description: string): void {
        if (!description || description.trim().length === 0) {
            throw new BadRequestException("Category description must be different from undefined");
        }
    }

    // Applies validation and sets the internal name
    private setName(name: string): void {
        this.validateName(name);
        this._name = name;
    }

    // Applies validation and sets the internal description
    private setDescription(description: string): void {
        this.validateDescription(description);
        this._description = description;
    }

    // Returns the category name
    getName(): string {
        return this._name;
    }

    // Returns the category description
    getDescription(): string {
        return this._description;
    }

    // Public method to rename the category, reusing internal validation
    rename(newName: string): void {
        this.setName(newName);
    }

    // Public method to change the description, reusing internal validation
    changeDescription(newDescription: string): void {
        this.setDescription(newDescription);
    }
}
