import mongoose from "mongoose";
const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
    },
    position: {
      type: String,
      required: [true, "job position is required"],
      minlength: 100,
    },
    status: {
      type: String,
      enum: ["pending", "reject", "interview"],
      default: "pending",
    },
    worType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contract"],
    },
    workLocation: {
      type: String,
      default: "Noida",
      required: [true, "work location is required"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
