import { User } from "../features/auth/models/user.model";

export class SetUser {
    public static readonly type = '[GENERAL] Set user';

    constructor(public user: User){}
}

export class SetToken {
    public static readonly type = '[GENERAL] Set token';

    constructor(public token: string){}
}