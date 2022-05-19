import React from 'react';

import DiningCommonsForm from "main/components/DiningCommons/DiningCommonsForm"
import { diningCommonsFixtures } from 'fixtures/diningCommonsFixtures';

export default {
    title: 'components/DiningCommons/DiningCommonsForm',
    component: DiningCommonsForm
};


const Template = (args) => {
    return (
        <DiningCommonsForm {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    buttonLabel: "Create",
    submitAction: (data) => { console.log('Create was clicked, parameter to submitAction=',data); }
};

export const Show = Template.bind({});

Show.args = {
    initialCommons: diningCommonsFixtures.oneDiningCommons,
    buttonLabel: "Update",
    submitAction: (data) => { console.log('Update was clicked, parameter to submitAction=',data); }
};
