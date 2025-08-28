export abstract class BaseMapper<Domain,Entity,ResponseDto>{
    abstract toDomain(entity: Entity):Domain;
    abstract toEntity(domain: Domain):Entity;
    abstract toResponseDto(domain: Domain):ResponseDto;

    toDomainList(entityList:Entity[]):Domain[]{
        return entityList.map(e => this.toDomain(e));
    };

    toEntityList(domainList:Domain[]):Entity[]{
        return domainList.map(e => this.toEntity(e))
    }

    toResponseDtoList(domainList:Domain[]):ResponseDto[]{
        return domainList.map(e => this.toResponseDto(e))
    }
}