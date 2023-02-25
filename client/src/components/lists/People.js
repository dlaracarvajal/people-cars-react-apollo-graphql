import { useQuery } from "@apollo/client";
import { Divider, List } from "antd";
import { GET_PEOPLE } from "../../queries";
import PersonCard from "../listItems/PersonCard";

const People = () => {
  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Divider>Records</Divider>
      <List grid={{ gutter: 20, column: 1 }}>
        {data.people.map(({ id, firstName, lastName }) => (
          <List.Item key={id}>
            <PersonCard
              key={id}
              id={id}
              firstName={firstName}
              lastName={lastName}
            />
          </List.Item>
        ))}
      </List>
    </>
  );
};

export default People;
