import { useQuery } from "@apollo/client";
import { List } from "antd";
import { GET_CARS } from "../../queries";
import CarCard from "../listItems/CarCard";

const Cars = ({ personId }) => {
  const { loading, error, data } = useQuery(GET_CARS, {
    variables: { personId },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <List grid={{ gutter: 20, column: 1 }}>
        {data.cars
          .filter((car) => car.personId === personId)
          .map(({ id, year, make, model, price, personId }) => (
            <List.Item key={id}>
              <CarCard
                key={id}
                id={id}
                year={year}
                make={make}
                model={model}
                price={price}
                personId={personId}
              />
            </List.Item>
          ))}
      </List>
    </>
  );
};

export default Cars;
