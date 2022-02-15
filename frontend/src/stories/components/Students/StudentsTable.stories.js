import React from 'react';

import StudentsTable from "main/components/Students/StudentsTable";
import { studentFixtures } from 'fixtures/studentFixtures';

export default {
    title: 'components/Students/StudentsTable',
    component: StudentsTable
};

const Template = (args) => {
    return (
        <StudentsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    students: []
};

export const TwoStudents = Template.bind({});

TwoStudents.args = {
    students: studentFixtures.twoStudents
};


