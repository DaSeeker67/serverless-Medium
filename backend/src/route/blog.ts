import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECERET: string;
    }
    Variables:{
        userId: string;
       
    }
}>();
blogRouter.use(async (c, next) => {
    const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[0];
	const payload = await verify(token, c.env.JWT_SECERET)||"";
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
    payload.id= payload.id||" ";
    "@ts_ignore"
	c.set('userId', payload.id);
	await next()
});


blogRouter.post('/new', async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      const userId=c.get("userId");

    
      const body = await c.req.json();
      const post= await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId
        }
      })
      return c.json({
		id: post.id
	});
})

blogRouter.put('/update', async (c)=>{
    const userId= c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

    const body = await c.req.json();

    prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

    return c.text('Post updated successfully');
    
})

blogRouter.get('/bulk', async (c)=>{
    const userId= c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

      const bulk= await prisma.post.findMany();

      return c.json({
        bulk
      });
})

