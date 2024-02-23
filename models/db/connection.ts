import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { connect } from '@planetscale/database'

class ConnectionManager {
    private static connection: any = null;
    private static env: any = null;

    public static async getConnection(c=null) {
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
        const connection = await connect(dbInfo);
        ConnectionManager.connection = drizzle(connection);
      }
      return ConnectionManager.connection;
    }
  }

export default ConnectionManager;