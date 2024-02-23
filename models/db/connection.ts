import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { connect } from '@planetscale/database'
import {
    env,
    nextTick,
  } from 'node:process'

class ConnectionManager {
    private static connection: any = null;
    private static env: any = null;
  
    public static async getConnection(c=null) {
      console.log("getConnection start!!!");
      if (!ConnectionManager.env) { ConnectionManager.env = c.env; }
      if (!ConnectionManager.connection) {
        const env = ConnectionManager.env;
        const dbInfo = {
            host: env.DATABASE_HOST,
            username: env.DATABASE_USER,
            password: env.DATABASE_PASSWORD,
            fetch: (url, init) => {
              if (init) {
                delete init['cache'];
              }
              return fetch(url, init);
            },
        };
    
        console.log("dbInfo:", dbInfo);
    
        const connection = await connect(dbInfo);
    
        console.log("connection :", connection);

        ConnectionManager.connection = drizzle(connection);

        console.log("ConnectionManager.connection :", ConnectionManager.connection);
    
      }
      return ConnectionManager.connection;
    }
  }

export default ConnectionManager;