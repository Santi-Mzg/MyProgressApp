import React, { useEffect, useState } from 'react';
import Block from '../components/Block.jsx';
import Toolbar from '../components/Toolbar.jsx';
import DropDownWithSearch from '../components/DropDownWithSearch.jsx';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import { arraySeries, formatDate } from '../utils/utils.js'

export default function MainPage() {

    // Constantes
    const { date } = useParams() // Obtiene la fecha pasada en la URL de la página

    const todayDate = new Date() // Obtiene la fecha de hoy
    todayDate.setHours(0, 0, 0, 0)

    const [actualDate, setActualDate] = useState(() => date ?? formatDate(todayDate)) // Si date es undefined se iguala a todayDate

    const [blockList, setBlockList] = useState(() => {
        const localValue = localStorage.getItem(actualDate)
        return localValue ? JSON.parse(localValue) : []
    })
    console.log(JSON.stringify(blockList))

    const [modificable, setModificable] = useState(() => {
        const localState = localStorage.getItem(actualDate + "modificable")
        return localState ? JSON.parse(localState) : []
    })

    // Hooks de actualización
    useEffect(() => {
        // La función del estado se ejecutará cada vez que cambie la fecha cargando los estados correpondientes
        setActualDate(() => date ?? formatDate(todayDate))
    }, [date])

    useEffect(() => {
        // La función del estado se ejecutará cada vez que cambie la fecha cargando los estados correpondientes
        setBlockList(() => {
            const localValue = localStorage.getItem(actualDate)
            return localValue ? JSON.parse(localValue) : []
        })
        setModificable(() => {
            const localState = localStorage.getItem(actualDate + "modificable")
            return localState ? JSON.parse(localState) : []
        })
    }, [actualDate])

    useEffect(() => { // Guarda la rutina cuando se modifica
        localStorage.setItem(actualDate, JSON.stringify(blockList))
    }, [blockList])

    useEffect(() => { // Guarda el booleano modificable cuando se modifica
        localStorage.setItem(actualDate + "modificable", JSON.stringify(modificable))
    }, [modificable])


    // Funciones de la rutina
    const addBlock = (option) => {
        const newBlock = {
            series: option.value,
            exerciseList: [],
        }
        setBlockList([...blockList, newBlock])
    }

    const deleteBlock = (index) => {
        const updatedBlocks = [...blockList]
        updatedBlocks.splice(index, 1)
        setBlockList(updatedBlocks)
    }

    const addExerciseToBlock = (blockIndex, exercise) => {
        const newExercise = {
            label: exercise.label,
            isometric: exercise.isometric,
            weighted: exercise.weighted,
            volume: 0,
            weight: null,
        }
        const updatedBlocks = [...blockList];
        updatedBlocks[blockIndex].exerciseList.push(newExercise);
        setBlockList(updatedBlocks);
    };

    const deleteExerciseFromBlock = (blockIndex, exerciseIndex) => {
        const updatedBlocks = [...blockList];
        updatedBlocks[blockIndex].exerciseList.splice(exerciseIndex, 1);
        setBlockList(updatedBlocks);
    };

    const addVolume = (blockIndex, exerciseIndex, volume) => {
        const updatedBlocks = [...blockList];
        updatedBlocks[blockIndex].exerciseList[exerciseIndex].volume = volume;
        setBlockList(updatedBlocks);
    };

    const addWeight = (blockIndex, exerciseIndex, weight) => {
        const updatedBlocks = [...blockList];
        updatedBlocks[blockIndex].exerciseList[exerciseIndex].weight = weight;
        setBlockList(updatedBlocks);
    };


    // Funciones de los botones
    const copyRoutine = () => {
        localStorage.setItem("clipboard", JSON.stringify(blockList))
    }

    const pasteRoutine = () => {
        setBlockList(() => {
            const prevBlockList = blockList;
            const localValue = localStorage.getItem("clipboard")
            return localValue ? JSON.parse(localValue) : prevBlockList
        })
    }

    const cleanRoutine = () => {
        setBlockList([])
    }


    // Función del calendario
    const navigate = useNavigate()

    const handleDateClick = date => {
        if (date.getTime() === todayDate.getTime()) {
            navigate(`/workout`)
        }
        else {
            const formattedDate = formatDate(date)
            navigate(`/workout/${formattedDate}`)
        }
    }

    return (
        <>
            <Toolbar />
            <section className='section-parent'>
                <section className='section-routine'>
                    <h3>Entrenamiento del Día</h3>
                    <ul className='list'>
                        {blockList.map((block, blockIndex) => {
                            return (
                                <li key={blockIndex} style={{ marginBottom: '30px' }}>
                                    <Block
                                        {...block}
                                        blockIndex={blockIndex}
                                        series={block.series}
                                        exerciseList={block.exerciseList}
                                        modificable={modificable}
                                        addVolume={addVolume}
                                        addExercise={(exercise) => addExerciseToBlock(blockIndex, exercise)}
                                        addWeight={addWeight}
                                        deleteExercise={deleteExerciseFromBlock} />
                                    {modificable && <button className="btn btn-danger" onClick={() => deleteBlock(index)}>X</button>}
                                </li>
                            )
                        })}
                        {modificable && <DropDownWithSearch onChange={addBlock} options={arraySeries} text="Agregar Bloque..." />}
                    </ul>
                </section>
                <section className='section-calendar'>
                    <Calendar onClickDay={handleDateClick} />
                    <div className='btn-group-vertical text-white' style={{ height: '50vh' }}>
                        <button className='bg-customColor0 ' style={{ width: '55vh', maxHeight: '50px', margin: '10px' }} type="button" onClick={() => setModificable(!modificable)}>{(modificable && "Establecer" || "Modificar")}</button>
                        <button className="bg-customColor0" style={{ width: '55vh', maxHeight: '50px', margin: '10px' }} type="button" onClick={copyRoutine}>Copiar Rutina</button>
                        <button className="bg-customColor0" style={{ width: '55vh', maxHeight: '50px', margin: '10px' }} type="button" onClick={pasteRoutine}>Pegar Rutina</button>
                        <button className="bg-customColor0" style={{ width: '55vh', maxHeight: '50px', margin: '10px' }} type="button" onClick={cleanRoutine}>Limpiar</button>
                    </div>
                </section>
            </section>
        </>
    )
}

