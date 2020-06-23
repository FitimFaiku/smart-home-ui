import * as React from 'react';
import Icon from "../Icon/Icon";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader/CardHeader";
import CardBody from "../Card/CardBody/CardBody";
import {useState} from "react";
import BlindApi from "../../api/blind/Blind.api";

export interface IBlindProps {
  id: string;
  description: string;
  positionInPercent: number;
  onClick?: (e:any) => void;
    onNewValueSubmit?: (id:string, value:number) => void;
  onDelete?: (id:string) => void;
}

const BlindComponent: React.FC<IBlindProps> = props => {

    const [inputValue, setInputValue] = useState<number>();
    const [isEditMode, setEditMode] = useState<boolean>(false);
    const {
        id,
        description,
        positionInPercent,
        onDelete,
    } = props;

    const className = "";

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const onClickEdit = () =>{
        setEditMode(!isEditMode);
    };

    const onSubmit= async (event) => {
        setEditMode(false);
        props.onNewValueSubmit(id,inputValue)
    };
    const onClickDown= async (event) => {
        if(positionInPercent-5<0){
            props.onNewValueSubmit(id,0);
        } else {
            props.onNewValueSubmit(id,positionInPercent - 5)
        }
    };
    const onClickUp= async (event) => {
        if(positionInPercent+5>=100){
            props.onNewValueSubmit(id,100);
        } else {
            props.onNewValueSubmit(id,positionInPercent + 5);
        }

    };

    return(
        <Card id={"blindcomponent-${id}"} plain={true}>
            <CardHeader title={description} icon={"blinds"}>
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
            <CardBody>Position in percent: {positionInPercent}%
                {isEditMode && <form onSubmit={onSubmit}>
                    <label>
                        Input the new blind value you want to have :
                        <input pattern="[0-9]*" min="0" max="100" type="number" value={inputValue} onChange={handleChange}/>
                    </label>
                    <input type="submit" value={"submit"}/>
                </form>}
            </CardBody>
        </Card>
    )

};


export default BlindComponent;
