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
    if(clients.length === 0) return resp(404, "No clients found");
    
    return resp(200, clients);
  }

  async create(client: IClient) {
    const { error } = schema.client.validate(client);
    if(error) return resp(400, error.message);

    if(client.email){
        const clientExists = await this.model.findOne({where: {email: client.email}});
        if(clientExists) return resp(400, "Client already exists");
    }

    let clientCreated;
    try{
        clientCreated = await this.model.create({...client});
    }
    catch(error){
        return resp(500, "Error creating client");
    }

    return resp(201, undefined);
  }

  async getById(id: number) {
    let client;
    try{
        client = await this.model.findByPk(id);

        if(!client) return resp(404, "Client not found");
    }
    catch(error){
        return resp(500, "Error searching client");
    }

    return resp(200, client);
  }
}

export default ClientService;