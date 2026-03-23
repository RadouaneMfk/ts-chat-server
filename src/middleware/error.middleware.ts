import { StatusCodes } from "http-status-codes"
import { Response, Request, NextFunction } from "express"

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.message === 'Invalid username or password!')
        return res.status(StatusCodes.UNAUTHORIZED).json({
            error: err.message,
    })
    if (err.message === 'username already taken') {
        return res.status(StatusCodes.CONFLICT).json({
            error: err.message,
        })
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Internal Server Error',
    })
}
