import { BadRequestException } from "@nestjs/common";
import { BussinessError } from "src/app/commons/error_management/bussines errors/bussines-error";

// Domain entity representing a Category with its business rules encapsulated
export class Category {

    constructor(
        public readonly id: string,
        private name: string,
        private description: string,
    ) {
        // Initializes the category with validated name and description
        this.setName(name);
        this.setDescription(description);
    }

    // Validates that the name is not empty or undefined
    private validateName(name: string): void {
        if (!name || name.trim().length === 0) {
            throw new BadRequestException("Category name must be different from undefined");
        }
    }

    // Validates that the description is not empty or undefined
    private validateDescription(description: string): void {
        if (description.trim().length === 0) {
            throw new BadRequestException("Category description must be different from void");
        }
    }

    // Applies validation and sets the internal name
    private setName(name: string): void {
        this.validateName(name);
        this.name = name;
    }

    // Applies validation and sets the internal description
    private setDescription(description: string): void {
        this.validateDescription(description);
        this.description = description;
    }

    // Returns the category name
    getName(): string {
        return this.name;
    }

    // Returns the category description
    getDescription(): string {
        return this.description;
    }

    // Public method to rename the category, reusing internal validation
    rename(newName: string): void {

        if(this.name === newName) throw new BussinessError("The new name and the current name must be differents.");

        this.setName(newName);

    }

    // Public method to change the description, reusing internal validation
    changeDescription(newDescription: string): void {
        this.setDescription(newDescription);
    }
    
}
