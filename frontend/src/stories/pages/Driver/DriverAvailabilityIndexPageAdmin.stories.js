import React from 'react';

import DriverAvailabilityIndexPageAdmin from 'main/pages/Drivers/DriverAvailabilityIndexPageAdmin';
import { driverAvailabilityFixtures } from "fixtures/driverAvailabilityFixtures";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import { rest } from "msw";

export default {
    title: 'pages/Drivers/DriverAvailabilityIndexPageAdmin',
    component: DriverAvailabilityIndexPageAdmin
};

const Template = () => <DriverAvailabilityIndexPageAdmin />;

export const Empty = Template.bind({});
Empty.parameters = {
    msw: [
        rest.get('/api/currentUser', (_req, res, ctx) => {
            return res(ctx.json(apiCurrentUserFixtures.adminUser));
        }),
        rest.get('/api/systemInfo', (_req, res, ctx) => {
            return res(ctx.json(systemInfoFixtures.showingNeither));
        }),
        rest.get('/api/driverAvailability/admin/all', (_req, res, ctx) => {
            return res(ctx.json([]));
        }),
    ]
}

export const ThreeItemsAdminUser = Template.bind({});

ThreeItemsAdminUser.parameters = {
    msw: [
        rest.get('/api/currentUser', (_req, res, ctx) => {
            return res(ctx.json(apiCurrentUserFixtures.adminUser));
        }),
        rest.get('/api/systemInfo', (_req, res, ctx) => {
            return res(ctx.json(systemInfoFixtures.showingNeither));
        }),
        rest.get('/api/driverAvailability/admin/all', (_req, res, ctx) => {
            return res(ctx.json(driverAvailabilityFixtures.threeAvailability));
        }),
        rest.delete('/api/driverAvailability', (req, res, ctx) => {
            window.alert("DELETE: " + JSON.stringify(req.url));
            return res(ctx.status(200), ctx.json({}));
        }),
    ],
}
