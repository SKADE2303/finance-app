"use client";

import {useMountedState} from "react-use";
import {NewAccountSheet} from "@/features/accounts/components/new-account-sheet";

export const SheetProvider = () => {
    
    const mountState = useMountedState();

    if(!mountState){
        return null;
    }
    
    return (
        <>
        <NewAccountSheet />
        </>
    )
}

