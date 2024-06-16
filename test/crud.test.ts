import { handler } from "../src/services/spaces/handler";
import { save, findAll, findByValue, editById, deleteByValue } from "../src/services/common/data/crud";

describe("Spaces Handler", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should save a space", async () => {
        const space = { location: "HAWAII" };
        const tableName = "SpacesTable-029133f48be3";

        const savedSpace = await save(space, tableName);

        expect(savedSpace).toEqual(space);
    });

    test("should get all spaces", async () => {
        const tableName = "SpacesTable-029133f48be3";

        const spaces = await findAll(tableName);

        expect(spaces).toEqual(expect.arrayContaining([]));
    });

    test("should get a space by id", async () => {
        const id = "78294228-bbf1-41c2-92ce-4c9217d4d1db";
        const tableName = "SpacesTable-029133f48be3";

        const space = await findByValue({ id }, tableName);

        expect(space).toEqual(expect.objectContaining({}));
    });

    test("should update a space by id", async () => {
        const id = "78294228-bbf1-41c2-92ce-4c9217d4d1db";
        const location = "LONDON";
        const tableName = "SpacesTable-029133f48be3";

        await editById({ location }, id, tableName);

        // Assert the update logic here
    });

    test("should delete a space by value", async () => {
        const space = { id: "78294228-bbf1-41c2-92ce-4c9217d4d1db" };
        const tableName = "SpacesTable-029133f48be3";

        await deleteByValue(space, tableName);

        // Assert the delete logic here
    });

    // Add more test cases as needed
});