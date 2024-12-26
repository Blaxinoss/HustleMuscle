const mongoose = require('mongoose');

// Define the Trainee schema
const TraineeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true, // Name is mandatory
        trim: true       // Removes whitespace
    },
    phone: {
        type: String,
        required: true,  // Phone is mandatory
        unique: true,    // Ensures no duplicate phone numbers
        match: [/^\d{10,15}$/, 'Please provide a valid phone number'] // Basic phone validation
    },
    subscriptionStartDate: {
        type: Date,
        required: true    // Start date is mandatory
    },
    subscriptionEndDate: {
        type: Date,
        required: true    // End date is mandatory
    },
    totalCost: {
        type: Number,
        required: true,   // Total cost is mandatory
        min: 0            // Ensures cost is non-negative
    },
    paid: {
        type: Number,
        default: 0,       // Default paid amount is 0
        min: 0
    },
    remaining: {
        type: Number,
        default: function () { return this.totalCost - this.paid; }, // Calculate based on total cost and paid
        min: 0
    },
    discount: {
        type: Number,
        default: 0,       // Default discount is 0
        min: 0,
        max: 100          // Discount as a percentage
    },
    deleteFlag: {
        type: Boolean,
        default: false,

    },
    accountFreezeStatus: {
        type: Boolean,
        default: false    // Default account freeze status is "not frozen"
    }
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields


// Create the Trainee model
const Trainees = mongoose.model('Trainees', TraineeSchema);

module.exports = Trainees;
