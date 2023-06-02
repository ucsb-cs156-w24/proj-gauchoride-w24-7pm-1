import React from 'react';
import RiderTable from 'main/components/Rider/RiderTable';
import { riderFixtures } from 'fixtures/riderFixtures';

export default {
    title: 'components/Rider/RiderTable',
    component: RiderTable
};

const Template = (args) => {
    return (
        <RiderTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    ride: []
};


export const DriverThreeSubjectsNoButtons = Template.bind({});

DriverThreeSubjectsNoButtons.args = {
    ride: riderFixtures.threeRidesTable,
    //currentUser: "ROLE_DRIVER"
};


export const RiderThreeSubjectsWithButtons = Template.bind({});
RiderThreeSubjectsWithButtons.args = {
    ride: riderFixtures.threeRidesTable,
    //currentUser: "ROLE_USER"
};

export const AdminThreeSubjectsWithButtons = Template.bind({});
AdminThreeSubjectsWithButtons.args = {
    ride: riderFixtures.threeRidesTable,
    //currentUser: "ROLE_ADMIN"
};
