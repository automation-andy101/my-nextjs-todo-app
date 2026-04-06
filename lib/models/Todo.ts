import mongoose, {Schema, Document, Types} from "mongoose";

export interface ITodo extends Document {
    title: string;
    completed: boolean;
    userId: string;
}

const TodoSchema = new Schema<ITodo>({
  title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    },
    completed: { 
        type: Boolean, 
        default: false,
        index: true
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
},
{   
    timestamps: true 
});

export default mongoose.models.Todo || mongoose.model<ITodo>("Todo", TodoSchema);
