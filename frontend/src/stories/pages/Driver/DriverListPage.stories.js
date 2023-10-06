import React from 'react';
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import { rest } from "msw";

import DriverListPage from "main/pages/DriverListPage";

export default {
    title: 'pages/Driver/DriverListPage',
    component: DriverListPage
};

const Template = () => <DriverListPage/>;

export const Empty = Template.bind({});
Empty.parameters = {
    msw: [
        rest.get('/api/currentUser', (_req, res, ctx) => {
            return res(ctx.json(apiCurrentUserFixtures.driverOnly));
        }),
        rest.get('/api/systemInfo', (_req, res, ctx) => {
            return res(ctx.json(systemInfoFixtures.showingNeither));
        }),
        rest.get('/api/drivers/all', (_req, res, ctx) => {
            return res(ctx.json([]));
        }),
    ]
}
