import { createClient } from "redis";
const client = createClient();

class redisDAO {
    readonly Session = "session";
    async connect(): Promise<void> {
        try {
            await client.connect();
            console.log("Redis connectd");
        } catch (err: any) {
            console.log(err.message);
            process.exit(1);
        }
    }

    async createSession(user_id: any, payLoad: any) {
        client.HSET(this.Session, user_id, JSON.stringify(payLoad));
    }

    async findSession(user_id: any) {
        try {
            const user = await client.HGET(this.Session, user_id);
            if (!user) {
                return Promise.resolve(false);
            } else {
                return Promise.resolve(true);
            }
        } catch (err: any) {
            return Promise.reject(err);
        }
    }
}
export const redis = new redisDAO();