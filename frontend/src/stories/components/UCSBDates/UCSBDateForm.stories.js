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
    submitAction: () => { console.log("Submit was clicked");}
};
