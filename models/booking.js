const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const bookingSchema = new Schema (
		{	
			date: {type: String, required: true},
			persons: {type: String, required: true},
			total: {type: Number, required: true},
			isConfirmed: {type: String, required: true},
			pid: {type: String, required: true},
			tid: {type: String, required: true},
			uid: {type: String, required: true},
			creatorId: {type: String, required: true},
			reference: {type: String, required: true},
		},
		{
			timestamps: true
		}
	)


module.exports = mongoose.model('Booking', bookingSchema);