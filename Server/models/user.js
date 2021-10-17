import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	id: { type: String },
	role: {
		type: String,
		default: 'member',
		enum: ['member', 'moderator', 'guildMaster', 'admin'],
	},
	guild: { type: String, default: 'guildless' },
});

export default mongoose.model('User', userSchema);
