import { getAuthDataFromStorage, setExpiryDate, setToken, setUser } from './../app/features/auth';
import{store} from '../app/store'

export const getAllDataFromStorage = () => {

    const authData = getAuthDataFromStorage();
    const user = authData?.user as any;
    const token = authData?.tokenData.token as any;
    const expiryDate = authData?.tokenData.expiryDate as any;
    store.dispatch(setUser(user));
    store.dispatch(setExpiryDate(expiryDate))
    store.dispatch(setToken(token))
}