import { useQuery } from "@apollo/client";
import { GET_CARS } from "../../queries";

import { useState } from "react";
import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import RemoveCar from "../buttons/RemoveCar";
import UpdateCar from "../forms/UpdateCar";
import CurrencyFormat from "react-currency-format";

const getStyles = () => ({
  card: {
    marginTop: "1rem",
  },
});

const CarCard = (props) => {
  const [id] = useState(props.id);
  const [year, setYear] = useState(props.year);
  const [make, setMake] = useState(props.make);
  const [model, setModel] = useState(props.model);
  const [price, setPrice] = useState(props.price);
  const [editMode, setEditMode] = useState(false);
  const [personId, setPersonId] = useState(props.personId);
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_CARS, {
    variables: { personId },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case "year":
        setYear(value);
        break;
      case "make":
        setMake(value);
        break;
      case "model":
        setModel(value);
        break;
      case "price":
        setPrice(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      {editMode ? (
        <UpdateCar
          id={props.id}
          year={year}
          make={make}
          model={model}
          price={price}
          personId={personId}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          title={`${year} ${make} ${model}`}
          extra={
            <CurrencyFormat
              value={price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          }
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveCar id={id} personId={personId} />,
          ]}
          type="inner"
        />
      )}
    </>
  );
};

export default CarCard;
