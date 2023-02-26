import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { GET_PERSON_WITH_CARS } from "../../queries";
import { Card, Divider } from "antd";
import CurrencyFormat from "react-currency-format";

const ShowPage = () => {
  const { id } = useParams();
  console.log(id);

  const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { personId: id },
  });
  console.log(loading, error, data);

  if (loading) return "Loading...";
  if (error) {
    return (
      <div>
        <p>Error! {error.message}</p>
        <Link to={`/`}>Go Back Home</Link>
      </div>
    );
  }

  const person = data.personWithCars.person;
  const cars = data.personWithCars.cars;

  return (
    <>
      <Card title={`${person.firstName} ${person.lastName} `}>
        {cars.map(({ id, year, make, model, price }) => (
          <Card
            key={id}
            title={`${year} ${make} ${model}`}
            extra={
              <CurrencyFormat
                value={price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            }
            type="inner"
            style={{ marginTop: "1rem" }}
          />
        ))}
      </Card>
      <Divider />
      <Link to={`/`}>Go Back Home</Link>
    </>
  );
};

export default ShowPage;
