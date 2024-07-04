import axios, {AxiosInstance} from 'axios';
import config from '../../config';

config.ensureInitialized();

const region = "americas";
const riotApiClient: AxiosInstance = axios.create({
     baseURL: `https://${region}.api.riotgames.com`,
     headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY
     }
});

async function queueRequest<T>(request : (riotapi: AxiosInstance) => Promise<T>): Promise<T> {
   return await request(riotApiClient);
}

let riotApiWrapper = {
   queueRequest: queueRequest
};

export default riotApiWrapper;
