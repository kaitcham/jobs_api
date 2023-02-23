const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      maxlength: 50,
      required: [true, 'Please provide the company'],
    },
    position: {
      type: String,
      maxlength: 50,
      required: [true, 'Please provide the position'],
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'interview', 'declined'],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide the user'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
