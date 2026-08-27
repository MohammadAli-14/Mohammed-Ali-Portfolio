import React from "react";
import AntigravityIcon from "../../AntigravityIcon";

const TechIconCardExperience = ({ model, imgPath, name }) => {
  return (
    <AntigravityIcon
      src={imgPath || model?.imgPath}
      alt={name || model?.name || "Tech"}
      name={name || model?.name}
      size="lg"
    />
  );
};

export default React.memo(TechIconCardExperience);
