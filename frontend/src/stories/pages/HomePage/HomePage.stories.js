
import React from 'react';

import HomePage from "main/pages/HomePage/HomePage";

import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import ContextTemplate from "stories/storyutils/ContextTemplate"

export default {
    title: 'pages/HomePage/HomePage',
    component: HomePage
};


const HomePageInContext = ContextTemplate(HomePage);
const Template = () => <HomePageInContext />;

// const Template = (args) =>  {
//     const queryClient = new QueryClient();
//     return (
//         <QueryClientProvider client={queryClient}>
//             <MemoryRouter>
//                 <HomePage {...args} />
//             </MemoryRouter>
//         </QueryClientProvider>
//     )
// };

export const Default = Template.bind({});




