import React from 'react';
import ShiftInfo from 'main/components/Shift/ShiftInfo';
import { shiftFixtures } from 'fixtures/shiftFixtures';

export default {
    title: 'Components/ShiftInfo',
    component: ShiftInfo,
};

const Template = (args) => <ShiftInfo {...args} />;

export const Default = Template.bind({});
Default.args = {
    info: shiftFixtures.threeShifts[0],
};