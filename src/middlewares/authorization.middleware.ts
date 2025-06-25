import { NextFunction, Request, Response, RequestHandler } from "express";
import ErrorHandler from "../utils/ErrorHandler";

// The return type for the outer function is (req, res, next) => void, which is the Express middleware signature.
// You can explicitly type it as: RequestHandler
const authorization = (roles: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Get user role from request (attached by authentication middleware)
      const userRole = (req as any).userRole;

      if (!userRole) {
        ErrorHandler.send(res, 403, "Forbidden: User role not found");
        return;
      }

      // Check if user's role is included in the allowed roles
      if (!roles.includes(userRole)) {
        ErrorHandler.send(
          res,
          403,
          "Forbidden: You are not authorized to access this resource"
        );
        return;
      }

      next();
    } catch (error: any) {
      ErrorHandler.send(res, 500, `Internal Server Error: ${error.message}`);
    }
  };
};

export default authorization;
