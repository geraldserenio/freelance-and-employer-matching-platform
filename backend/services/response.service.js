class ResponseService {
    static created(res, token, user) {
        return res.status(201).json({
            token: token, user: user
        });
    }

    static success(res, data, message) {
        return res.status(200).json({
            message: message || "Success!",
            data
        });
    }

    static unprocessableEntity(res, data, message) {
        return res.status(422).json({
            message: message || "Unprocessable Entity!",
            data
        });
    }

    static badRequest(res, message) {
        return res.status(400).json({
            message: message || "Bad Request!"
        });
    }

    static serverError(res, message) {
        return res.status(500).json({
            message: message || "Internal Server Error!"
        });
    }

    static forbidden(res, message) {
        return res.status(403).json({
            message: message || "Access Forbidden!"
        });
    }

    static unAuthorized(res, message) {
        return res.status(401).json({
            message: message || "Unauthorized Access!"
        });
    }

    static notFound(res, message) {
        return res.status(404).json({
            message: message || "Resource Not Found!"
        });
    }
}

module.exports = ResponseService;
