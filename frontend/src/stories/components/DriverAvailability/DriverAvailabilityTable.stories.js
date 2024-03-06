import React from 'react';

import DriverAvailabilityTable from "main/components/Driver/DriverAvailabilityTable";
import driverAvailabilityFixtures from 'fixtures/driverAvailabilityFixtures';

export default {
    title: 'components/DriverAvailability/DriverAvailabilityTable',
    component: DriverAvailabilityTable
};

const Template = (args) => {
    return (
        <DriverAvailabilityTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    Availability: []
};

export const ThreeAvailability = Template.bind({});

ThreeAvailability.args = {
    Availability: driverAvailabilityFixtures.threeAvailability
};
