import React from 'react';
import DriverAvailabilityTable from 'main/components/Driver/DriverAvailabilityTable';
import { driverAvailabilityFixtures } from 'fixtures/driverAvailabilityFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';

export default {
    title: 'components/Driver/DriverAvailabilityTable',
    component: DriverAvailabilityTable
};

const Template = (args) => {
    return (
        <DriverAvailabilityTable {...args} />
    )
};

export const EmptyDriver = Template.bind({});

EmptyDriver.args = {
    Availability: [],
    currentUser: currentUserFixtures.memberOnly
};

export const EmptyAdmin = Template.bind({});

EmptyAdmin.args = {
    Availability: [],
    currentUser: currentUserFixtures.adminOnly
};


export const DriverWithButtons = Template.bind({});

DriverWithButtons.args = {
    Availability: driverAvailabilityFixtures.threeAvailability,
    currentUser: currentUserFixtures.memberOnly
};

export const AdminWithButtons = Template.bind({});
AdminWithButtons.args = {
    Availability: driverAvailabilityFixtures.threeAvailability,
    currentUser: currentUserFixtures.adminUser
};