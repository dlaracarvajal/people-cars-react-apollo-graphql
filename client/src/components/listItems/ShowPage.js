import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_PEOPLE } from "../../queries";
import PersonCard from "./PersonCard";
import { Link } from "react-router-dom";

const PersonPage = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_PEOPLE, {
    variables: { id },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const person = data.people.find((person) => person.id === id);

  if (!person) {
    return (
      <div>
        <p>Person not found.</p>
        <Link to={`/`}>Go Back Home</Link>
      </div>
    );
  }

  return (
    <>
      <PersonCard
        id={person.id}
        firstName={person.firstName}
        lastName={person.lastName}
      />
    </>
  );
};

export default PersonPage;
