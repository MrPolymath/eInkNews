import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: String,
  interests: [ String ]
})

UserSchema.methods.getBundleUrl = function() {
  return `http://${process.env.ROOT_URL}/api/bundles/${this.id}`
}

export default mongoose.model('User', UserSchema);
