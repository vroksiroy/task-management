import { TaskStatus } from "@/enums";

export type TaskType = {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
};

export type FilterType = "TODO" | "DONE" | "ALL";