//web api Error 物件參考 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

class HttpError extends Error {
    constructor(message, status, body) {
        super(message);
        this.message = message;
        this.status = status;
        this.body = body;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = new Error(message).stack;
        }
        this.stack = new Error().stack;
    }
}

export default HttpError;