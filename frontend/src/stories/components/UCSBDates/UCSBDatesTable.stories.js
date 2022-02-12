import React from 'react';

import UCSBDatesTable from "main/components/UCSBDates/UCSBDatesTable";
import { ucsbDatesFixtures } from 'fixtures/ucsbDatesFixtures';

export default {
    title: 'components/UCSBDates/UCSBDatesTable',
    component: UCSBDatesTable
};

const Template = (args) => {
    return (
        <UCSBDatesTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    dates: []
};

export const ThreeDates = Template.bind({});

ThreeDates.args = {
    dates: ucsbDatesFixtures.threeDates
};


