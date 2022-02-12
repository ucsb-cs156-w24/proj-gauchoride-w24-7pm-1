import React from 'react';

import UCSBDateForm from "main/components/UCSBDates/UCSBDateForm"
import { ucsbDatesFixtures } from 'fixtures/ucsbDatesFixtures';

export default {
    title: 'components/UCSBDates/UCSBDateForm',
    component: UCSBDateForm
};


const Template = (args) => {
    return (
        <UCSBDateForm {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    submitText: "Create",
    submitAction: () => { console.log("Submit was clicked"); }
};

export const Show = Template.bind({});

Show.args = {
    ucsbDate: ucsbDatesFixtures.oneDate,
    submitText: "",
    submitAction: () => { }
};
