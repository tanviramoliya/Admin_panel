import React from "react";
import CountryTable from "./countryTable";
import { Breadcrumb, SimpleCard } from "matx";

const countryList = [
  {
    name: "India",
    isActive : true,   
  },
  {
    name: "US",
    isActive : true,   
  },
  {
    name: "Uk",
    isActive : true,   
  },
  {
    name: "china",
    isActive : false,   
  },
  {
    name: "Arebia",
    isActive : true,   
  },
  {
    name: "bhutan",
    isActive : true,   
  },
  {
    name: "Bangladesh",
    isActive : true,   
  },
  {
    name: "canada",
    isActive : true,   
  },
  {
    name: "russia",
    isActive : true,   
  }
];

const country = () => {
  return (
    <div className="m-sm-30">
      <div  className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Master", path: "/master" },
            { name: "Country" }
          ]}
        />
      </div>
      <div className="py-12" />
      <SimpleCard title="Country Information">
        <CountryTable countryList={countryList}/>
      </SimpleCard>
    </div>
  );
};

export default country;
