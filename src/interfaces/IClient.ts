interface IClient {
    name: string;
    email: string;
    phone?: string;
    mobilePhone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    createdAt?: Date;
    createdBy: number;
}

export default IClient;