import React from 'react';
import { render, screen } from '@testing-library/react';
import ShiftInfo from 'main/components/Shift/ShiftInfo';
import shiftFixtures from 'fixtures/shiftFixtures';

describe('ShiftInfo test', () => {
    test('renders shift information correctly', () => {
    render(<ShiftInfo info={shiftFixtures.oneShift[0]} />);

        const card = screen.getByTestId('DriverInfo');
        expect(card).toBeInTheDocument();

        expect(screen.getByText('Id: 1')).toBeInTheDocument();
        expect(screen.getByText('Day: Friday')).toBeInTheDocument();
        expect(screen.getByText('Start: 09:00AM')).toBeInTheDocument();
        expect(screen.getByText('End: 10:00AM')).toBeInTheDocument();
        expect(screen.getByText('Driver Id: 1')).toBeInTheDocument();
        expect(screen.getByText('Driver Backup Id: 2')).toBeInTheDocument();
    });
});