import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import router from "./routes";
const { SwaggerTheme, SwaggerThemeNameEnum } = require('swagger-themes');

const app = express();

const theme = new SwaggerTheme();
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'API documentation for your TS-EXPRESS-SEQUELIZE app',
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerTheme = {
  explorer: true,
  customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK)
}

const specs = swaggerJsdoc(options);

app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerTheme));
app.use(router);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ error: err.message });
    next();
});

export default app;