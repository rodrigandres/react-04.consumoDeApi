import React from "react";
import { Card } from "react-bootstrap";

const CustomCard = ({ children }) => {
  return (
    <Card>
      <Card.Body>
        {children}
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
