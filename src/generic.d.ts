import dayjs from 'dayjs';

declare enum DateFormat {
    YMD = "YYYY-MM-DD",
    YMD_HIS = "YYYY-MM-DD HH:mm",
    YMD_HI = "YYYY-MM-DD HH",
    ISO8601 = "YYYY-MM-DDTHH:mm:ssZ[Z]"
}
declare function dateToFormat(date: dayjs.Dayjs | string | null, format?: string): string;

declare function promiseWithResolvers<T = void>(): {
    promise: Promise<T>;
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
};

declare function sleep(time: number): Promise<unknown>;

export { DateFormat, dateToFormat, promiseWithResolvers, sleep };
