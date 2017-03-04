import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: String,
  subscriptions: [ String ],
  bundleType: String // 'epub' or 'mobi'
})

UserSchema.methods.getBundleUrl = function() {
  return `${process.env.ROOT_URL}/api/bundles/${this.id}`
}

export default mongoose.model('User', UserSchema);
