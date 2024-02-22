import React from 'react';
import Card from 'react-bootstrap/Card';

function DriverInfo({ info }) {
  return (
    <Card data-testid="DriverInfo">
      <Card.Body>
      {info.isDriver ? (
          <Card.Title>{info.givenName + " " + info.familyName + ", Email: " + info.email}</Card.Title>
        ) : (
          <Card.Title>
            Searched user was not a driver
          </Card.Title>
        )}
      </Card.Body>
    </Card>
  );
}

export default DriverInfo;





