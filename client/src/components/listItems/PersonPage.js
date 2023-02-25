import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_PEOPLE } from "../../queries";
import PersonCard from "./PersonCard";
import Cars from "../lists/Cars";

const PersonPage = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const person = data.people.find((p) => p.id === id);

  if (!person) return "Person not found.";

  return (
    <div>
      <PersonCard firstName={person.firstName} lastName={person.lastName}>
        <Cars personId={person.id} />
      </PersonCard>
    </div>
  );
};

export default PersonPage;


