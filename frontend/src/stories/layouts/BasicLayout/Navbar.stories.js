
import React from 'react';

import Navbar from "main/layouts/BasicLayout/Navbar";
import ContextTemplate from "stories/storyutils/ContextTemplate"

export default {
    title: 'layouts/BasicLayout/Navbar',
    component: Navbar
};

const NavbarInContext = ContextTemplate(Navbar);

const Template = () => {
    return (
        <NavbarInContext />
    )
};

export const Default = Template.bind({});