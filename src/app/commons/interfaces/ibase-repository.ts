export interface IBaseRepository<TDomain>{

    // Find an entity by id
    findById(id:string):Promise<TDomain>;

    // Find all entities
    findAll():Promise<TDomain[]>;

    // Create a new entity
    save(object: TDomain):Promise<TDomain>;

    // Deletes an entity from the database
    delete(id:string):Promise<void>;

    // Updates an entity in the database
    update(object:TDomain):Promise<TDomain>;

}