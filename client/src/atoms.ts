import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist";

const sessionStorage =
    typeof window !== 'undefined' ? window.sessionStorage : undefined

const { persistAtom } = recoilPersist({
    key: 'atoms',
    storage: sessionStorage,
});

export const isLoggedIn = atom<boolean>({
    key: 'isLoggedIn',
    default: false,
    effects_UNSTABLE: [persistAtom],
});

export const isManager = atom<boolean>({
    key: 'isManager',
    default: false,
    effects_UNSTABLE: [persistAtom],
});


// 어뮤즈 자체 로그인 accessToken
export const accessTokenState = atom({
    key: "accessTokenState",
    default: "",
});

export const impUid = atom({
    key: "impUid",
    default: "",
})

export const isVisible = atom<boolean>({
    key: "isVisible",
    default: true,
});