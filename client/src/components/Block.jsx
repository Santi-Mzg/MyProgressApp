import React, { useEffect, useState } from 'react';
import DropDown from "./DropDown";
import DropDownWithSearch from "./DropDownWithSearch";
import { exercises } from '../utils/exercises.json';

export default function Block( {series, id, modificable} ) {

   const [exerciseList, setExerciseList] = useState(() => {
        const localValue = localStorage.getItem(id)
        if(localValue == null) return []
        return JSON.parse(localValue)
    });

    useEffect(() => {
        localStorage.setItem(id, JSON.stringify(exerciseList))
    }, [exerciseList])

    const [arrayReps, setArrayReps] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 18, 20, 25, 30, "Max"]);
    const [arrayTime, setArrayTime] = useState([15, 30, 60, 90, 120, "Max"]);
    const [arrayWeights, setArrayWeights] = useState(["Libre", "Banda", 2.5, 5, 7.5, 10, 12, 15, 17.5, 20, 22.5, 25, 37.5, 30, 35, 40, 45, 50]);

    const addExercise = (exercise) => {
        const newExercise = {
            id: crypto.randomUUID(),
            label: exercise.label,
            isometric: exercise.isometric,
            weighted: exercise.weighted,
            weight: null, // Que todavia no se definió, libre es 0
            volume: 0,
        }
        setExerciseList([...exerciseList, newExercise]);
    };
    
    const addRepetitions = (repetitions, index) => {
        const updatedExercise = [...exerciseList];
        exerciseList[index].volume = repetitions;
        setExerciseList(updatedExercise);
    };

    const addWeight = (weight, index) => {
        const updatedExercise = [...exerciseList];
        exerciseList[index].weight = weight;
        setExerciseList(updatedExercise);
    };

    const deleteExercise= (index) => {
        const updatedExercise = [...exerciseList];
        updatedExercise.splice(index, 1);
        setExerciseList(updatedExercise);
    };


    return (    
        <>
        {series + " x { "}
        <ul className="list">
            {exerciseList.map((exercise, exerciseIndex) => {    
                return (
                    <li key={exercise.id} style={{ marginBottom: '5px' }}>
                        <div className="btn-group"> 
                            <DropDown modificable={modificable} supIndex={exerciseIndex} onClick={addRepetitions} options={exercise.isometric && arrayTime || arrayReps} 
                                text={exercise.volume === 0 && "*" || 
                                      exercise.isometric && exercise.volume !== "Max" && (exercise.volume + "s") ||
                                      (exercise.volume)}
                            />

                            {'\u00A0'+exercise.label+'\u00A0'}
                            {exercise.weighted &&
                            <DropDown modificable={modificable} supIndex={exerciseIndex} onClick={addWeight} options={exercise.weighted && arrayWeights} 
                                text={exercise.weight === null && "Lastre" ||
                                      exercise.weight === "Libre" && exercise.weight ||
                                      exercise.weight === "Banda" && ("con " + exercise.weight) ||
                                      ("con " + exercise.weight + " kg")}
                            />}
                            
                            {'\u00A0 \u00A0'}  

                            {modificable && <button className="btn btn-danger" onClick={() => deleteExercise(exerciseIndex)}>X</button>}
                        </div> 
                    </li>
                )
            })}
            {modificable && <DropDownWithSearch onChange={addExercise} options={exercises} text={"Agregar Ejercicio..."}/>}
        </ul>
        </>
    )
}