export abstract class BaseMapper<Domain,Dto,Entity>{

    abstract toResponseDtoFromDomain(object: Domain):Dto;

    abstract toResponseDtoFromEntity(object: Entity):Dto;

}