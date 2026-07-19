const errorHandler = (err, req, res, next) => {
    console.log(err);

    return res.status(err.statusCode || 500).json({
        success: err.success ?? false,
        message: err.message || "Internal Server Error",
        errors: err.errors || [],
        data: err.data || null
    });
};

export {errorHandler};
