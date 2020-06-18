const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const tourSchema = new Schema (
		{	
			title: {type: String, required: true},
			description: {type: String, required: true},
			price: {type: Number, required: true},
			pax: {type: Number, required: true},
			isPublished: {type: Boolean, default: false},
			isAvailable: {type: Boolean, default: false},
			cid: {type: String, required: true},
			creatorId: {type: String, required: true},
		},
		{
			timestamps: true
		}
	)


module.exports = mongoose.model('Tour', tourSchema);