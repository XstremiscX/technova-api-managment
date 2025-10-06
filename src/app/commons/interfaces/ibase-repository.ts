
// Base interface for defining generic methods that will be found in most repositories.
export interface IBaseRepository<TDomain>{

    // Find an entity by id
    findById(id:string):Promise<TDomain>;

    // Create a new entity
    save(object: TDomain):Promise<TDomain>;

    // Deletes an entity from the database
    delete(id:string):Promise<void>;

    // Updates an entity in the database
    update(object:TDomain):Promise<TDomain>;

    // Retrieves all entities from the database
    findAll():Promise<TDomain[]>;

}