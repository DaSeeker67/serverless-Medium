import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';
import { userRouter } from './route/user';
import { blogRouter } from './route/blog';
const app = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECERET: string;
      
    },
    
}>();
app.route("/api/v1/user",userRouter)
app.route("/api/v1/blog",blogRouter)
export default app
