import {Hono} from "hono"
import {db} from "@/db/drizzle";
import {accounts} from "@/db/schema"

 const app = new Hono()
//     .get("/",async (c)=>{
//     const data= db
//     .select({
//         id: accounts.id,
//         name: accounts.name
//     })
//     .from(accounts)    
//     return c.json({data})
// });

app.get("/",(c)=>{
    return c.json({accounts:[]});
})

export default app;

