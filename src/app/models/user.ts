import { Role } from "./role";

export interface User {
    username: string;
    email: string;
    password: string;
    roles : Role[];
}
