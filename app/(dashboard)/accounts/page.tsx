"use client";

import {Card,CardContent,CardTitle,CardHeader }  from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import {Loader2, Plus} from "lucide-react"
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { Skeleton } from "@/components/ui/skeleton";


const AccountsPage = () =>{
    
    const newAccount = useNewAccount();
    const accountsQuery = useGetAccounts();
    const accounts = accountsQuery.data || [];

    if(accountsQuery.isLoading){
        return (
            <div className  = "max-w-screen-2xl mx-auto w-full pb-10 -mt-24"> 
            <Card className = "border-none drop-shadow-sm">
               <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <Skeleton className="h-8 w-48"> 
                    </Skeleton>
               </CardHeader> 

               <CardContent>
                    <div className ="h-[500px] w-full flex items-center justify-center ">
                        <Loader2 className= "size-6 text-slate-300 animate-spin">
                            
                        </Loader2>
                    </div>
               </CardContent>
            </Card>
            
            </div>
        )
    }
    
    return (
        <div className  = "max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className = "border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className = "text-xl line-clamp-1">
                 <div>
                   Accounts Page
                </div>
            </CardTitle>
            <Button onClick={newAccount.onOpen } size="sm">
                <Plus className="size-4 mr-2"></Plus>
                Add new
            </Button>
        </CardHeader>
        <CardContent>
            <DataTable columns={columns} data={accounts} filterKey="email" onDelete= {()=>{}} disabled ={false} />
        </CardContent>
        </Card>
        </div>
    );
}

export default AccountsPage;