import { IMock, Mock } from "moq.ts";
import { WishRepository } from "../../src/wishes/wish.repository";
import { DataTestHelper } from "./data.test.helper";
import { UserRepository } from "../../src/users/user.repository";

export class RepositoryTestHelper {

    constructor(private db: DataTestHelper) {}

    getWishRepositoryMock(): IMock<WishRepository>{
        var arr: string[] = [];
        return new Mock<WishRepository>()
            .setup(repo => repo.createWishlist(this.db.uid1))
            .callback((val) => {
                arr.push(val.args[0]);
                return Promise.resolve(this.db.wishlist1)
            })
            .setup(repo => repo.createWishlist(this.db.uid2))
            .returns(Promise.resolve(this.db.wishlist2))
            .setup(repo => repo.hasWishlistWithId(this.db.uid1))
            .callback((val) => { 
                return Promise.resolve(arr.includes(val.args[0]))
            })
            .setup(repo => repo.deleteUserWishes(this.db.uid1))
            .returns(Promise.resolve());
    }


    getUserRepositoryMock(): IMock<UserRepository> {
        return new Mock<UserRepository>()
            .setup(repo => repo.deleteUser(this.db.uid1))
            .returns(Promise.resolve(null))
            .setup(repo => repo.addGroupIDToGroup(this.db.uid1))
            .returns(Promise.resolve(null))
            .setup(repo => repo.createDefaultImageForUser(this.db.uid1))
            .returns(Promise.resolve(null))
    }
}
