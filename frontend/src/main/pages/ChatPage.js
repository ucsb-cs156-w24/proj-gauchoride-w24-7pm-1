import React from 'react';
import ChatPanel from 'main/components/ChatMessage/ChatPanel';
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";

const ChatPage = () => {
    return (
        <BasicLayout>
        <div className="chat-page">
            <h1>Chat Page</h1>
            <ChatPanel />
        </div>
        </BasicLayout>
    );
}

export default ChatPage;