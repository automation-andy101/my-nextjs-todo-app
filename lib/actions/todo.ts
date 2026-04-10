"use server";

import { revalidatePath } from "next/cache";
import connectDB from "../db";
import { getSession } from "../auth/auth";
import Todo from "../models/Todo";

interface CreateTodoData {
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: number;
}

export async function createTodo(data: CreateTodoData) {
    const session = await getSession();

    if (!session?.user) {
        return { error: "Unauthorized" };
    }

    await connectDB();

    const { title, description, dueDate, priority } = data;

    if (!title) {
        return { error: "Title is required" };
    }

    const todo = await Todo.create({
        title,
        description,
        dueDate,
        priority: priority || 4,
        completed: false,
        userId: session.user.id,
    });

    revalidatePath("/dashboard");

    return { data: JSON.parse(JSON.stringify(todo)) };
}