const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const packageSchema = new Schema (
		{	
			tid: {type: String, required: true},
			title: {type: String, required: true},
			description: {type: String, required: true},
			price: {type: Number, required: true},
			pax: {type: Number, required: true},
			cid: {type: String, required: true},
			url: {type: String, required: true},
			isPublished: {type: Boolean, required: true},
		},
		{
			timestamps: true
		}
	)


module.exports = mongoose.model('Package', packageSchema);