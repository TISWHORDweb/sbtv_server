 
class CoreError extends Error {
    constructor(msg, code) {
        super(msg);
        this.statusCode = code;
        Error.captureStackTrace(this, this.constructor);
    }
}

exports.CoreError = CoreError;
//json parser function
exports.JParser = (m, s, d) => ({message: m, status: s, data: d});
//ascii code generator
