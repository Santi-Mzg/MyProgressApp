import React, { useEffect, useState } from 'react';
import Block from './Block';
import Toolbar from './Toolbar';
import { useParams } from 'react-router-dom';
import DropDownWithSearch from './DropDownWithSearch';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {

    // Constantes
    const { fecha } = useParams();

    const [blockList, setBlockList] = useState(() => {
        const localValue = localStorage.getItem(fecha)
        return localValue ? JSON.parse(localValue) : []
    });

    const [modificable, setModificable] = useState(() => {
        const localState = localStorage.getItem(fecha+"modificable")
        return localState ? JSON.parse(localState) : []
    });

    const options = [1, 2, 3, 4, 5, 6].map(number => ({
        label: number.toString(),
        value: number
    }));

    useEffect(() => {
        // La función del estado se ejecutará cada vez que cambie la fecha
        setBlockList(() => {
          const localValue = localStorage.getItem(fecha)
          return localValue ? JSON.parse(localValue) : []
        });
        setModificable(() => {
            const localState = localStorage.getItem(fecha+"modificable")
            return localState ? JSON.parse(localState) : []
          });
      }, [fecha]);

    useEffect(() => {
        localStorage.setItem(fecha, JSON.stringify(blockList))
        localStorage.setItem(fecha+"modificable", JSON.stringify(modificable))
    }, [blockList])


    // Rutina
    const addBlock = (option) => {
        const newBlock = {
            id: crypto.randomUUID(),
            series: option.value,
        };
        setBlockList([...blockList, newBlock]);
    };

    const deleteBlock = (index) => {
        const updatedBlocks = [...blockList];
        updatedBlocks.splice(index, 1);
        setBlockList(updatedBlocks);
    };


    // Botones
    const copyRoutine = () => {
        localStorage.setItem("clipboard", JSON.stringify(blockList))
    }

    const pasteRoutine = () => {
        setBlockList(() => {
            const prevBlockList = blockList;
            const localValue = localStorage.getItem("clipboard")
            return localValue ? JSON.parse(localValue) : prevBlockList
          });
    }

    const cleanRoutine = () => {
        setBlockList([])
    }


    // Calendario
    const navigate = useNavigate();

    const handleDateClick = date => {
        const formattedDate = formatDate(date);
        navigate(`/MyProgressApp/${formattedDate}`);
      };

    const formatDate = date => {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      };


    return (
        <>
            <Toolbar />
            <section className='section-parent'>
                <section className='section-routine'>
                    <h3>Entrenamiento del Día</h3>
                    <ul className='list'>
                        {blockList.map((block, index)=> {
                            return (
                                <li key={block.id} style={{ marginBottom: '30px' }}>
                                    <Block {...block} key={block.id} modificable={modificable}/>
                                    {modificable && <button className="btn btn-danger" onClick={() => deleteBlock(index)}>X</button>}
                                </li>
                            )
                        })}
                        {modificable && <DropDownWithSearch onChange={addBlock} options={options} text="Agregar Bloque..." />}
                    </ul>
                </section>
                <section className='section-calendar'>
                    <Calendar onClickDay={handleDateClick}/>
                    <div className='btn-group-vertical' style={{ height: '50vh' }}>
                        <button className="btn btn-secondary" style={{ width: '55vh', maxHeight: '50px', margin: '10px' }} type="button" onClick={() => setModificable(!modificable)}>{(modificable && "Establecer" || "Modificar")}</button>
                        <button className="btn btn-secondary" style={{ width: '55vh', maxHeight: '50px', margin: '10px' }} type="button" onClick={copyRoutine}>Copiar Rutina</button>
                        <button className="btn btn-secondary" style={{ width: '55vh', maxHeight: '50px', margin: '10px' }} type="button" onClick={pasteRoutine}>Pegar Rutina</button>
                        <button className="btn btn-secondary" style={{ width: '55vh', maxHeight: '50px', margin: '10px' }} type="button" onClick={cleanRoutine}>Limpiar</button>
                    </div>
                </section>
            </section>
        </>
    );
};

