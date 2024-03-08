import React from 'react';

import DriverAvailabilityEditPage from 'main/pages/Ride/DriverAvailabilityEditPage';
import driverAvailabilityFixtures from 'fixtures/driverAvailabilityFixtures';

export default {
    title: 'pages/Driver/DriverAvailabilityEditPage',
    component: DriverAvailabilityEditPage
};

const Template = () => <DriverAvailabilityEditPage />;

export const Default = Template.bind({});

Default.args = {
    initialContents: driverAvailabilityFixtures.oneAvailability
};




