import { ONE_MINUTE, ONE_SECOND } from "../constants";

export const getReqTime = (start: number, end: number): string => {
    const diff = end - start;

    const min = Math.floor(diff / ONE_MINUTE);
    const sec = Math.floor((diff % ONE_MINUTE) / ONE_SECOND);
    const ms = diff % ONE_SECOND;

    return `min: ${min}, sec: ${sec}, ms: ${ms}`;
}
