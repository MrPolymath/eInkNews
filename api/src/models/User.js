import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: String,
  subscriptions: [ String ],
  bundleType: String, // 'epub' or 'mobi'
  kindleEmail: String, // email used to sync the budndle
  alias: String,
  registerTime: Date,
  updatedTime: Date
})

UserSchema.methods.getBundleUrl = function() {
  return `${process.env.ROOT_URL}/sync/${this.alias}`
}

export default mongoose.model('User', UserSchema);
