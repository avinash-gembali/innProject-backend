import { Response } from "express";
import { Helper } from "../models/helper.model";

export const sendHelpersData = (res : Response , data : Helper[]) => {
    res.status(200).json(data);
}

export const addHelperData = (res : Response , data : Helper) => {
    res.status(200).json(data);
}

export const sendHelperById = (res : Response , data : Helper) => {
    res.status(200).json(data);
}

export const deleteHelperById = (res : Response ,data : Helper) => {
    res.status(200).json({
        message : "Helper Deleted",
        data
    })
}

export const updateHelperByID = (res : Response , data : Helper) => {
    res.status(200).json({
        message : "Helper Updated",
        data
    })
}

export const sendFileUrl = (res : Response , url : string) => {
    res.status(200).json({url});
}