import { riderApplicationFixtures } from 'fixtures/riderApplicationFixtures';
import RiderApplicationShowForm from "main/components/RiderApplication/RiderApplicationShowForm";


export default {
    title: 'components/RiderApplication/RiderApplicationShowForm',
    component: RiderApplicationShowForm
};

const Template = (args) => {
    return (
        <RiderApplicationShowForm {...args} />
    )
};


export const Default = Template.bind({});

Default.args = {
    submitText: "Create",
    submitAction: () => { console.log("Submit was clicked"); }
};

export const Show = Template.bind({});

Show.args = {
    intitialContents: riderApplicationFixtures.oneApplication,
    submitText: "Create",
    submitAction: () => { console.log("Submit was clicked"); }
};