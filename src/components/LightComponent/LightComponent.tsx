import * as React from 'react';
import SVG from 'react-inlinesvg';
import Icon from "../Icon/Icon";

export interface ILightComponentProps {
  id: string;
  isOn: boolean;
  description: string;
  dimmingValue: number;
  onClick?: (e) => void;
}

const LightComponent: React.FC<ILightComponentProps> = props => {
  const {
    isOn,
    description,
    dimmingValue
  } = props;

  const className = "";

  return(
      <div className={"LightComponent__wrapper"}>
        <div><button onClick={this.handleAccordionOnClick(props)}> <Icon icon={`${isOn? 'lightOn': 'LightOff'}`} /> </button></div>
        <div></div>
      </div>
      )

};

const handleAccordionOnClick= (props:ILightComponentProps) => {
  // Send API to turn light off

};


export default LightComponent;
