import React from 'react';
import ChatDisplay from "main/components/ChatMessage/ChatDisplay";
import chatMessageFixtures from "fixtures/chatMessageFixtures";

export default {
  title: 'components/ChatDisplay',
  component: ChatDisplay,
};

export const Default = () => (
  <ChatDisplay
    messages={chatMessageFixtures.oneMessage} // Use your fixture data here
    onPreviousClick={action('Previous clicked')}
    onNextClick={action('Next clicked')}
  />
);