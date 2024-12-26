const express = require('express')
const router = express.Router()
const Trainees = require('./model/Trainees')

router.get('/', async (req, res) => {
    try {
        const trainees = await Trainees.find()
        res.status(201).json(trainees)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newTrainee = new Trainees(data)
        const savedTrainee = await newTrainee.save();
        res.status(201).json(savedTrainee)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put('/:id/freeze', async (req, res) => {
    try {
        // Find the trainee by ID
        const trainee = await Trainees.findById(req.params.id);

        if (!trainee) {
            return res.status(404).json({ error: 'Trainee not found' });
        }

        trainee.accountFreezeStatus = !trainee.accountFreezeStatus;

        currentDate = new Date()

        if (trainee.accountFreezeStatus) {
            const freezeDuration = (currentDate - new Date(trainee.freezeStartDate)) / (1000 * 3600 * 24); // in days
            trainee.subscriptionEndDate = new Date(trainee.subscriptionEndDate);
            trainee.subscriptionEndDate.setDate(trainee.subscriptionEndDate.getDate() + freezeDuration);
            trainee.freezeStartDate = null;
            trainee.accountFreezeStatus = false;
        } else {

            trainee.accountFreezeStatus = true;
            trainee.freezeStartDate = currentDate;  // Store freeze start date
        }

        // Save the updated trainee
        const updatedTrainee = await trainee.save();

        res.status(200).json(updatedTrainee); // Return updated trainee
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const trainee = await Trainees.findById(req.params.id);
        if (!trainee) {
            return res.status(404).json({ error: 'Trainee not found' });
        }
        res.status(200).json(trainee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedTrainee = await Trainees.findByIdAndDelete(req.params.id);
        if (!deletedTrainee) {
            return res.status(404).json({ error: 'Trainee not found' });
        }
        res.status(200).json({ message: 'Trainee deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedTrainee = await Trainees.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedTrainee) {
            return res.status(404).json({ error: 'Trainee not found' });
        }
        res.status(200).json(updatedTrainee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router