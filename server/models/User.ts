const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		fullName:
			{
				type: String,
				required: true
			},
		username:
			{
				type: String,
				required: true
			},
		email:
			{
				type: String,
				required: true,
				unique: true
			},
		password:
			{
				type: String,
				required: true
			},
		location:
			{
				type: String
			},
		weight:
			{
				type: Number
			},
		height:
			{
				type: Number
			},
		targetWeight:
			{
				type: Number
			},
		groups:
			[
				{
					type: Schema.Types.ObjectId,
					ref: 'Group'
				}
			],
		events:
			[
				{
					type: Schema.Types.ObjectId,
					ref: 'Event'
				}
			],
		posts:
			[
				{
					type: Schema.Types.ObjectId,
					ref: 'Post'
				}
			]
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
