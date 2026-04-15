"use server";

import { revalidatePath } from "next/cache";
import connectDB from "../db";
import { getSession } from "../auth/auth";
import Todo from "../models/Todo";

export async function createTodo(formData: FormData) {
    const session = await getSession();

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    await connectDB();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const priority = Number(formData.get("priority")) || 4;
    const dueDateValue = formData.get("dueDate") as string;

    const dueDate = dueDateValue ? new Date(dueDateValue) : undefined;

    const todo = await Todo.create({
        title,
        description,
        priority,
        dueDate,
        completed: false,
        userId: session.user.id,
    });

    revalidatePath("/");
}

export async function getTodaysTodos() {
    const session = await getSession();

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    await connectDB();

    const today = new Date();

    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const todos = await Todo.find({
        userId: session.user.id,
        dueDate: {
            $gte: startOfDay,
            $lte: endOfDay
        }
    }).sort({ dueDate: 1 });

    console.log(startOfDay, endOfDay);
    console.log(JSON.parse(JSON.stringify(todos)));

    return JSON.parse(JSON.stringify(todos));
}

