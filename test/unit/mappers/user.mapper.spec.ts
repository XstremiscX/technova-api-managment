import { UserMapper } from "src/app/users/presentations/mappers/user.mapper";
import { UserPublicView } from "src/app/users/presentations/views/user-public.view";
import { LoginUserView } from "src/app/auth/presentation/views/login-user.view";
import { UserEntity } from "src/app/users/domain/entities/user.entity";

describe('UserMapper',()=>{
    let userMapper: UserMapper;

    beforeEach(()=>{
        userMapper = new UserMapper();
    });

    it('should be defined',()=>{
        expect(userMapper).toBeDefined();
    });

    it('should map UserEntity to UserPublicView',()=>{
        const entity = new UserEntity();
        entity.id = "user-id";
        entity.name = "John Doe";
        entity.phone = "1234567890";
        entity.email = "john.doe@example.com";
        entity.address = "123 Main St";

        const expectedResult = new UserPublicView("user-id","John Doe","1234567890","john.doe@example.com","123 Main St");
        const result = userMapper.toUserPublicViewFromEntity(entity);
        expect(result).toEqual(expectedResult);
    });

    it('should map UserEntity to LoginUserView',()=>{
        const entity = new UserEntity();
        entity.id = "user-id";
        entity.email = "john.doe@example.com";
        entity.password = "hashed-password";
        entity.type = 1;
        const expectedResult = new LoginUserView("user-id","john.doe@example.com","hashed-password",1);
        const result = userMapper.toLoginUserViewFromEntity(entity);
        expect(result).toEqual(expectedResult);
    });
});