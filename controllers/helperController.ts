// controllers/helperController.ts
import { Request, Response } from 'express';
import { Helper } from '../models/helper.model';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


// GET /api/helpers
export const getHelpers = async (_req: Request, res: Response) => {
  try {
    const helpers = await Helper.find();
    res.status(200).json(helpers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching helpers', error });
  }
};

// POST new helper
export const addHelper = async (req: Request, res: Response) => {
  try {
    const newHelper = new Helper(req.body);
    const savedHelper = await newHelper.save();
    res.status(201).json(savedHelper);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add helper', details: err });
  }
};

// GET /api/helpers/:id
export const getHelperById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id); // ID is passed as a string → convert to number

    const helper = await Helper.findOne({ id }); // 🔍 not _id, your custom id field

    if (!helper) {
      return res.status(404).json({ message: 'Helper not found' });
    }

    res.status(200).json(helper);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching helper by id', error });
  }
};

// DELETE /api/helpers/:id
export const deleteHelper = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id); // Use your custom numeric `id` field

    const deletedHelper = await Helper.findOneAndDelete({ id });

    if (!deletedHelper) {
      return res.status(404).json({ message: 'Helper not found' });
    }

    res.status(200).json({ message: 'Helper deleted successfully', deletedHelper });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting helper', error });
  }
};

// Upload Controller Function
export const uploadFileToCloudinary = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;

    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'helpers',
    });

    fs.unlinkSync(filePath); // Delete local temp file

    return res.status(200).json({ url: result.secure_url });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ message: 'Upload failed', error: err });
  }
};

export const updateHelper = async (req: Request, res: Response) => {
  const helperId = parseInt(req.params.id);
console.log(req.body);

  try {
    const updatedData = {
      id: req.body.id,
      name: req.body.fullName,
      role: req.body.service,
      imageUrl: req.body.photoPreview || '',
      employeeCode: req.body.employeeCode,
      gender: req.body.gender,
      languages: req.body.languages,
      mobileNo: req.body.phone,
      emailId: req.body.email,
      type: req.body.service,
      organization: req.body.organization,
      joinedOn: new Date().toISOString().split('T')[0],
      vehicle: req.body.vehicle || 'none',
      vehicleNumber: req.body.vehicleNumber || '',
      additionalDocument: {
        category: req.body.additionalDocument?.category || '',
        fileName: req.body.additionalDocument?.fileName || '',
      },
      kycDocument: {
        category: req.body.kycDocument?.category || '',
        fileName: req.body.kycDocument?.fileName || '',
      }
    };
    
    const updatedHelper = await Helper.findOneAndUpdate(
      { id: helperId },
      updatedData,
      { new: true }
    );

    if (!updatedHelper) {
      return res.status(404).json({ message: 'Helper not found' });
    }

    res.status(200).json({ message: 'Helper updated successfully', data: updatedHelper });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update helper', error });
  }
};
