import * as React from 'react';
import SVG from 'react-inlinesvg';
import Icon from "../Icon/Icon";
import {useState} from "react";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader/CardHeader";
import CardBody from "../Card/CardBody/CardBody";

export interface ILightComponentProps {
  id: string;
  description: string;
  dimmingValue: number;
  onClick?: (e) => void;
  onNewValueSubmit?: (id:string, value:number) => void;
  onDelete?: (id:string) => void;
}

const LightComponent: React.FC<ILightComponentProps> = props => {

    const [inputDimmingValue, setInputDimmingValue] = useState<number>();
    const [isEditMode, setEditMode] = useState<boolean>(false);
    const {
        id,
        description,
        dimmingValue,
        onDelete,
    } = props;

    const className = "";

    const handleChange = (event) => {
        setInputDimmingValue(event.target.value);
    };

    const onClickEdit = () =>{
        setEditMode(!isEditMode);
    };

    const onSubmit= async (event) => {
        setEditMode(false);
        props.onNewValueSubmit(id,inputDimmingValue)
    };
    const onClickDown= async (event) => {
        if(dimmingValue-5<0){
            props.onNewValueSubmit(id,0);
        } else {
            props.onNewValueSubmit(id,dimmingValue - 5)
        }
    };
    const onClickUp= async (event) => {
        if(dimmingValue+5>=100){
            props.onNewValueSubmit(id,100);
        } else {
            props.onNewValueSubmit(id,dimmingValue + 5);
        }

    };

    const iconText  = () => {
        if(dimmingValue>=70 && dimmingValue<=100){
            return "party";
        }
        if(dimmingValue>=1 && dimmingValue<=70){
            return "lightOn";
        }
        if(dimmingValue>=1 && dimmingValue<=70){
            return "lightOff";
        }
        return "lightOff"
    };
    return(
        <Card id={"blindcomponent-${id}"} plain={true}>
            <CardHeader title={description} icon={iconText()}>
                <button onClick={onClickUp}>
                    <Icon icon={"plus"}/>
                </button>
                <button onClick={onClickDown}>
                    <Icon icon={"minus"}/>
                </button>
                <button className={"BlindHeader__settingsButton"} onClick={onClickEdit}>
                    <Icon icon={"settings"}/>
                </button>
                <button className={"BlindHeader__deleteButton"} onClick={() => onDelete(id)}>
                    <Icon icon={"deleteIcon"}/>
                </button>
            </CardHeader>
            <CardBody>Dimming value: {dimmingValue}%
                {isEditMode && <form onSubmit={onSubmit}>
                    <label>
                        Input the new dimming value you want to have for the light:
                        <input pattern="[0-9]*" min="0" max="100" type="number" value={inputDimmingValue} onChange={handleChange}/>
                    </label>
                    <input type="submit" value={"submit"}/>
                </form>}
            </CardBody>
        </Card>
    )

};


export default LightComponent;
