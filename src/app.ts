import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import router from "./routes";
const { SwaggerTheme, SwaggerThemeNameEnum } = require("swagger-themes");

const app = express();

const theme = new SwaggerTheme();
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Project Registration of Customers and Users',
      version: '1.0.0',
      description: 'API documentation for your RestApi-TS',
    },

    components: {
      securitySchemes: {
        JWT: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'JWT Authorization header using the Bearer scheme. Example: "Authorization: {token}"'
        },
      },
    },
    security: [{
      JWT: []
    }],
    servers: [
      {
        url: 'https://solutionsapi.online/rest-api-ts', 
      },
      {
        url: 'http://localhost:3000'
      }
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerTheme = {
  customCss: theme.getBuffer(SwaggerThemeNameEnum.DRACULA),
  
};

const specs = swaggerJsdoc(options);

app.use(express.json());
app.use(cors());
app.use("/swagger/index.html", swaggerUi.serve, swaggerUi.setup(specs, swaggerTheme));
app.use(router);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: err.message });
  next();
});

export default app;
