interface IBaseRepository<T> {
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    save(entity: T): Promise<void>;
    delete(id: string): Promise<void>;
}

class Brand {
    id: string;
    name: string;
    description?: string;

    constructor(id: string, name: string, description?: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}

interface IBrandRepository extends IBaseRepository<Brand> {
    findByName(name: string): Promise<Brand | null>;
}

class BrandRepository implements IBrandRepository {
    private brands: Brand[] = [];

    async findAll(): Promise<Brand[]> {
        return this.brands;
    }

    async findById(id: string): Promise<Brand | null> {
        const brand = this.brands.find(b => b.id === id);
        return brand || null;
    }

    async save(entity: Brand): Promise<void> {
        const index = this.brands.findIndex(b => b.id === entity.id);
        if (index !== -1) {
            this.brands[index] = entity;
        } else {
            this.brands.push(entity);
        }
    }

    async delete(id: string): Promise<void> {
        this.brands = this.brands.filter(b => b.id !== id);
    }

    async findByName(name: string): Promise<Brand | null> {
        const brand = this.brands.find(b => b.name === name);
        return brand || null;
    }
}

interface IProductRepository extends IBaseRepository<Product> {
    findByCategory(category: string): Promise<Product[]>;
}

class Product {
    id: string;
    name: string;
    category: string;
    price: number;

    constructor(id: string, name: string, category: string, price: number) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
    }
}

class ProductRepository implements IProductRepository {
    private products: Product[] = [];

    async findAll(): Promise<Product[]> {
        return this.products;
    }

    async findById(id: string): Promise<Product | null> {
        const product = this.products.find(p => p.id === id);
        return product || null;
    }

    async save(entity: Product): Promise<void> {
        const index = this.products.findIndex(p => p.id === entity.id);
        if (index !== -1) {
            this.products[index] = entity;
        } else {
            this.products.push(entity);
        }
    }

    async delete(id: string): Promise<void> {
        this.products = this.products.filter(p => p.id !== id);
    }

    async findByCategory(category: string): Promise<Product[]> {
        return this.products.filter(p => p.category === category);
    }
}