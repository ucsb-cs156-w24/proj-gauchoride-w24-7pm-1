import React from 'react';
import { Badge } from "react-bootstrap";

export default function RoleBadge(props) {
    const {role} = props;
  return (
     role ?
        <Badge className="bg-primary">{role}</Badge> 
        :
        <span>Loading role...</span>
  );
}