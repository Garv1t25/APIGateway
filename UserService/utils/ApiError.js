class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        name = "ApiError",
        errors = [],
        stack = ""
    ) {
        super(message);

        this.name = name;
        this.statusCode = statusCode;
        this.success = false;
        this.data = null;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export {ApiError}