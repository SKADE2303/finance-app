import {z} from "zod";
import { Hono } from "hono"
import { db } from "@/db/drizzle";
import { accounts } from "@/db/schema";
import {and,eq,inArray} from "drizzle-orm"
import {clerkMiddleware,getAuth} from "@hono/clerk-auth";
import {zValidator} from "@hono/zod-validator";
import {createInsertSchema} from "drizzle-zod";
import {insertAccountSchema} from "@/db/schema";
import { createId } from "@paralleldrive/cuid2"

 const app = new Hono()
    .get("/",clerkMiddleware(),async (c)=>{
      
      const auth = getAuth(c);

      if(!auth?.userId){
        return c.json({error: "Unauthorized"},401);
      }
      
      const data = await db
      .select({
        id: accounts.id,
        name: accounts.name,
      })
      .from(accounts)
      .where(eq(accounts.userId, auth.userId));
    return c.json({data});
})
    .get(
      "/:id",
      zValidator("param", z.object({
        id : z.string().optional(),
      })),
      clerkMiddleware(),
      async (c) =>{

          const auth = getAuth(c);
          const { id } = c.req.valid("param");

          if(!id){
            return c.json({error: "Missing Id"},400);
          }

          if(!auth?.userId){
            return c.json({error: "Unauthorised"},401);
          }

          const [data] = await db
            .select({
              id: accounts.id,
              name: accounts.name
            })
            .from(accounts)
            .where(
              and(
                eq(accounts.userId,auth.userId),
                eq(accounts.id,id)
              )
            );

          if(!data){
            return c.json({error: "Not Found"},400)
          }

          return c.json({data});
      }
    )
    .post(
      "/",
      zValidator("json",insertAccountSchema.pick({
        name: true,
      })),
      clerkMiddleware(),

      async (c) =>{
        try{
        const auth = await getAuth(c);
        const values = c.req.valid("json");

        if(!auth?.userId){
          return c.json({error: "Unauthorized"},401);
        }

        const [data] = await db.insert(accounts).values({
          id: createId(),
          userId: auth.userId,
          ...values,
        }).returning();



        return c.json({ data });
      } catch (error){
        console.error("Error inserting account:", error); 
        return c.json({error: " Failed"},500);
      }
      }
    )
    .post(
      "/bulk-delete",
      clerkMiddleware(),
      zValidator(
        "json",
        z.object({
          ids: z.array(z.string()),
        }),

      ),
      async (c) =>{
        const auth = getAuth(c);
        const values = c.req.valid("json");

        if(!auth?.userId){
          return c.json({error: "Unauthorised"}, 401);
        }

        const data = await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.userId,auth.userId),
            inArray(accounts.id, values.ids)
          )
        )
        .returning({
          id: accounts.id,
        });

        return c.json({data});
      }
    )
    .patch(
      "/:id",
      clerkMiddleware(),
      zValidator(
        "param",
        z.object({
          id: z.string().optional(), 
        }),
      ),
      zValidator(
        "json",
        insertAccountSchema.pick({
          name: true,
        })
      ),
      async (c) =>{
        const auth  = getAuth(c);
        const {id} = c.req.valid("param");
        const values = c.req.valid("json");

        if(!id){
          return c.json({error: "Missing Id"},400);
        }

        if(!auth?.userId){
          return c.json({error: "Unauthorised"},401);
        }

        const [data] = await db
        .update(accounts)
        .set(values)
        .where(
          and(
            eq(accounts.userId,auth.userId),
            eq(accounts.id,id),  
          )
        )
        .returning();

        if(!data){
          return c.json({error: "Not Found"},404);
        }
        return c.json({data});
      },


    )
    .delete(
      "/:id",
      clerkMiddleware(),
      zValidator(
        "param",
        z.object({
          id: z.string().optional(), 
        }),
      ),
      
      async (c) =>{
        const auth  = getAuth(c);
        const {id} = c.req.valid("param");
       
        if(!id){
          return c.json({error: "Missing Id"},400);
        }

        if(!auth?.userId){
          return c.json({error: "Unauthorised"},401);
        }

        const [data] = await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.userId,auth.userId),
            eq(accounts.id,id),  
          )
        )
        .returning({
          id: accounts.id,
      });

        if(!data){
          return c.json({error: "Not Found"},404);
        }
        return c.json({data});
      },
    )

// app.get("/",(c)=>{
//     return c.json({accounts:[]});
// })

export default app;

