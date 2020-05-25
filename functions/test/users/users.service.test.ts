import { UserService } from "../../src/users/user.service";
import { IMock, Times } from "moq.ts";
import { UserRepository } from "../../src/users/user.repository";
import { RepositoryTestHelper } from "../helpers/repository.test.helper";
import { DataTestHelper } from "../helpers/data.test.helper";


describe('UserService',() => {

    let dataTestHelper: DataTestHelper; 
    let repositoryTestHelper: RepositoryTestHelper;
    let userRepo: IMock<UserRepository>;
    let userService: UserService;

    beforeEach(() => {
        dataTestHelper = new DataTestHelper();
        repositoryTestHelper = new RepositoryTestHelper(dataTestHelper);
        userRepo = repositoryTestHelper.getUserRepositoryMock();
        userService = new UserService(userRepo.object());
    })

    //-----------------Delete User Test------------------//

    it('Delete undefined uid rejects',async () => {
        await expect(userService.deleteUser(undefined as any))
            .rejects.toEqual('Cannot delete undefined uid');
    });

    it('Delete null uid rejects',async () => {
        await expect(userService.deleteUser(null as any))
            .rejects.toEqual('Cannot delete null uid');
    });

    it('Delete user that exists resolves',async () => {
        await expect(userService.deleteUser(dataTestHelper.uid1))
            .resolves.toEqual(null);
    });

    it('Delete user calls deleteUser on repository once',async () => {
        await userService.deleteUser(dataTestHelper.uid1)
        userRepo.verify(repo => repo.deleteUser,Times.Once());
    });

    
    it('Delete user calls deleteUser on repository once with correct id',async () => {
        await userService.deleteUser(dataTestHelper.uid1)
        userRepo.verify(repo => repo.deleteUser(dataTestHelper.uid1),Times.Once());
    });

    //-----------------AddIdToGroup Test------------------//

    it('Adding undefined uid rejects',async () => {
        await expect(userService.addIDToGroup(undefined as any))
            .rejects.toEqual('Cannot add undefined uid');
    });

    it('Adding null uid rejects',async () => {
        await expect(userService.addIDToGroup(null as any))
            .rejects.toEqual('Cannot add null uid');
    });

    it('Adding new id to group resolves',async () => {
        await expect(userService.addIDToGroup(dataTestHelper.uid1))
            .resolves.toEqual(null);
    });

    it('Adding new id to group calls addGroupIDToGroup on repository once',async () => {
        await userService.addIDToGroup(dataTestHelper.uid1)
        userRepo.verify(repo => repo.addGroupIDToGroup,Times.Once());
    });

    
    it('Adding new id to group calls addGroupIDToGroup on repository once with correct id',async () => {
        await userService.addIDToGroup(dataTestHelper.uid1)
        userRepo.verify(repo => repo.addGroupIDToGroup(dataTestHelper.uid1),Times.Once());
    });

    //-----------------CreateDefaultImageForUser Test------------------//

    it('Creating Image For undefined uid rejects',async () => {
        await expect(userService.createDefaultImageForUser(undefined as any))
            .rejects.toEqual('Cannot create image for undefined uid');
    });

    it('Creating Image For null uid rejects',async () => {
        await expect(userService.createDefaultImageForUser(null as any))
            .rejects.toEqual('Cannot create image for null uid');
    });

    it('Creating image with correct uid resolves',async () => {
        await expect(userService.createDefaultImageForUser(dataTestHelper.uid1))
            .resolves.toEqual(null);
    });

    it('Creating image calls createDefaultImageForUser on repository once',async () => {
        await userService.createDefaultImageForUser(dataTestHelper.uid1)
        userRepo.verify(repo => repo.createDefaultImageForUser,Times.Once());
    });

    
    it('Creating image calls createDefaultImageForUser on repository once with correct id',async () => {
        await userService.createDefaultImageForUser(dataTestHelper.uid1)
        userRepo.verify(repo => repo.createDefaultImageForUser(dataTestHelper.uid1),Times.Once());
    });

});