import React from 'react';
import ChatDisplay from "main/components/ChatMessage/ChatDisplay";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import { firstPagedChatFixtures } from "fixtures/chatMessageFixtures";
import { rest } from "msw";

export default {
  title: 'components/ChatDisplay',
  component: ChatDisplay,
};

const Template = (args) => <ChatDisplay {...args} />;

//const Template = () => <HelpRequestCreatePage storybook={true} />;

export const Default = Template.bind({});
Default.parameters = {
    msw: [
        rest.get('/api/currentUser', (_req, res, ctx) => {
            return res(ctx.json(apiCurrentUserFixtures.adminUser));
        }),
        rest.get('/api/systemInfo', (_req, res, ctx) => {
            return res(ctx.json(systemInfoFixtures.showingNeither));
        }),
        rest.get('/api/chat/get', (_req, res, ctx) => {
            return res(ctx.json({
                content: [], totalPages: 0
                },));
        }),
    ]
}

export const onePage = Template.bind({});

onePage.parameters = {
    msw: [
        rest.get('/api/currentUser', (_req, res, ctx) => {
            return res( ctx.json(apiCurrentUserFixtures.adminUser));
        }),
        rest.get('/api/systemInfo', (_req, res, ctx) => {
            return res(ctx.json(systemInfoFixtures.showingNeither));
        }),
        rest.get('/api/chat/get', (_req, res, ctx) => {
            return res(ctx.json(firstPagedChatFixtures));
        }),
    ],
}

