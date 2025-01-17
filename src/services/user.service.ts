import { ModelStatic } from "sequelize";
import User from "../database/models/User";
import { resp, respM, respNoMessage, respWithNameField } from "../utils/resp";
import md5 from "md5";
import { sign, verifyToken } from "../jwt/jwt";
import IUser from "../interfaces/IUser";
import schema from "./validations/schema";

class UserService {
  private model: ModelStatic<User> = User;

  async getAll() {
    let users;

    try {
      users = await this.model.findAll();
    } catch (error) {
      return resp(500, "Error searching users");
    }
    if (users.length === 0) return resp(404, "No users found");

    const usersMapper = users.map((user) => {
      const { id, email } = user;
      return { id, email };
    });
    return resp(200, usersMapper);
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
    return respWithNameField(200, token, "token");
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

  async getById(id: string) {
    let user;

    try {
      user = await this.model.findByPk(id);
      user = {
        id: user!.id,
        email: user!.email,
      };
    } catch (error) {
      return resp(500, "Error searching user");
    }
    if (!user) return respM(404, "User not found");

    return resp(200, user);
  }
}

export default UserService;
