import { onDeleteSuccess, cellToAxiosParamsDelete, editCallback } from "main/utils/UCSBDateUtils";
import mockConsole from "jest-mock-console";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

describe("UCSBDateUtils", () => {

    describe("onDeleteSuccess", () => {

        test("It puts the message on console.log and in a toast", () => {
            // arrange
            const restoreConsole = mockConsole();

            // act
            onDeleteSuccess("abc");

            // assert
            expect(mockToast).toHaveBeenCalledWith("abc");
            expect(console.log).toHaveBeenCalled();
            const message = console.log.mock.calls[0][0];
            expect(message).toMatch("abc");

            restoreConsole();
        });

    });
    describe("cellToAxiosParamsDelete", () => {

        test("It returns the correct params", () => {
            // arrange
            const cell = { row: { values: { id: 17 } } };

            // act
            const result = cellToAxiosParamsDelete(cell);

            // assert
            expect(result).toEqual({
                url: "/api/ucsbdates",
                method: "DELETE",
                params: { id: 17 }
            });
        });

    });
    // describe("editCallback", () => {

    //     test("It pops up the expected toast", () => {
    //         // arrange
    //         const cell = { row: { values: { id: 17, name: "Groundhog Day" } } };
    //         const expectedToast =  `Edit Callback called on id: 17 name: Groundhog Day`

    //         // act
    //         const result = editCallback(cell);

    //         // assert

    //         expect(mockToast).toHaveBeenCalledWith(expectedToast);
           
    //     });

    // });
});





