import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { GeneralStatePrototype } from "./general-state.model";
import { SetToken, SetUser } from "./general.actions";

@State<GeneralStatePrototype>({
    name: 'general',
})
@Injectable()
export class GeneralState {
    @Action(SetUser)
    public setUser(ctx: StateContext<GeneralStatePrototype>, { user }: SetUser): void {
        const state = ctx.getState();

        ctx.setState({
            ...state,
            user,
        })
    }

    @Action(SetToken)
    public setToken(ctx: StateContext<GeneralStatePrototype>, { token }: SetToken): void {
        const state = ctx.getState();

        ctx.setState({
            ...state,
            token,
        })
    }
}
