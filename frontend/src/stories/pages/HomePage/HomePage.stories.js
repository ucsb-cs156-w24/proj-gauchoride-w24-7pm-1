
import React from 'react';

import HomePage from "main/pages/HomePage/HomePage";

import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

export default {
    title: 'pages/HomePage/HomePage',
    component: HomePage
};

const Template = () => <HomePage />;

export const Default = Template.bind({});




