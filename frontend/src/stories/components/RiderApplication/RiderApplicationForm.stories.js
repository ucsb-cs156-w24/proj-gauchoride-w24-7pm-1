import React from 'react';
import RiderApplicationForm from "main/components/RiderApplication/RiderApplicationForm";
import { riderApplicationFixtures } from 'fixtures/riderApplicationFixtures';


export default {
    title: 'components/RiderApplication/RiderApplicationForm',
    component: RiderApplicationForm
};

const Template = (args) => {
    return (
        <RiderApplicationForm {...args} />
    )
};


export const Default = Template.bind({});

Default.args = {
    submitText: "Create",
    submitAction: () => { console.log("Submit was clicked"); }
};

export const Show = Template.bind({});

Show.args = {
    intitialContents: riderApplicationFixtures.oneApplication,
    submitText: "Create",
    submitAction: () => { console.log("Submit was clicked"); }
};