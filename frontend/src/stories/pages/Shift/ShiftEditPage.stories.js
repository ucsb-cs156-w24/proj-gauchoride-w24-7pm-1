import React from 'react';
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import { rest } from "msw";

import ShiftEditPage from "main/pages/Shift/ShiftEditPage";
import { shiftFixtures } from 'fixtures/shiftFixtures';

export default {
    title: 'pages/Shift/ShiftEditPage',
    component: ShiftEditPage
};

const Template = () => <ShiftEditPage storybook={true}/>;

export const Default = Template.bind({});
Default.parameters = {
    msw: [
        rest.get('/api/currentUser', (_req, res, ctx) => {
            return res( ctx.json(apiCurrentUserFixtures.userOnly));
        }),
        rest.get('/api/systemInfo', (_req, res, ctx) => {
            return res(ctx.json(systemInfoFixtures.showingNeither));
        }),
        rest.get('/api/shift', (_req, res, ctx) => {
            return res(ctx.json(shiftFixtures.threeShifts[0]));
        }),
        rest.put('/api/shift', async (req, res, ctx) => {
            var reqBody = await req.text();
            window.alert("PUT: " + req.url + " and body: " + reqBody);
            return res(ctx.status(200),ctx.json({}));
        }),
    ],
}



