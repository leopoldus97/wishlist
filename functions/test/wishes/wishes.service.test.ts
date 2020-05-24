import { WishService } from "../../src/wishes/wish.service";
import { WishRepository } from "../../src/wishes/wish.repository";
import { IMock } from 'moq.ts';
import { RepositoryTestHelper } from "../helpers/repository.test.helper";

describe('WishService',() => {

    let repositoryTestHelper: RepositoryTestHelper;
    let wishRepo: IMock<WishRepository>;
    let wishService: WishService;

    beforeEach(() => {
        repositoryTestHelper = new RepositoryTestHelper();
        wishRepo = repositoryTestHelper.getWishRepositoryMock();
        wishService = new WishService(wishRepo.object());
    });

    it('Creating wish with undefined uid rejects', async() =>{
        await expect(wishService.createWishlist(undefined as any))
            .rejects.toEqual('Wish uid can NOT be undefined');
    })


});