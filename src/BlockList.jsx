import React, { useEffect, useState } from 'react';
import BotonExpandible from "./BotonExpandible";
import Block from './Block';
import Toolbar from './Toolbar';
import { useParams } from 'react-router-dom';

export default function BlockList() {
    const { fecha } = useParams();

    const [blockList, setBlockList] = useState(() => {
        const localValue = localStorage.getItem("BLOCKLIST"+fecha)
        if(localValue == null) return []
        return JSON.parse(localValue)
    });

    useEffect(() => {
        localStorage.setItem("BLOCKLIST"+fecha, JSON.stringify(blockList))
    }, [blockList])

    const addBlock = (nroSeries) => {
        const newBlock = {
            id: crypto.randomUUID(),
            series: nroSeries,
        };
        setBlockList([...blockList, newBlock]);
    };

    const deleteBlock = (index) => {
        const updatedBlocks = [...blockList];
        updatedBlocks.splice(index, 1);
        setBlockList(updatedBlocks);
    };

 

    return (
        <>
        <Toolbar />
        <ul className='list'>
            {"Entrenamiento del Día"}
            {blockList.map((block, index)=> {
                return (
                    <li key={block.id}>
                        <Block {...block} index={index} key={block.id}/>
                        <button className="btn btn-danger" onClick={() => deleteBlock(index)}>X</button>
                        
                    </li>
                )
            })}
            <BotonExpandible onClick={addBlock} arrayContent={[1,2,3,4,5,6]} text="+"></BotonExpandible>
        </ul>
        </>
    );
};

