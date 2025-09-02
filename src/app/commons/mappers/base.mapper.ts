export abstract class BaseMapper<T,Dto>{

    abstract toResponseDto(object: T):Dto;
    abstract toDomain(dto:Dto):T;

}