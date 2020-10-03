import { User } from "../../models/user.model";
import * as AuthActions from "./auth.actions";

export interface State {
    user: User;
    authError: string;
    loading: boolean;
};

const initialState: State = {
    user: null,
    authError: null,
    loading: false,
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {

    switch (action.type) {
        case AuthActions.AUTHENTICATE_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                authError: null,
                loading: false,
            }

        case AuthActions.LOGIN_START:
        case AuthActions.SIGN_UP_START:
            return {
                ...state,
                authError: null,
                loading: true
            }

        case AuthActions.AUTHENTICATE_FAIL:
            return {
                ...state,
                authError: action.payload,
                loading: false,
            }

        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null,
                authError: null,
                loading: false,
            };

        case AuthActions.CLEAR_ERROR:
            return {
                ...state,
                authError: null,
            };

        default:
            return state;
    }
};
