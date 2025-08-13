// controllers/helperController.ts
import { Request, Response } from "express";
import { HelperService } from "../services/helperService";
import { NextFunction } from "express";
import { successHandler } from "../middlewares/errorHandler";

export class HelperController {
  private helperService: HelperService;

  constructor() {
    this.helperService = new HelperService();
  }

  getHelpers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const helpers = await this.helperService.getAllHelpers();
      successHandler(res, helpers, "helpers fetched successfully");
    } catch (error: any) {
      error.message = "failed to fetch helpers";
      error.statusCode = 500;
      next(error);
    }
  };

  addHelper = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const savedHelper = await this.helperService.addHelper(req.body);
      successHandler(res, savedHelper, "helper added successfully");
    } catch (error: any) {
      error.message = "failed to add Helper";
      error.statusCode = 500;
      next(error);
    }
  };

  getHelperById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const helper = await this.helperService.getHelperById(id);

      if (!helper) {
        const error: any = new Error("Helper not found");
        error.statusCode(400);
        return next(error);
      }

      successHandler(res, helper, "helper fetched by id");
    } catch (error: any) {
      error.statusCode = 500;
      error.message = "error fetching helper";
      next(error);
    }
  };

  deleteHelper = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const deletedHelper = await this.helperService.deleteHelper(id);

      if (!deletedHelper) {
        const error: any = new Error("helper not found");
        error.statusCode = 400;
        return next(error);
      }

      successHandler(res, deletedHelper, "helper deleted successfully");
    } catch (error: any) {
      error.statusCode = 500;
      error.message = "error in deleting helper";
      next(error);
    }
  };

  updateHelper = async (req: Request, res: Response, next: NextFunction) => {
    const helperId = parseInt(req.params.id);
    try {
      const updatedData = {
        id: req.body.id,
        name: req.body.fullName,
        role: req.body.service,
        imageUrl: req.body.photoPreview || "",
        employeeCode: req.body.employeeCode,
        gender: req.body.gender,
        languages: req.body.languages,
        mobileNo: req.body.phone,
        emailId: req.body.email,
        type: req.body.service,
        organization: req.body.organization,
        joinedOn: req.body.date,
        vehicle: req.body.vehicle || "none",
        vehicleNumber: req.body.vehicleNumber || "",
        additionalDocument: {
          category: req.body.additionalDocument?.category || "",
          fileName: req.body.additionalDocument?.fileName || "",
        },
        kycDocument: {
          category: req.body.kycDocument?.category || "",
          fileName: req.body.kycDocument?.fileName || "",
        },
      };

      const updatedHelper = await this.helperService.updateHelper(
        helperId,
        updatedData
      );

      if (!updatedHelper) {
        const error: any = new Error("helper not found");
        error.statusCode = 400;
        return next(error);
      }

      successHandler(res, updatedHelper, "helper updated successfully");
    } catch (error: any) {
      error.statusCode = 500;
      error.message = "faled to update Helper";
      next(error);
    }
  };
}
