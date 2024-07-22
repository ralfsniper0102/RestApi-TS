import { NextFunction, Request, Response } from "express";
import ClientService from "../services/client.service";

class ClientController {
  private service = new ClientService();

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.getAll();
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.create(req.body);
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.getById(
        parseInt(req.params.id)
      );
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }
}

export default ClientController;
