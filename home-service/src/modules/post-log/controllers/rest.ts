import { catchErrors } from "../../../api/middlewares";
import postLogService from "../services";

export const createLog = catchErrors(async (req: any, res: any, next: any) => {
  const data = await postLogService.create(req.body);
  res.status(201).json({ message: "Created successfully", data });
});

export const getAllLogs = catchErrors(async (req: any, res: any, next: any) => {
  const data = await postLogService.findAll();
  res.status(200).json({ data });
});

export const getSingleLog = catchErrors(
  async (req: any, res: any, next: any) => {
    const data = await postLogService.findById(req.params.id);
    res.status(200).json({ data });
  }
);

export const deleteLogById = catchErrors(
  async (req: any, res: any, next: any) => {
    const data = await postLogService.deleteById(req.params.id);
    res.status(200).json({ data });
  }
);
