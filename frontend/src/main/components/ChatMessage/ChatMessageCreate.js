
import ChatMessageForm from "main/components/ChatMessage/ChatMessageForm";
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function RideRequestCreatePage() {

    const objectToAxiosParams = (chatMessage) => ({
        url: "/api/chat/post",
        method: "POST",
        params: {
            content: chatMessage.content
        }
    });

    const onSuccess = () => {
        toast('Message sent');
    }

    const mutation = useBackendMutation(
        objectToAxiosParams,
        { onSuccess },
        // Stryker disable next-line all : hard to set up test for caching
        ["/api/chat/get"]
    );

    const onSubmit = async (data) => {
        mutation.mutate(data);
    }

    return (
        
        <div className="pt-2">
            <h1>Send</h1>
            <ChatMessageForm submitAction={onSubmit} />
        </div>
        
    )
}