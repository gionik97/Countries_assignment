import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query GET_COUNTRIES {
    countries {
      name
      code
      continent {
        name
      }
    }
  }
`;

export const GET_COUNTRY = gql`
  query GET_COUNTRY($ID: ID!) {
    country(code: $ID) {
      name
      code
      emoji
      languages {
        name
      }
    }
  }
`;

export const GET_BY_CONTINENT = gql`
  query GET_BY_CONTINENT {
    continents {
      name
      code
      countries {
        name
      }
    }
  }
`;
