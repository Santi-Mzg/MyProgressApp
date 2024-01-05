import Workout from '../models/workout.model.js'

export const getWorkout = async (req, res) => {
    try {
        const workoutFound = await Workout.findOne({ date: req.params.date, user: req.user.id });
        if (!workoutFound) return res.status(404).json({ message: "Rutina no encontrada" });

        res.json(workoutFound);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createWorkout = async (req, res) => {
    const { date, blockList } = req.body;

    try {
        const dateObj = new Date(date) // Convierte la cadena de fecha a un objeto Date

        const workoutFound = await Workout.findOne({ date: dateObj, user: req.user.id })
        if (workoutFound) return res.status(400).json({ message: "La rutina ya se encuentra creada" })


        console.log(req.user)
        const newWorkout = new Workout({
            user: req.user.id,
            date: dateObj,
            blockList
        });

        const workoutSaved = await newWorkout.save();
        res.json(workoutSaved);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateWorkout = async (req, res) => {
    try {
        const workoutFound = await Workout.findOneAndUpdate({ date: req.params.date, user: req.user.id }, req.body, { new: true })
        if (!workoutFound) return res.status(404).json({ message: "Rutina no encontrada" })

        res.json(workoutFound);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteWorkout = async (req, res) => {
    try {
        const workoutFound = await Workout.findOneAndDelete({ date: req.params.date, user: req.user.id });
        if (!workoutFound) return res.status(404).json({ message: "Rutina no encontrada" });

        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


