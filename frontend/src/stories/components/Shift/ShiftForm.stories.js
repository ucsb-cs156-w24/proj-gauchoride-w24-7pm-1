import React from 'react';
import ShiftForm from "main/components/Shift/ShiftForm"
import { shiftFixtures } from 'fixtures/shiftFixtures';

export default {
    title: 'components/Shift/ShiftForm',
    component: ShiftForm
};

const Template = (args) => {
    return (
        <ShiftForm {...args} />
    )
};

export const Create = Template.bind({});

Create.args = {
    buttonLabel: "Create",
    submitAction: (data) => {
         console.log("Submit was clicked with data: ", data); 
         window.alert("Submit was clicked with data: " + JSON.stringify(data));
    }
};

export const Update = Template.bind({});

Update.args = {
    initialContents: shiftFixtures.threeShifts[0],
    buttonLabel: "Update",
    submitAction: (data) => {
        console.log("Submit was clicked with data: ", data); 
        window.alert("Submit was clicked with data: " + JSON.stringify(data));
   }
};