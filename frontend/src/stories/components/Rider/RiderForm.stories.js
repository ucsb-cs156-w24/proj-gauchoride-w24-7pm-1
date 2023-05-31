import React from 'react';
import RiderForm from "main/components/Rider/RiderForm"
import { riderFixtures } from 'fixtures/riderFixtures';

export default {
    title: 'components/Rider/RiderForm',
    component: RiderForm
};

const Template = (args) => {
    return (
        <RiderForm {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    submitText: "Create",
    submitAction: () => { console.log("Submit was clicked"); }
};

export const Show = Template.bind({});

Show.args = {
    Rider: riderFixtures.oneRide,
    submitText: "",
    submitAction: () => { }
};