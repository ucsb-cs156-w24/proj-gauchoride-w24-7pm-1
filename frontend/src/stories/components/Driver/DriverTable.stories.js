
import React from 'react';

import DriverTable from 'main/components/Driver/DriverTable';
import driverFixtures from 'fixtures/driverFixtures';

export default {
    title: 'components/Driver/DriverTable',
    component: DriverTable
};

const Template = (args) => {
    return (
        <DriverTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    drivers: []
};

export const DriverThreeSubjects = Template.bind({});

DriverThreeSubjects.args = {
    drivers: driverFixtures.threeDrivers,
};

