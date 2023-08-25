import React from 'react';

import ShiftEditPage from 'main/pages/Shift/ShiftEditPage';
import { shiftFixtures } from 'fixtures/shiftFixtures';

export default {
    title: 'pages/Ride/ShiftEditPage',
    component: ShiftEditPage
};

const Template = () => <ShiftEditPage />;

export const Default = Template.bind({});

Default.args = {
    initialContents: shiftFixtures.oneShift
};

