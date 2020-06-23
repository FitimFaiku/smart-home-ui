import * as React from 'react';
import {useState} from "react";
import {IBlindInterface} from "../../api/blind/Blind.interface";
import {useEffect} from "react";
import BlindApi from "../../api/blind/Blind.api";
import BlindComponent from "../../components/BlindComponent/BlindComponent";
import Section from "../../components/Section/Section";
import {ILightInterface} from "../../api/light/Light.interface";
import LightApi from "../../api/light/Light.api";
import LightComponent from "../../components/LightComponent/LightComponent";
import Icon from "../../components/Icon/Icon";
import CardHeader from "../../components/Card/CardHeader/CardHeader";


const Light: React.FC = () => {
  const [lightObjects, setLightObjects] = useState<ILightInterface[]>();
  const [wantsToAdd, setWantsToAdd] = useState<boolean>(true);
  const [inputDescription, setInputDescription] = useState<string>();
  const [inputValue, setInputValue] = useState<number>();

  useEffect(() => {
    fetchLights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const fetchLights = async () => {
    const response:ILightInterface[] = await LightApi.fetchLights();
    setLightObjects(response)
  };

  const onDelete = async (id:string) => {
    const newArray = lightObjects.filter(obj =>{
      return obj.id != id;
    });
    console.log("New Array ", newArray);
    setLightObjects(newArray);
    await LightApi.deleteLight(id);

  };

  const createLights = () => {
    if(lightObjects!= undefined && lightObjects != null){
      return lightObjects.map((lightObject:ILightInterface, i) => {
        return <LightComponent key={i} id={lightObject.id} description={lightObject.description} dimmingValue={lightObject.dimmingValue} onDelete={onDelete} onNewValueSubmit={onNewValueSubmit}/>;
      });
    }

  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if(inputDescription !== undefined && inputDescription !== ""){
      const light:ILightInterface = {
        description :inputDescription,
        dimmingValue:inputValue
      };
      await LightApi.addLight(light);
      await fetchLights();
      setInputDescription("");
    }
  };

  const onNewValueSubmit = async (id:string, value:number) => {
    console.log("Bin hier onNewValueSubmit");
    const newArray:ILightInterface[] = lightObjects.map(obj => {
      if(obj.id === id){
        obj.dimmingValue = value;
      }
      return obj
    });
    setLightObjects(newArray);
    await LightApi.setLightDimmingValue(id, value);



  };

  const handleChange = (event) => {
    if(event.target != null && event.target.name === "inputDescription"){
      setInputDescription(event.target.value)
    }
    if(event.target != null && event.target.name === "inputValue"){
      setInputValue(event.target.value)
    }
  };

  const onClickParty=  async () => {
    lightObjects.map(  async (obj) => {
      await onNewValueSubmit(obj.id, 77);
    })
  };

  const onClickSleep=  async () => {
    lightObjects.map(  async (obj) => {
      await onNewValueSubmit(obj.id, 0);
    })
  };

  return (
      <Section id={"Light"} title={"Lights"} color={"warmgrey"}>
        <div className={"Light__mode_buttons"}>
          <button onClick={onClickParty}>Start Party mode
          </button>
          <button onClick={onClickSleep}>Start Sleep mode
          </button>
        </div>
          <form onSubmit={onSubmit}>
            <div className={"Light__form"}>
              <div>
                <label>
                  Input the description of the Light:
                </label>
                  <input name="inputDescription" type="text" value={inputDescription} onChange={handleChange}/>
              </div>
              <div>
                <label>
                  Input the initial dimming value of the Light (0-100):
                </label>
                  <input pattern="[0-9]*" min="0" max="100"  name="inputValue" type="number" value={inputValue} onChange={handleChange}/>
              </div>
              <div>
                <input type="submit" value={"Add new Light"}/>
              </div>
            </div>
          </form>

        {createLights()}
      </Section>
  );



};

export default Light;
