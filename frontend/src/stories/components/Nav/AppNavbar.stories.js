
import React from 'react';

import AppNavbar from "main/components/Nav/AppNavbar";

export default {
    title: 'components/Nav/AppNavbar',
    component: AppNavbar
};


const Template = (args) => {
    return (
        <AppNavbar {...args} />
    )
};

export const noRole = Template.bind({});

export const admin = Template.bind({});
admin.args = {
    currentUser: {
        data: {
            root: {
                rolesList: [
                    "ROLE_ADMIN"
                ]
            }
        }
    }
};

export const localhost3000 = Template.bind({});
localhost3000.args = {
    currentUrl: "http://localhost:3000"
};

export const localhostNumeric3000 = Template.bind({});
localhostNumeric3000.args = {
    currentUrl: "http://127.0.0.1:3000"
};

export const localhost8080 = Template.bind({});
localhost8080.args = {
    currentUrl: "http://localhost:8080"
};

export const h2ConsoleEnabled = Template.bind({});
h2ConsoleEnabled.args = {
    systemInfo: {
        springH2ConsoleEnabled: true
    }
}

export const showSwaggerUiLink = Template.bind({});
showSwaggerUiLink.args = {
    systemInfo: {
        showSwaggerUiLink: true
    }
}

