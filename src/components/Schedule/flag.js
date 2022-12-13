import React from "react";

const Flag = ({ country, isReverse }) => {
  const elements = [
    <span key="country">{country}</span>,
    <img
      key="flag"
      src={`https://countryflagsapi.com/png/${country.toLowerCase()}`}
      alt={country}
      width={53}
      height={37}
    />,
  ];
  const comp = isReverse ? elements.reverse() : elements;
  return comp;
};

export default Flag;
