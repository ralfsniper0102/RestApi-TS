import { Router } from "express";
import UserController from "../controller/user.controller";
import { verifyToken } from "../jwt/jwt";

const control = new UserController();

const userRouter = Router();

/**
 * @swagger
 * /api/User/GetAllUsers:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get("/api/User/GetAllUsers", verifyToken, control.getAll.bind(control));

/**
 * @swagger
 * /api/User/Login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
userRouter.post("/api/User/Login", control.login.bind(control));

/**
 * @swagger
 * /api/User/CreateUser:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
userRouter.post("/api/User/CreateUser", control.create.bind(control));

/**
 * @swagger
 * /api/User/GetUserById/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id of the client to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved client
 *       400:
 *         description: Bad request
 *       404:
 *         description: Client not found
 *       500:
 *         description: Internal server error
 */
userRouter.get("/api/User/GetUserById/:id", verifyToken, control.getById.bind(control));

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - email
 *         - password
 *     
 *     UserLogin:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - email
 *         - password
 *     
 *     NewUser:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - email
 *         - password
 */

export default userRouter;