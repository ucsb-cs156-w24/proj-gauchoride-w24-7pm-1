
import React from 'react';

import ShiftTable from "main/components/Shift/ShiftTable";
import shiftFixtures from 'fixtures/shiftFixtures';

export default {
    title: 'components/Shift/ShiftTable',
    component: ShiftTable
};

const Template = (args) => {
    return (
        <ShiftTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    shift: []
};

export const ThreeShifts = Template.bind({});

ThreeShifts.args = {
    shift: shiftFixtures.threeShifts
};


