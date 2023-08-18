import React, { useState } from 'react';
import { Button, Stack } from 'react-bootstrap';
import ChatMessageDisplay from './ChatMessageDisplay';
import { useBackend } from 'main/utils/useBackend';

const ChatDisplay = () => {
  const testId = 'ChatDisplay';
  const refreshIntervalMilliseconds = 2000;
  const pageSize = 10;

  const [selectedPage, setSelectedPage] = useState(0);

  
  const {
    data: page,
    // Stryker disable all
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
    setSelectedPage(selectedPage - 1);
  };

  const nextPageCallback = () => {
    setSelectedPage(selectedPage + 1);
  };

  return (
    //<div style={{ height: '400px', overflowY: 'scroll' }}>
      <div>
      <Stack>
        {page.content.map((message) => (
          <ChatMessageDisplay key={message.id} chatMessage={message} />
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
