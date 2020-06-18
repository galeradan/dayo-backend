const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const coverSchema = new Schema (
		{
			url: {type: String, required: true},
			vertical: {type: Number, required: true}
		},
		{
			timestamps: true
		}
	)


module.exports = mongoose.model('Cover', coverSchema);