// // import mongoose from "mongoose";

// // const connectDB = async () => {
// //   try {
// //     const connection = await mongoose.connect(process.env.MONGO_URI);

// //     console.log(`MongoDB connected: ${connection.connection.host}`);
// //   } catch (error) {
// //     console.error(`MongoDB connection failed: ${error.message}`);
// //     process.exit(1);
// //   }
// // };

// // export default connectDB;

// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const connection = await mongoose.connect(process.env.MONGO_URI, {
//       serverSelectionTimeoutMS: 10000
//     });

//     console.log(`MongoDB connected: ${connection.connection.host}`);
//   } catch (error) {
//     console.error("MongoDB connection failed");
//     console.error("Error name:", error.name);
//     console.error("Error message:", error.message);
//     console.error("Error reason:", error.reason);
//     console.error("Error cause:", error.cause);
//   }
// };

// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      family: 4
    });

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);

    if (error.reason?.servers) {
      console.error("\nServer connection errors:");

      for (const [server, details] of error.reason.servers) {
        console.error(`\n${server}`);
        console.error("Type:", details.type);
        console.error("Error:", details.error?.message);
      }
    }
  }
};

export default connectDB;