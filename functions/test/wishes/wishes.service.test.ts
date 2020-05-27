import { WishService } from "../../src/wishes/wish.service";
import { WishRepository } from "../../src/wishes/wish.repository";
import { IMock, Times } from 'moq.ts';
import { RepositoryTestHelper } from "../helpers/repository.test.helper";
import { DataTestHelper } from "../helpers/data.test.helper";

describe('WishService',() => {

    let dataTestHelper: DataTestHelper;
    let repositoryTestHelper: RepositoryTestHelper;
    let wishRepo: IMock<WishRepository>;
    let wishService: WishService;

    beforeEach(() => {
        dataTestHelper = new DataTestHelper();
        repositoryTestHelper = new RepositoryTestHelper(dataTestHelper);
        wishRepo = repositoryTestHelper.getWishRepositoryMock();
        wishService = new WishService(wishRepo.object());
    });


    //-----------------Creating Wishlist Tests-----------------//

    it('Creating wish with undefined uid rejects', async() =>{
        await expect(wishService.createWishlist(undefined as any))
            .rejects.toEqual('User uid can NOT be undefined when creating wishlist');
    })

    it('Creating wish with null uid rejects', async() =>{
        await expect(wishService.createWishlist(null as any))
            .rejects.toEqual('User uid can NOT be null when creating wishlist');
    })

    it('Creating wish with string uid resolves', async() =>{
        await expect(wishService.createWishlist(dataTestHelper.uid1))
            .resolves.toEqual(dataTestHelper.wishlist1);
    })

    it('Creating wishlist for user that already exists rejects', async() => {
        await wishService.createWishlist(dataTestHelper.uid1);
        await expect(wishService.createWishlist(dataTestHelper.uid1))
            .rejects.toEqual('This user already has a wishlist created');
    })

    it('Creating wishlist for different users does not reject', async() => {
        await wishService.createWishlist(dataTestHelper.uid1);
        await expect(wishService.createWishlist(dataTestHelper.uid2))
            .resolves.toEqual(dataTestHelper.wishlist2);
    })

    it('Creating wishlist calls create-wish-group wishlist on repository once', async() => {
        await wishService.createWishlist(dataTestHelper.uid1);
        wishRepo.verify(instance => instance.createWishlist, Times.Once())
    })

    it('Creating wishlist calls create-wish-group wishlist with correct uid', async() => {
        await wishService.createWishlist(dataTestHelper.uid1);
        wishRepo.verify(instance => instance.createWishlist(dataTestHelper.uid1), Times.Once())
    })

    it('Creating wishlist calls hasWishlist on repository once', async() => {
        await wishService.createWishlist(dataTestHelper.uid1);
        wishRepo.verify(instance => instance.hasWishlistWithId, Times.Once())
    })

    it('Creating wishlist calls hasWishlist with correct id on repository once', async() => {
        await wishService.createWishlist(dataTestHelper.uid1);
        wishRepo.verify(instance => instance.hasWishlistWithId(dataTestHelper.uid1), Times.Once())
    })

    it('Creating wishlist never calls deleteWishlist', async() => {
        await wishService.createWishlist(dataTestHelper.uid1);
        wishRepo.verify(instance => instance.deleteUserWishes, Times.Never())
    })

    //-----------------Deleting Wishlist Tests-----------------//

    it('Deleting wishlist with undefined uid rejects', async() => {
        await expect(wishService.deleteUserWishes(undefined as any))
            .rejects.toEqual('User uid can NOT be undefined on delete wishlist request');
    })

    it('Deleting wishlist with null uid rejects', async() => {
        await expect(wishService.deleteUserWishes(null as any))
            .rejects.toEqual('User uid can NOT be null on delete wishlist request');
    })

    it('Deleting wishlist will call deleteWishlist on repository only once', async() => {
        await expect(wishService.deleteUserWishes(dataTestHelper.uid1))
        wishRepo.verify(repo => repo.deleteUserWishes,Times.Once());
    })

    it('Deleting wishlist will calls deleteWishlist with correct id once', async() => {
        await expect(wishService.deleteUserWishes(dataTestHelper.uid1))
        wishRepo.verify(repo => repo.deleteUserWishes(dataTestHelper.uid1),Times.Once());
    })

    it('Deleting wishlist will never call createWishList', async() => {
        await expect(wishService.deleteUserWishes(dataTestHelper.uid1))
        wishRepo.verify(repo => repo.createWishlist,Times.Never());
    })
});
