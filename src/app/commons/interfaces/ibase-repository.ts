export interface IBaseRepository<T>{

    // Find an entity by id
    findById(id:string):Promise<T>;

    // Find all entities
    findAll():Promise<T[]>;

    // Create a new entity
    save(object: T):Promise<T>;

    // Deletes an entity from the database
    delete(id:string):Promise<void>;

    // Updates an entity in the database
    update(object:T):Promise<T>;

}