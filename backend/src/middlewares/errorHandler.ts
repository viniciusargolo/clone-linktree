import { Request, Response, NextFunction, ErrorRequestHandler } from "express"

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        message: err.message || "Houve um erro no interno de servidor."
    })
}