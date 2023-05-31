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

export const ThreeSubjectsNoButtons = Template.bind({});

ThreeSubjectsNoButtons.args = {
    ride: riderFixtures.threeRides,
    showButtons: false
};

export const ThreeSubjectsWithButtons = Template.bind({});
ThreeSubjectsWithButtons.args = {
    ride: riderFixtures.threeRides,
    showButtons: true
};
