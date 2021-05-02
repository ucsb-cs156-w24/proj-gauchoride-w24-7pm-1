import React from 'react';
import { Badge } from "react-bootstrap";

export default function RoleBadge({role, currentUser}) {
   
  const roles = currentUser.root.roles.map( (o) => o.authority );

  return (
     roles.includes(role) ?
        <Badge className="bg-primary" data-testid={"role-badge"}>{role.replace("ROLE_","").toLowerCase()}</Badge> 
        :
        <span className="missing-role" data-testid={"missing-role"} data-missingrole={role}></span>
  );
}