import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const orgData = {
  name: "CEO",
  children: [
    {
      name: "CTO",
      children: [
        { name: "Dev Team Lead" },
        { name: "QA Lead" },
      ],
    },
    {
      name: "CFO",
      children: [
        { name: "Finance Manager" },
        { name: "Accountant" },
      ],
    },
    {
      name: "COO",
      children: [
        { name: "Operations Manager" },
        { name: "HR Manager" },
      ],
    },
  ],
};

const OrgChartNode = ({ node }) => {
  return (
    <div className="flex flex-col items-center m-4">
      <Card className="shadow-md p-2">
        <CardContent>
          <Typography variant="h6" className="text-center">
            {node.name}
          </Typography>
        </CardContent>
      </Card>
      {node.children && (
        <div className="flex mt-4 space-x-4 border-t-2 border-gray-300 pt-4">
          {node.children.map((child, index) => (
            <OrgChartNode key={index} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const OrgChart = () => {
  return (
    <div className="flex justify-center items-center min-h-screen p-8">
      <OrgChartNode node={orgData} />
    </div>
  );
};

export default OrgChart;
