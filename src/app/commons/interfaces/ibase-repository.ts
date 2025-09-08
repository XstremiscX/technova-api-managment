export interface IBaseRepository<TDomain,TResponse>{

    // Find an entity by id
    findById(id:string):Promise<TResponse>;

    // Create a new entity
    save(object: TDomain):Promise<TResponse>;

    // Deletes an entity from the database
    delete(id:string):Promise<void>;

    // Updates an entity in the database
    update(object:TDomain):Promise<TResponse>;

}