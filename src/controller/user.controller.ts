import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";
import md5 from "md5";

class UserController {
  private service = new UserService();

  /**
   * @swagger
   * /user:
   *   get:
   *     summary: Retrieve a list of users
   *     responses:
   *       200:
   *         description: A list of users
   */
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.getAll();
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.login(req.body);
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
}

export default UserController;
