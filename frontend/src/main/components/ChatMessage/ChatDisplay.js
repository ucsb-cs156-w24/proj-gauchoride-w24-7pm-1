import React, { useState } from 'react';
import { Button, Stack } from 'react-bootstrap';
import ChatMessageDisplay from './ChatMessageDisplay';
import { useBackend } from 'main/utils/useBackend';

const ChatDisplay = () => {
  const testId = 'ChatDisplay';
  const refreshIntervalMilliseconds = 1000;
  const pageSize = 10;

  const [selectedPage, setSelectedPage] = useState(0);

  // Stryker disable all
  const {
    data: page,
    
  } = useBackend(
    ["/api/chat/get"],
    {
      method: "GET",
      url: "/api/chat/get",
      params: {
        page: selectedPage,
        size: pageSize,
      }
    },
    {
      content: [], totalPages: 0
    },
    { refetchInterval: refreshIntervalMilliseconds }
  );

  // Stryker restore all

  const previousPageCallback = () => {
    setSelectedPage((prevPage) => prevPage - 1);
  };

  const nextPageCallback = () => {
    setSelectedPage((prevPage) => prevPage + 1);
  };
  
  return (
    <div>
      <Stack>
        {[...page.content].reverse().map((message) => (
          <ChatMessageDisplay key={message.chatMessage.id} chatMessage={message} />
        ))}
      </Stack>
      <p>Page: {selectedPage + 1}</p>
      <Button
        data-testid={`${testId}-previous-button`}
        onClick={previousPageCallback}
        disabled={selectedPage === 0}
      >
        Previous
      </Button>
      <Button
        data-testid={`${testId}-next-button`}
        onClick={nextPageCallback}
        disabled={page.totalPages === 0 || selectedPage === page.totalPages - 1}
      >
        Next
      </Button>
    </div>
  );
};

export default ChatDisplay;
