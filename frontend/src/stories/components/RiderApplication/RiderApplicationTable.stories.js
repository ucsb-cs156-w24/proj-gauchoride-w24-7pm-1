import React from 'react';
import RiderApplicationTable from 'main/components/RiderApplication/RiderApplicationTable';
import { riderApplicationFixtures } from 'fixtures/riderApplicationFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';

export default {
    title: 'components/RiderApplication/RiderApplicationTable',
    component: RiderApplicationTable
};

const Template = (args) => {
    return (
        <RiderApplicationTable {...args} />
    )
};

export const EmptyMember = Template.bind({});

EmptyMember.args = {
    riderApplications: [],
    currentUser: currentUserFixtures.memberOnly
};

export const EmptyAdmin = Template.bind({});

EmptyAdmin.args = {
    riderApplications: [],
    currentUser: currentUserFixtures.adminOnly
};


export const MemberThreeSubjectsWithButtons = Template.bind({});

MemberThreeSubjectsWithButtons.args = {
    riderApplications: riderApplicationFixtures.threeApplications,
    currentUser: currentUserFixtures.memberOnly
};

export const AdminThreeSubjectsWithButtons = Template.bind({});
AdminThreeSubjectsWithButtons.args = {
    riderApplications: riderApplicationFixtures.threeApplications,
    currentUser: currentUserFixtures.adminUser
};