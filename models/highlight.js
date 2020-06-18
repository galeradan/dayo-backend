const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const highlightSchema = new Schema (
		{
			description:{type: String, required: true},
			tid:{type: String, required: true},
		},
		{
			timestamps: true
		}
	)


module.exports = mongoose.model('Highlight', highlightSchema);