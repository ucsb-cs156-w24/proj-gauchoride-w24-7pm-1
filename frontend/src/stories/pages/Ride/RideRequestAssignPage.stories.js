import React from 'react';

import RideRequestAssignPage from 'main/pages/Ride/RideRequestAssignPage';
import { rideFixtures } from 'fixtures/rideFixtures';

export default {
    title: 'pages/Ride/RideRequestAssignPage',
    component: RideRequestAssignPage
};

const Template = () => <RideRequestAssignPage />;

export const Default = Template.bind({});

Default.args = {
    initialContents: rideFixtures.oneRide
};