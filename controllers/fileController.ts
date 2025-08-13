import { NextFunction, Request, Response } from 'express';
import { FileService } from '../services/fileService';
import { successHandler } from '../middlewares/errorHandler';

export class FileController {
  private fileService: FileService;

  constructor() {
    this.fileService = new FileService();
  }

  uploadFile = async (req: Request, res: Response , next : NextFunction) => {
    try {
      if (!req.file) {
        const error: any = new Error("No File Uploaded");
        error.statusCode = 400;
        return next(error);
      }

      const url = await this.fileService.uploadToCloudinary(req.file.path, 'helpers');
      successHandler(res,url,"photo uploaded to cloudinary");
    } catch (error : any) {
      error.statusCode = 500;
      error.message = "upload Failed";
      next(error);
    }
  };
}
