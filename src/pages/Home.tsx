import React, { useState } from "react";
import { GET_COUNTRIES } from "../queries";
import { GET_BY_CONTINENT } from "../queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Select from "react-select";

interface Country {
  name: string;
  code: string;
  continent: Continent;
}

interface Continent {
  code: string;
  name: string;
  countries: [Country];
}

interface Option {
  value: string;
  label: string;
}

type SingleValue<Option> = Option | null;

const Home = () => {
  const [selectedContinent, setSelectedContinent] = useState<
    undefined | string
  >();
  const [search, setSearch] = useState<string>("");
  const { data: countriesData, loading, error } = useQuery(GET_COUNTRIES);
  const { data: continentData } = useQuery(GET_BY_CONTINENT);

  const sortByContinent = () => {
    const continents =
      continentData &&
      continentData.continents.map((item: Continent) => {
        return {
          value: item.name,
          label: item.name,
        };
      });
    return continents;
  };

  const handleSelectedContinent = (selectedOption: SingleValue<Option>) => {
    if (!selectedOption) {
      selectedOption = {
        value: "",
        label: "",
      };
    }
    setSelectedContinent(selectedOption.label);
  };

  const searchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value.toLowerCase());
  };

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error! ${error.message}</p>;

  const options = sortByContinent();

  return (
    <div style={{ width: 500, margin: "0 auto", textAlign: "center" }}>
      <div>
        <h2>Countries</h2>
      </div>
      <div>
        <input
          type="text"
          placeholder="search by the name of the country"
          onChange={searchQueryChange}
          style={{ width: "100%", padding: "10px 5px", marginBottom: 10 }}
        />
        <Select
          options={options}
          onChange={handleSelectedContinent}
          isClearable
        />
      </div>
      {countriesData &&
        countriesData.countries
          .filter((item: Country) =>
            selectedContinent ? selectedContinent === item.continent.name : item
          )
          .filter(
            (item: Country) =>
              search === item.name.toLowerCase().substr(0, search.length)
          )
          .map((country: Country) => {
            return (
              <div
                key={country.code}
                style={{ display: "flex", justifyContent: "center", gap: 10 }}
              >
                <p style={{ fontWeight: "bold" }}>{country.name}</p>
                <Link to={`/${country.code}`} style={{ color: "black" }}>
                  <p>{country.code}</p>
                </Link>
              </div>
            );
          })}
    </div>
  );
};

export default Home;
