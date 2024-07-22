import { ModelStatic } from "sequelize";
import Client from "../database/models/Client";
import { resp } from "../utils/resp";
import schema from "./validations/schema";
import IClient from "../interfaces/IClient";

class ClientService {
  private model: ModelStatic<Client> = Client;
  
  async getAll() {
    let clients;
    
    try{
        clients = await this.model.findAll();
    }
    catch(error){
        return resp(500, "Error searching clients");
    }
    
    return resp(200, clients);
  }

  async create(client: IClient) {
    const { error } = schema.client.validate(client);
    if(error) return resp(400, error.message);

    let clientCreated;
    try{
        clientCreated = await this.model.create({...client});
    }
    catch(error){
        return resp(500, "Error creating client");
    }

    return resp(201, undefined);
  }
}

export default ClientService;