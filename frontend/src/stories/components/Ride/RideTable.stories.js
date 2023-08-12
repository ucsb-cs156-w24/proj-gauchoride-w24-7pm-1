import React from 'react';
import RideTable from 'main/components/Ride/RideTable';
import { rideFixtures } from 'fixtures/rideFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';

export default {
    title: 'components/Ride/RideTable',
    component: RideTable
};

const Template = (args) => {
    return (
        <RideTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    ride: []
};


export const DriverThreeSubjectsNoButtons = Template.bind({});

DriverThreeSubjectsNoButtons.args = {
    ride: rideFixtures.threeRidesTable,
    currentUser: currentUserFixtures.driverOnly
};


export const RiderThreeSubjectsWithButtons = Template.bind({});
RiderThreeSubjectsWithButtons.args = {
    ride: rideFixtures.threeRidesTable,
    currentUser: currentUserFixtures.userOnly
};

export const AdminThreeSubjectsWithButtons = Template.bind({});
AdminThreeSubjectsWithButtons.args = {
    ride: rideFixtures.threeRidesTable,
    currentUser: currentUserFixtures.adminUser
};
