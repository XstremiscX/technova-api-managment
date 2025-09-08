export abstract class BaseMapper<T,Dto>{

    abstract toResponseDto(object: T):Dto;

}