import React, { } from 'react';
import { Stack } from 'react-bootstrap';
import ChatMessageCreate from './ChatMessageCreate';
import ChatDisplay from './ChatDisplay';


const ChatPanel = () => {
    return (
        <Stack gap={3}>
            <ChatDisplay />
            <ChatMessageCreate />
        </Stack>
    );
}

export default ChatPanel;