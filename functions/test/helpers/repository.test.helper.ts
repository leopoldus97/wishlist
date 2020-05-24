import { IMock, Mock } from "moq.ts";
import { WishRepository } from "../../src/wishes/wish.repository";
import { DataTestHelper } from "./data.test.helper";

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
            .setup(repo => repo.wishWithIdExists(this.db.uid1))
            .callback((val) => { 
                return Promise.resolve(arr.includes(val.args[0]))
            })
    }
}
