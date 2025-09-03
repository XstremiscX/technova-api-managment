import { BadRequestException } from "@nestjs/common";

// This class is the brand domain entity.
export class Brand{

    constructor (
        public readonly _id: string,
        private _name:string
    ){
        this.setName(_name);
    }

    private validateName(name : string) : void {

        if(!name || name.trim().length === 0){
            throw new BadRequestException("Brand name cannot be empty")
        }

    }

    private setName(name : string) : void{
        
        this.validateName(name);

        this._name = name.trim().toUpperCase();

    }

    rename(newName: string) : void{

        this.setName(newName);

    }

    getName() : string{

        return this._name;

    }

}