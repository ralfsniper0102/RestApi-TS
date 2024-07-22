import { ModelStatic } from "sequelize";
import User from "../database/models/User";
import { resp, respM, respNoMessage } from "../utils/resp";
import md5 from "md5";
import { sign } from "../jwt/jwt";
import IUser from "../interfaces/IUser";
import schema from "./validations/schema";

class UserService {
  private model: ModelStatic<User> = User;

  async getAll() {
    const users = await this.model.findAll();
    return resp(200, users);
  }

  async login(body: { email: string; password: string }) {
    const { error } = schema.user.validate(body);
    if (error) return resp(400, error.message);

    const hashPassword = md5(body.password);

    let user;
    try {
      user = await this.model.findOne({
        where: { email: body.email, password: hashPassword },
      });
    } catch (error) {
      return resp(500, "Error searching user");
    }

    if (!user) return resp(401, "Unauthorized");

    const { id, email } = user;
    const token = sign({ id, email });
    return resp(200, token);
  }

  async create(user: IUser) {
    const { error } = schema.user.validate(user);
    if (error) return respM(400, error.message);

    let userExists;
    try {
      userExists = await this.model.findOne({
        where: { email: user.email },
      });
    } catch (error) {
      return resp(500, "Error searching user");
    }

    if (userExists) return respM(409, "User already exists");

    const hashPassword = md5(user.password);

    try {
      await this.model.create({
        ...user,
        password: hashPassword,
      });
    } catch (error) {
      return respM(500, "Error creating user");
    }

    return respM(201, undefined);
  }
}

export default UserService;
