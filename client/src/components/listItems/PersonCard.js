import { useState } from "react";
import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import RemovePerson from "../buttons/RemovePerson";
import UpdatePerson from "../forms/UpdatePerson";
import Cars from "../lists/Cars";
import { Link, useLocation } from "react-router-dom";

const PersonCard = (props) => {
  const [id] = useState(props.id);
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [editMode, setEditMode] = useState(false);
  const location = useLocation();

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {editMode ? (
        <UpdatePerson
          id={props.id}
          firstName={props.firstName}
          lastName={props.lastName}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemovePerson id={id} />,
          ]}
        >
          {firstName} {lastName}
          {props.children}
          <Cars personId={id} />
          {location.pathname === "/" ? (
            <Link to={`/person/${id}`}>Learn More</Link>
          ) : (
            <Link to={`/`}>Go Back</Link>
          )}
        </Card>
      )}
    </div>
  );
};

export default PersonCard;
