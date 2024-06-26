import dotenv from "dotenv";

let initialized: boolean = false;

function init() {
    dotenv.config();
}

export default {
    ensureInitialized: () => {
        if (!initialized) {
            init();
            initialized = true;
        }
    }
};