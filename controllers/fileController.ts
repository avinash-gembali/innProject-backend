import { NextFunction, Request, Response } from 'express';
import { FileService } from '../services/fileService';
import { sendFileUrl } from '../middlewares/successHandler';

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
      sendFileUrl(res,url);
    } catch (error : any) {
      error.statusCode = 500;
      error.message = "upload Failed";
      next(error);
    }
  };
}
