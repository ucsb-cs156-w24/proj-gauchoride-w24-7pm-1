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

export const EmptyMember = Template.bind({});

EmptyMember.args = {
    Availability: [],
    currentUser: currentUserFixtures.memberOnly
};

export const EmptyAdmin = Template.bind({});

EmptyAdmin.args = {
    Availability: [],
    currentUser: currentUserFixtures.adminOnly
};


export const MemberThreeSubjectsWithButtons = Template.bind({});

MemberThreeSubjectsWithButtons.args = {
    Availability: driverAvailabilityFixtures.threeAvailability,
    currentUser: currentUserFixtures.memberOnly
};

export const AdminThreeSubjectsWithButtons = Template.bind({});
AdminThreeSubjectsWithButtons.args = {
    Availability: driverAvailabilityFixtures.threeAvailability,
    currentUser: currentUserFixtures.adminUser
};