module.exports = { 

    createError ({details, code, message, type}) {
        const error = {};
        error.details = details;
        error.code = code;
        error.message = message;
        error.type = type;
        throw error;
    },

    createValidationError ({ details, message, type }) {
        this.createError({
            message: message || 'Validation Error',
            code: 400,
            details: details,
            type: type || 'ValidationError'
        })
    }
}