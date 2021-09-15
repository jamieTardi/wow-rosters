import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	id: { type: String },
	role: {
		type: String,
		default: 'member',
		enum: ['member', 'moderator', 'admin'],
	},
});

export default mongoose.model('User', userSchema);
