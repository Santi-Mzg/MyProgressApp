import React, { useEffect, useState } from 'react';
import BotonExpandible from "./BotonExpandible";

export default function Block( {series, index, id} ) {

   const [exerciseList, setExerciseList] = useState(() => {
        const localValue = localStorage.getItem("BLOCK"+id)
        if(localValue == null) return []
        return JSON.parse(localValue)
    });

    useEffect(() => {
        localStorage.setItem("BLOCK"+id, JSON.stringify(exerciseList))
    }, [exerciseList])

    const handStand = {
        name: "Handstand",
        isometric: true,
    }

    const flexiones = {
        name: "Flexiones",
        isometric: false,
    }

    const dominadas = {
        name: "Dominadas",
        isometric: false,
    }

    const l_sit = {
        name: "L-sit",
        isometric: true,
    }

    const [exerciseDataBase, setExerciseDataBase] = useState([handStand, flexiones, dominadas, l_sit]);
    const [arrayReps, setArrayReps] = useState([1,2,3,4,5,6,7,8,9,10,12,15,18,20,25,30]);
    const [arrayTime, setArrayTime] = useState([15, 30, 60, 90, 120]);

    const addExercise = (exercise) => {
        const newExercise = {
            id: crypto.randomUUID(),
            name: exercise.name,
            isometric: exercise.isometric,
            volume: 0,
        }
        setExerciseList([...exerciseList, newExercise]);
      };
    
    const addRepetitions = (repetitions, index) => {
        const updatedExercises = [...exerciseList];
        exerciseList[index].volume = repetitions;
        setExerciseList(updatedExercises);
      };

    const deleteExercise= (index) => {
        const updatedExercises = [...exerciseList];
        updatedExercises.splice(index, 1);
        setExerciseList(updatedExercises);
      };


    return (    
        <>
        {series + " x { "}
        <ul className="list">
            
            {exerciseList.length === 0}
            {console.log("length: "+exerciseList.length)}
            {console.log(exerciseList)}
            {exerciseList.map((exercise, exerciseIndex) => {    
                {console.log(exercise.name +" y "+exercise.volume) }
                return (
                    <li key={exercise.id}>
                        <div className="btn-group">
                            {exercise.volume === 0 && 
                            <>
                                <BotonExpandible supIndex={exerciseIndex} onClick={addRepetitions} arrayContent={exercise.isometric && arrayTime || arrayReps} text="*"/>
                                {'\u00A0'+exercise.name}
                            </>} 

                            {exercise.volume !== 0 && (exercise.volume + (exercise.isometric && "s " || " x ") + exercise.name)}
                            {'\u00A0 \u00A0'}  
                            <button className="btn btn-danger" onClick={() => deleteExercise(exerciseIndex)}>X</button>
                        </div> 
                    </li>
                )
            })}
            <BotonExpandible supIndex={index} onClick={addExercise} arrayContent={exerciseDataBase} text="+"/>
        </ul>
        </>
    )
}