/**
 * @class representing an app error
 * @extends Error
 */
export default class HttpError extends Error {
    status;
    isOperational;

    /**
     * @constructor
     * @param statusCode - the http status code
     * @param message - the error message
     */
    constructor(statusCode = 500, message) {
        super(message);
        this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}
