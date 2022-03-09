import React from "react";
import { GET_COUNTRY } from "../queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const CountryPage = () => {
  let { id } = useParams();
  const { data, loading, error } = useQuery(GET_COUNTRY, {
    variables: { ID: id },
  });

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error! ${error.message}</p>;
  const countryData = data.country;
  return (
    <div>
      <Link to="/" style={{ margin: 20 }}>
        Home
      </Link>
      <div style={{ width: 500, margin: "0 auto", textAlign: "center" }}>
        <p>Name: {countryData.name}</p>
        <p>Code: {countryData.code}</p>
        <p>Flag: {countryData.emoji}</p>
        <p>
          Language:{" "}
          {countryData && countryData.languages.map((value: any) => value.name)}
        </p>
      </div>
    </div>
  );
};

export default CountryPage;
