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

export default riotApiClient;
