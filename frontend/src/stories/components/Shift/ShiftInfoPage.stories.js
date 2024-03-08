import React from 'react';

import ShiftInfoPage from 'main/pages/Shift/ShiftInfoPage';
import { shiftFixtures } from 'fixtures/shiftFixtures';

export default {
    title: 'pages/Shift/ShiftInfoPage',
    component: ShiftInfoPage
};

const Template = () => <ShiftInfoPage />;

export const Default = Template.bind({});

Default.args = {
    initialContents: shiftFixtures.oneShift
};