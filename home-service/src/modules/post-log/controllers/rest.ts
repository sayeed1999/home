import { catchErrors } from "../../../api/middlewares";
import postLogService from "../services";

export const createLog = catchErrors(async (req: any, res: any, next: any) => {
  const data = await postLogService.createLog(req.body);
  res.status(201).json({ message: "Created successfully", data });
});

export const getAllLogs = catchErrors(async (req: any, res: any, next: any) => {
  const data = await postLogService.getAllLogs();
  res.status(200).json({ data });
});

export const getSingleLog = catchErrors(
  async (req: any, res: any, next: any) => {
    const data = await postLogService.getLogById(req.params.id);
    res.status(200).json({ data });
  }
);

export const deleteLogById = catchErrors(
  async (req: any, res: any, next: any) => {
    const data = await postLogService.deleteLogById(req.params.id);
    res.status(200).json({ data });
  }
);
