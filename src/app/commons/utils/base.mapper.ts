export abstract class BaseMapper<Domain,Entity,ResponseDto>{
    // Convert persistent entities into domains.
    abstract toDomain(entity: Entity):Domain;

    // Conver domains into persistent entities.
    abstract toEntity(domain: Domain):Entity;

    // This converts a domain into a ResponseDto.
    abstract toResponseDto(domain: Domain):ResponseDto;

    // Convert the list of persistent entities into a list of domains.
    toDomainList(entityList:Entity[]):Domain[]{
        return entityList.map(e => this.toDomain(e));
    };

    // Convert the list of domains into a list of persistent entities.
    toEntityList(domainList:Domain[]):Entity[]{
        return domainList.map(e => this.toEntity(e))
    }

    // Convert the list of domains into a list of RespponseDtos.
    toResponseDtoList(domainList:Domain[]):ResponseDto[]{
        return domainList.map(e => this.toResponseDto(e))
    }
}