import * as React from 'react';
import AccordionItem from "../../components/Accordion/AccordionItem/AccordionItem";
import Accordion from "../../components/Accordion/Accordion";


const Home: React.FC = () => {

  return (
      <div>
        <Accordion id={'home-page'} name={'Lights'} allowMultipleOpen={true} heading={"Hello"}>
          <AccordionItem
              name={'Light 1'}
              title={'Light Title'}
              icon={'rental-object-flat'}
          >
            <p>Hello Light item 1</p>
          </AccordionItem>
          <AccordionItem name={'öffne mich'} title="Center">
            <p>Hello Accordion Item 2</p>
          </AccordionItem>
          <AccordionItem name={'öffne mich'} title="End">
            <p>Hello Accordion Item 2</p>
          </AccordionItem>
        </Accordion>
      </div>
  );
};

export default Home;
