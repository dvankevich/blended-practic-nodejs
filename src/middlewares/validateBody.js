import createHttpError from "http-errors";

export const validateBody = (schema) => {
    return async (req, res, next) => {
        try {
            console.log('test');
            await schema.validateAsync(req.body, {
                abortEarly: false,
            });
            next();
        } catch (error) {
            const er = createHttpError(400, 'Bad request', {
                errors: error.details,
            });
            next(er);
        }
    };
};
