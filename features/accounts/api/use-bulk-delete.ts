import {InferRequestType,InferResponseType} from "hono"
import {useMutation,useQueryClient} from"@tanstack/react-query"
import {client} from "@/lib/hono"
import {toast} from "sonner";

type ResponseType = InferResponseType<typeof client.api.accounts["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.accounts["bulk-delete"]["$post"]>["json"];

export const useBulkDeleteAccounts = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
    ResponseType,
    Error,
    RequestType>
    ({
        mutationFn: async (json) => {
            const response = await client.api.accounts["bulk-delete"]["$post"]({ json });
            const data: ResponseType = await response.json(); // Ensure the response is correctly parsed as JSON
            return data;
        },
        onSuccess: () =>{
            toast.success("Accounts Deleted");
            queryClient.invalidateQueries({queryKey: ["accounts"]});
        },

        onError: ()=>{
            toast.error("Failed to delete accounts");
        }
    });

    return mutation;
}
