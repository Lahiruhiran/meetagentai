import { CommandDialog, CommandInput, CommandItem } from "@/components/ui/command"
import { CommandList } from "cmdk";
import { Dispatch, SetStateAction } from "react";


interface props { 
    open: boolean;
    setOpen : Dispatch<SetStateAction<boolean>>;
}
export const DashBoardCommand = ({open , setOpen}: props) => { 
    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput
            placeholder="Find a meeting or Agent"
            />
            <CommandList>
                <CommandItem>
                    Test
                </CommandItem>
            </CommandList>
        </CommandDialog>
    )
}