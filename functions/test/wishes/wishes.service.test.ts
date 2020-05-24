import { WishService } from "../../src/wishes/wish.service";
import { WishRepository } from "../../src/wishes/wish.repository";
import { IMock } from 'moq.ts';
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

});