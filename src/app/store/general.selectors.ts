import { Selector } from "@ngxs/store";
import { User } from "../features/auth/models/user.model";
import { GeneralStatePrototype } from "./general-state.model";
import { GeneralState } from "./general.state";

export class GeneralSelectors {
    @Selector([GeneralState])
    public static getUser(state: GeneralStatePrototype): User {
        return state.user;
    }

    @Selector([GeneralState])
    public static getToken(state: GeneralStatePrototype): string {
        return state.token;
    }
}