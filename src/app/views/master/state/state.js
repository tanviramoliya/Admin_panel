import React from "react";
import { Breadcrumb, SimpleCard } from "matx";
import StateTable from "./stateTable.js";
const stateList = [
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

const state = () => {
  return (
    <div className="m-sm-30">
      <div  className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Master", path: "/dashboard" },
            { name: "State" }
          ]}
        />
      </div>    
      <div className="py-12" />
      <SimpleCard title="State Information">
        <StateTable stateList={stateList} />
      </SimpleCard>
    </div>
  );
};

export default state;
