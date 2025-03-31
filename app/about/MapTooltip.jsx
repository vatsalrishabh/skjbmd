"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import IndiaMap from "@svg-maps/india";
import * as Tooltip from "@radix-ui/react-tooltip";

const stateLeaders = {
  "Uttar Pradesh": { pradeshAdhyaksh: "Yogi Adityanath", rashtriyaAdhyaksh: "Amit Shah" },
  "Maharashtra": { pradeshAdhyaksh: "Devendra Fadnavis", rashtriyaAdhyaksh: "JP Nadda" },
  "Karnataka": { pradeshAdhyaksh: "Basavaraj Bommai", rashtriyaAdhyaksh: "Amit Shah" },
};

const MapTooltip = () => {
  const [hoveredState, setHoveredState] = useState(null);

  return (
    <div className="relative flex justify-center">
      <IndiaMap
        className="w-full max-w-3xl"
        onMouseEnter={(event) => {
          const stateName = event.target.getAttribute("aria-label");
          if (stateName && stateLeaders[stateName]) {
            setHoveredState(stateName);
          }
        }}
        onMouseLeave={() => setHoveredState(null)}
      />

      {hoveredState && (
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <div className="absolute z-50 p-3 bg-white border border-gray-300 shadow-lg rounded-md">
              <p className="font-bold text-gray-700">{hoveredState}</p>
              <p className="text-sm text-gray-600">
                Pradesh Adhyaksh: {stateLeaders[hoveredState].pradeshAdhyaksh}
              </p>
              <p className="text-sm text-gray-600">
                Rashtriya Adhyaksh: {stateLeaders[hoveredState].rashtriyaAdhyaksh}
              </p>
            </div>
          </Tooltip.Trigger>
        </Tooltip.Root>
      )}
    </div>
  );
};

export default MapTooltip;
