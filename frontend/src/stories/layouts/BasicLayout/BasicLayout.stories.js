
import React from 'react';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import ContextTemplate from "stories/storyutils/ContextTemplate"

export default {
    title: 'layouts/BasicLayout/BasicLayout',
    component: BasicLayout
};


const BasicLayoutInContext = ContextTemplate(BasicLayout);

const Template = () => {
    return (
        <BasicLayoutInContext />
    )
};

export const Default = Template.bind({});