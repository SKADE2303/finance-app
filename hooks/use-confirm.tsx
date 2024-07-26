import {useState} from "react"
import {Button}  from "@/components/ui/button"

import {
    Dialog,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogContent,
    DialogTitle
 } from "@/components/ui/dialog"

 export const useConfirm = (
    title: string,
    message: string,
 ):[()=>JSX.Element, () => Promise<unknown>] =>{
    const [promise,setPromise] = useState<{ resolve: (value: boolean) =>void} |null>(null);

    const confirm = ()=> new Promise ((resolve,reject)=>{
        setPromise({resolve});
    });


    const handleClose = ()=>{
        setPromise(null);
    };

    const handleConfirm = () =>{
        promise?.resolve(true);
        handleClose();
    };

    const handleCancel = () =>{
        promise?.resolve(false);
        handleClose();
    };

    const ConfirmationDialog = () => (
        <Dialog open ={promise!==null}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> {title}</DialogTitle>
                    <DialogContent> {message} </DialogContent>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={handleCancel} variant="outline">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm}>
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

    return [ConfirmationDialog, confirm];

 };