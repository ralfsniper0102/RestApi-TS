import { Router } from "express";
import ClientController from "../controller/client.controller";
import { verifyToken } from "../jwt/jwt";

const control = new ClientController();

const clientRouter = Router();

/**
 * @swagger
 *   /api/Client/GetAllClients:
 *      get:
 *          summary: Retrieve all clients
 *          tags: [Clients]
 *          responses:
 *              200:
 *                  description: A list of clients
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/GetClients'
 */
clientRouter.get("/api/Client/GetAllClients", verifyToken, control.getAll.bind(control));

/**
 * @swagger
 * /api/Client/CreateClient:
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateClient'
 *     responses:
 *       201:
 *         description: Client created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
clientRouter.post("/api/Client/CreateClient", verifyToken, control.create.bind(control));

/**
 * @swagger
 * /api/Client/GetClientById/{id}:
 *   get:
 *     summary: Get a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the client to retrieve
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
clientRouter.get("/api/Client/GetClientById/:id", verifyToken, control.getById.bind(control));

/**
 * @swagger
 * components:
 *   schemas:
 *     GetClients:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:        
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         address:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         zip:
 *           type: string
 *         country:
 *           type: string
 *         createdAt:
 *           type: string
 *           example: "2023-06-07T12:34:56Z"
 *         updatedAt:
 *           type: string
 *           example: "2023-06-07T12:34:56Z"
 *         createdById:
 *           type: integer
 *     CreateClient:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         mobilePhone:
 *           type: string
 *         phone:
 *           type: string
 *         address:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         zip:
 *           type: string
 *         country:
 *           type: string
 *         createdAt:
 *           type: string
 *           example: "2023-06-07T12:34:56Z"
 *         createdById:
 *           type: integer
 *       required:
 *         - name
 *         - email
 *         - mobilePhone
 *         - address
 *         - city
 *         - state
 *         - zip
 *         - country
 *         - createdById  
 */

export default clientRouter;