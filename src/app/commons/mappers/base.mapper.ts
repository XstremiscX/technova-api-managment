export abstract class BaseMapper<Domain,Dto,Entity>{

    abstract toResponseDtoFromDomain(object: Domain):Dto;

    abstract toEntityFromDomain(object: Domain):Entity;

    abstract toDomainFromEntity(object: Entity):Domain;

}