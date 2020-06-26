import * as React from 'react';
import AccordionItem from "../../components/Accordion/AccordionItem/AccordionItem";
import Accordion from "../../components/Accordion/Accordion";
import Light from "../Light/Light";
import Blind from "../Blind/Blind";
import Weather from "../Weather/Weather";


const Home: React.FC = () => {

  return (
      <div>
        <Accordion id={'home-page'} name={'Lights'} allowMultipleOpen={true} heading={"Hello"}>

          <AccordionItem name={'Weather'} title="Weather" icon={"weather"}>
            <Weather />
          </AccordionItem>
            <AccordionItem
                name={'Light'}
                title={'Lights'}
                icon={'lights'}
            >
                <Light />
            </AccordionItem>
          <AccordionItem name={'Blinds'} title="Blinds" icon={"blinds"}>
            <Blind />
          </AccordionItem>
        </Accordion>
      </div>
  );
};

export default Home;
