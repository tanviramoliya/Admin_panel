import React from "react";
import CityTable from "./cityTable";
import { Breadcrumb, SimpleCard } from "matx";

const cityList = [
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

const city = () => {
  return (
    <div className="m-sm-30">
      <div  className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Master", path: "/master" },
            { name: "City" }
          ]}
        />
      </div>
      <div className="py-12" />
      <SimpleCard title="City Information">
        <CityTable cityList={cityList}/>
      </SimpleCard>
    </div>
  );
};

export default city;
