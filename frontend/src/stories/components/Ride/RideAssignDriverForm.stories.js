import React from 'react';
import RideFormAssignDriverForm from "main/components/Ride/RideAssignDriverForm"
import { rideFixtures } from 'fixtures/rideFixtures';

export default {
    title: 'components/Ride/RideAssignDriverForm',
    component: RideFormAssignDriverForm
};

const Template = (args) => {
    return (
        <RideFormAssignDriverForm {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    initialContents: rideFixtures.threeRides[0],
    buttonLabel: "Assign Driver",
    submitAction: (data) => {
        console.log("Submit was clicked with data: ", data); 
        window.alert("Submit was clicked with data: " + JSON.stringify(data));
   }
};