import { Hono } from "hono"
import { db } from "@/db/drizzle";
import { accounts } from "@/db/schema";
import {clerkMiddleware,getAuth} from "@hono/clerk-auth";
import {HTTPException} from "hono/http-exception";

 const app = new Hono()
    .get("/",clerkMiddleware(),async (c)=>{
      
      const auth = getAuth(c);

      if(!auth?.userId){
        throw new HTTPException(401,{
          res: c.json({error : "User not logged"},401),
        })
      }
      
      const data = await db
      .select({
        id: accounts.id,
        name: accounts.name,
      })
      .from(accounts);
    return c.json({data});
});

app.get("/",(c)=>{
    return c.json({accounts:[]});
})

export default app;

