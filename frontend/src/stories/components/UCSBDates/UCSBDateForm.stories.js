import React from 'react';

import UCSBDateForm from "main/components/UCSBDates/UCSBDateForm"

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
    ucsbDate: {
        "id": 1,
        "quarterYYYYQ": "20221",
        "name": "Noon on January 2nd",
        "localDateTime": "2022-01-02T12:00:00"
    },
    submitText: "",
    submitAction: () => { }
};
