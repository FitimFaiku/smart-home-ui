import * as React from 'react';
import BlindApi from "../../api/blind/Blind.api";
import {IBlindInterface} from "../../api/blind/Blind.interface";
import {useEffect, useState} from "react";

const Blind: React.FC = () => {
  const [blindObjects, setBlindObjects] = useState<IBlindInterface[]>();
  useEffect(() => {
    getBlinds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const getBlinds = async () => {
    const response:IBlindInterface[] = await BlindApi.fetchBlinds();
    console.log(response);
    setBlindObjects(response)
  };


  return (
      <div>Hello from Blind </div>
  );
};

export default Blind;
