import * as React from 'react';
import BlindApi from "../../api/blind/Blind.api";
import {IBlindInterface} from "../../api/blind/Blind.interface";
import BlindComponent from "../../components/BlindComponent/BlindComponent";
import {useEffect, useState} from "react";
import Section from "../../components/Section/Section";

const Blind: React.FC = () => {
  const [blindObjects, setBlindObjects] = useState<IBlindInterface[]>();
  const [wantsToAdd, setWantsToAdd] = useState<boolean>(true);
  const [inputDescription, setInputDescription] = useState<string>();
  const [inputValue, setInputValue] = useState<number>();

  useEffect(() => {
    fetchBlinds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const fetchBlinds = async () => {
    const response:IBlindInterface[] = await BlindApi.fetchBlinds();
    setBlindObjects(response)
  };

  const onDelete = async (id:string) => {
    const newArray = blindObjects.filter(obj =>{
      return obj.id != id;
    });
    console.log("New Array ", newArray);
    setBlindObjects(newArray);
    await BlindApi.deleteBlind(id);

  };

  const createBlinds = () => {
    if(blindObjects!= undefined && blindObjects != null){
      return blindObjects.map((blindObject:IBlindInterface, i) => {
        return <BlindComponent key={i} id={blindObject.id} description={blindObject.description} positionInPercent={blindObject.positionInPercent} onDelete={onDelete} onNewValueSubmit={onNewValueSubmit}/>;
      });
    }

  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("des", inputDescription);
    if(inputDescription !== undefined && inputDescription !== ""){
      const blind:IBlindInterface = {
        description :inputDescription,
        positionInPercent:inputValue
      };
      await BlindApi.addBlind(blind);
      await fetchBlinds();
    }
  };

  const onNewValueSubmit = async (id:string, value:number) => {
    console.log("Bin hier onNewValueSubmit");
    const newArray:IBlindInterface[] = blindObjects.map(obj => {
      if(obj.id === id){
        obj.positionInPercent = value;
      }
      return obj
    });
    setBlindObjects(newArray);
    await BlindApi.setBlindPosition(id, value);


  };

  const handleChange = (event) => {
    if(event.target != null && event.target.name === "inputDescription"){
      setInputDescription(event.target.value)
    }
    if(event.target != null && event.target.name === "inputValue"){
      setInputValue(event.target.value)
    }
  };

  return (
      <Section id={"Blind"} title={"Blinds"} color={"warmgrey"}>

        <form onSubmit={onSubmit}>
          <div className={"Blind__form"}>
            <div>
              <label>
                Input the description of the Blind:
              </label>
              <input name="inputDescription" type="text" value={inputDescription} onChange={handleChange}/>
            </div>
            <div>
              <label>
                Input the initial value of the Blinds (0-100):
              </label>
              <input pattern="[0-9]*" min="0" max="100"  name="inputValue" type="number" value={inputValue} onChange={handleChange}/>
            </div>
            <div>
              <input type="submit" value={"Add new Blind"}/>
            </div>
          </div>
        </form>
        {createBlinds()}
      </Section>
  );



};

export default Blind;
