import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

export interface IUser {
	fullName: string;
	username: string;
	password: string;
	email: string;
	location: string;
	weight: string;
	height: string;
	targetWeight: string;
	groups: string[];
	events: string[];
	posts: string[];
}

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

UserSchema.methods.matchPassword = async function(enteredPassword: string) {
	return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre('save', async function(next) {
	if (!this.isModified('password')) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', UserSchema);

export default User;
