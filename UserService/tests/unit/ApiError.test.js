import { ApiError } from "../../utils/ApiError.js";

describe("ApiError class", () => {
    it("should set properties correctly when minimal arguments are provided", () => {
        const error = new ApiError(404);
        
        expect(error.statusCode).toBe(404);
        expect(error.message).toBe("Something went wrong");
        expect(error.name).toBe("ApiError");
        expect(error.success).toBe(false);
        expect(error.data).toBe(null);
        expect(error.errors).toEqual([]);
        expect(error.stack).toBeDefined();
    });

    it("should set custom properties correctly when all arguments are provided", () => {
        const errors = [{ field: "username", message: "Required" }];
        const error = new ApiError(400, "Validation failed", "ValidationError", errors, "mock-stack-trace");
        
        expect(error.statusCode).toBe(400);
        expect(error.message).toBe("Validation failed");
        expect(error.name).toBe("ValidationError");
        expect(error.success).toBe(false);
        expect(error.data).toBe(null);
        expect(error.errors).toEqual(errors);
        expect(error.stack).toBe("mock-stack-trace");
    });
});
