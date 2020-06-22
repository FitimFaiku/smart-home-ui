import * as React from 'react';
import Icon from "../Icon/Icon";

export interface IBlindProps {
  id: string;
  description: string;
  positionInPercent: number;
  onClick?: (e:any) => void;
}

const BlindComponent: React.FC<IBlindProps> = props => {
  const {
    description,
    positionInPercent
  } = props;

  const className = "";

  return(
      <div className={"LightComponent__wrapper"}>
        <div>${description}</div>
        <div>Position:${positionInPercent}</div>
      </div>
      )

};


export default BlindComponent;
