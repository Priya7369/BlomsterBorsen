import React from "react";
import ForestOwner from "./ForestOwner/ForestOwner";
import BotanicalOwner from "./BontanicalOwner/BotanicalOwner";

const HomeComponent = ({ role }) => {
  return <>{role === "Forest Owner" ? <ForestOwner /> : <BotanicalOwner />}</>;
};

export default HomeComponent;
