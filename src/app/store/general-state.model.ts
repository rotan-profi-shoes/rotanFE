import { User } from "../features/auth/models/user.model";

export interface GeneralStatePrototype {
    user: User;
    token: string;
}