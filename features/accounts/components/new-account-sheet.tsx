import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import {AccountForm} from "@/features/accounts/components/account-form"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet"



export const NewAccountSheet = () =>{
   const {isOpen, onClose} = useNewAccount();
    
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
            <SheetHeader>
              <SheetTitle>
                    New Account
              </SheetTitle>  

              <SheetDescription>
                Create a new Account to track your transactions
              </SheetDescription>
            </SheetHeader>
            <AccountForm onSubmit={()=>{}} disabled={false}>

            </AccountForm>
        </SheetContent>
      </Sheet>  
    );
}