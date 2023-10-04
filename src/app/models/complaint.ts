import { Role } from "./role";
import { User } from "./user";

export interface Complaint {
    description: string;
    date:string;
    assignedToId: number;
    submittedById:number;
}
