export interface ISellerProductRepository<TDomain>{

    findById(id:string):Promise<TDomain>;

    // Create a new entity
    save(object: TDomain):Promise<TDomain>;

    // Deletes an entity from the database
    softDelete(productId:string,sellerId:string):Promise<void>;

    // Updates an entity in the database
    update(object:TDomain):Promise<TDomain>;

    // Retrieves all entities from the database
    findAll(seller_id:string):Promise<TDomain[]>;

}