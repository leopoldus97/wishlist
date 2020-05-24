import { IMock, Mock } from "moq.ts";
import { WishRepository } from "../../src/wishes/wish.repository";

export class RepositoryTestHelper {

    constructor() {}

    getWishRepositoryMock(): IMock<WishRepository>{
        return new Mock<WishRepository>();
    }
}