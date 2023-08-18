import React from 'react';
import ChatDisplay from "main/components/ChatMessage/ChatDisplay";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import chatMessageFixtures from "fixtures/chatMessageFixtures";
import { rest } from "msw";

export default {
  title: 'components/ChatDisplay',
  component: ChatDisplay,
};

const Template = (args) => <ChatDisplay {...args} />;

//const Template = () => <HelpRequestCreatePage storybook={true} />;

export const Empty = Template.bind({});
Empty.parameters = {
    msw: [
        rest.get('/api/currentUser', (_req, res, ctx) => {
            return res(ctx.json(apiCurrentUserFixtures.userOnly));
        }),
        rest.get('/api/systemInfo', (_req, res, ctx) => {
            return res(ctx.json(systemInfoFixtures.showingNeither));
        }),
        rest.get('/api/chat/get', (_req, res, ctx) => {
            return res(ctx.json([]));
        }),
    ]
}

export const ThreeItemsOrdinaryUser = Template.bind({});

ThreeItemsOrdinaryUser.parameters = {
    msw: [
        rest.get('/api/currentUser', (_req, res, ctx) => {
            return res( ctx.json(apiCurrentUserFixtures.userOnly));
        }),
        rest.get('/api/systemInfo', (_req, res, ctx) => {
            return res(ctx.json(systemInfoFixtures.showingNeither));
        }),
        rest.get('/api/chat/get', (_req, res, ctx) => {
            return res(ctx.json(chatMessageFixtures.threeMessages));
        }),
    ],
}

