import React, { useEffect, useState } from 'react';
import Block from '../components/Block.jsx';
import Toolbar from '../components/Toolbar.jsx';
import DropDownWithSearch from '../components/DropDownWithSearch.jsx';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {

    const formatDate = date => {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    };

    // Constantes
    const { date } = useParams() // Obtiene la fecha pasada en la URL de la página
    
    const todayDate = new Date()
    todayDate.setHours(0, 0, 0, 0)

    const [actualDate, setActualDate] = useState(() => date ?? formatDate(todayDate)) // Si date es undefined se iguala a todayDate
    console.log("param: "+date)
    console.log("today: "+todayDate)
    console.log("actual: "+actualDate)
    
    const [blockList, setBlockList] = useState(() => {
        const localValue = localStorage.getItem(actualDate)
        return localValue ? JSON.parse(localValue) : []
    })

    const [modificable, setModificable] = useState(() => {
        const localState = localStorage.getItem(actualDate+"modificable")
        return localState ? JSON.parse(localState) : []
    })

    const options = [1, 2, 3, 4, 5, 6].map(number => ({
        label: number.toString(),
        value: number
    }))

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
            const localState = localStorage.getItem(actualDate+"modificable")
            return localState ? JSON.parse(localState) : []
        })
      }, [actualDate])

    useEffect(() => { // Guarda la rutina cuando se modifica
        localStorage.setItem(actualDate, JSON.stringify(blockList))
    }, [blockList])

    useEffect(() => { // Guarda el booleano modificable cuando se modifica
        localStorage.setItem(actualDate+"modificable", JSON.stringify(modificable))
    }, [modificable])


    // Funciones de la rutina
    const addBlock = (option) => {
        const newBlock = {
            id: crypto.randomUUID(),
            series: option.value,
        }
        setBlockList([...blockList, newBlock])
    }

    const deleteBlock = (index) => {
        const updatedBlocks = [...blockList]
        updatedBlocks.splice(index, 1)
        setBlockList(updatedBlocks)
    }


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
        if(date.getTime() === todayDate.getTime()) {
            navigate(`/MyProgressApp/`)
        }
        else {
            const formattedDate = formatDate(date)
            navigate(`/MyProgressApp/${formattedDate}`)
        }
    }

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
    )
}

