import mongoose, { Schema, Document } from "mongoose";

export interface ISubscribedEmail extends Document {
    email: string;
}

const SubscribedEmailSchema: Schema = new Schema(
    {
        email: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

export default mongoose.models.SubscribedEmail || mongoose.model<ISubscribedEmail>("SubscribedEmail", SubscribedEmailSchema);
