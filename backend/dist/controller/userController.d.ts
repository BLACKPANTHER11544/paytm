import type { Request, Response } from "express";
export declare const userSignUp: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const UserSignIN: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const UserUpdate: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const DeleteUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetUserDetail: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const FindUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=userController.d.ts.map