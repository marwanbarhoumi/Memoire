const mongoose = require("mongoose");
  async function  connect() {
  try {
    const connectionParams ={
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    await mongoose.connect(process.env.mongourl );
    console.log("data base is connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connect;
