import dotenv from 'dotenv'

dotenv.config();

interface Config {
    port: number,
    graphQLPort: number,
    nodeEnv: string,
    adminToken: string
};

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    graphQLPort: Number(process.env.GRAPHQL_PORT) || 4000,
    nodeEnv: process.env.NODE_ENV || "development",
    adminToken: process.env.ADMIN_TOKEN_FOR_TEST!
};

export default config;