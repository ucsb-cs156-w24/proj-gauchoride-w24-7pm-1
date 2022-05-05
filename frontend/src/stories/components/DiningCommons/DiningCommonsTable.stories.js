import React from 'react';

import DiningCommonsTable from "main/components/DiningCommons/DiningCommonsTable";
import { diningCommonsFixtures } from 'fixtures/diningCommonsFixtures';

export default {
    title: 'components/DiningCommons/DiningCommonsTable',
    component: DiningCommonsTable
};

const Template = (args) => {
    return (
        <DiningCommonsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    diningCommons: []
};

export const ThreeDates = Template.bind({});

ThreeDates.args = {
    diningCommons: diningCommonsFixtures.threeCommons
};


