import React from 'react';
import Card from 'react-bootstrap/Card';

function ShiftInfo({ info }) {
  return (
    <Card data-testid="DriverInfo">
      <Card.Body>
          <Card.Title>{'Id: ' + info.id}</Card.Title>
          <Card.Title>{'Day: ' + info.day}</Card.Title>
          <Card.Title>{'Start: ' + info.shiftStart}</Card.Title>
          <Card.Title>{'End: ' + info.shiftEnd}</Card.Title>
          <Card.Title>{'Driver Id: ' + info.driverID}</Card.Title>
          <Card.Title>{'Driver Backup Id: ' + info.driverBackupID}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default ShiftInfo;