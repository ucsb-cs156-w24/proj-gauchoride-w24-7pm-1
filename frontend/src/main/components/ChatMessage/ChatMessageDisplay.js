import React from 'react';
import Card from 'react-bootstrap/Card';

function ChatMessageDisplay({ chatMessage }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{chatMessage.payload}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{chatMessage.timestamp}</Card.Subtitle>
        <Card.Text>
          User ID: {chatMessage.userId}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ChatMessageDisplay;