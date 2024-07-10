"use client"

import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import {userAccounts} from "@/features/accounts/api/use-get-accounts";

export default function Home() {

  const { data : accounts, isLoading} = userAccounts();

  if(isLoading){
    return (
    <div>
      ...Loading
    </div>);
  }



  return (
    <div>
      {accounts?.map((account) =>(
        <div key = {account.id}>
          {account.name};
        </div>
      ))}

    </div>

  );

}