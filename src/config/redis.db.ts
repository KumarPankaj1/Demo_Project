import { createClient } from "redis";
import { Schema } from "mongoose";
import { interfaceSession } from "../interfaces/session.interface";
const client = createClient();
class redisDAO {
  readonly Session = "DemoProject_Session";
  async connect(): Promise<void> {
    try {
      client.on("error", (err) => console.log("Redis Client Error", err));

      client.on("connect", function () {
        console.log("Redis Connected!");
      });
      await client.connect();
    } catch (err: any) {
      console.log(err.message);
    }
  }
  async findSession(userId: Schema.Types.ObjectId): Promise<any> {
    try {
      const data: any = await client.HGET(this.Session, JSON.stringify(userId));
      if (data) {
        return JSON.parse(data);
      }
      return null;
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async setSession(
    userId: Schema.Types.ObjectId,
    data: interfaceSession.CreateData
  ) {
    try {
      client.HSET(this.Session, JSON.stringify(userId), JSON.stringify(data));
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async delSession(userId: Schema.Types.ObjectId) {
    try {
      client.HDEL(this.Session, JSON.stringify(userId));
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async updateSession(user_id: any, update: any) {
    try {
      const sessions = await this.findSession(user_id);
      if (!sessions) {
        return null;
      }
      const data = { ...sessions, ...update };
      await this.setSession(user_id, data);
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async deleteSessionData(userId: Schema.Types.ObjectId, deviceId: string) {
    try {
      let data = await this.findSession(userId);
      console.log(data);

      for (let i = 0; i < data.length; i++) {
        if (data[i].deviceId === deviceId) {
          data.splice(i,1);
        }
      }
      await this.setSession(userId, data);
      console.log(data);

      return "logout succesfully";
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async createSession(
    userId: Schema.Types.ObjectId,
    sessionDetails: interfaceSession.CreateData
  ) {
    try {
      let data = await this.findSession(userId);
      // console.log(data);
      
      if (!data) {
        await client.HSET(
          this.Session,
          JSON.stringify(userId),
          JSON.stringify([sessionDetails])
        );
      } else {
        // console.log(data);
        
        data.push(sessionDetails);
        await this.setSession(userId, data);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export const redis = new redisDAO();
