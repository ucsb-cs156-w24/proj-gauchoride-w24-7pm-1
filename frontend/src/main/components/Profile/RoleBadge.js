import React from 'react';
import { Badge } from "react-bootstrap";

export default function RoleBadge({role, currentUser}) {
   
  const roles = currentUser.root.roles.map( (o) => o.authority );
  const stringToMatch = `ROLE_${role}`;


  return (
     roles.includes(stringToMatch) ?
        <Badge className="bg-primary">{role.toLowerCase()}</Badge> 
        :
        <span className="missing-role" data-missingRole={role}></span>
  );
}