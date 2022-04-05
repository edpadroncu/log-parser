export class OutputLog {
    timestamp: number
    loglevel: string
    transactionId: string
    err: string

    public constructor(timestamp: number, transactionId: string, err: string){
        this.timestamp = timestamp || 0
        this.loglevel = 'error'
        this.transactionId = transactionId || ''
        this.err = err || ''
    }

    /**
     * Get the timestamp from an iso date as string
     * @param str string with the iso date and formated to 'YYYY-MM-DDTHH:mm:ss.sssZ' 
     * @returns timestamp
     * @throws Error when string can't be parsed to timestamp
     */
    public static getTimestamp(str: string): number{
        const matcher: any = str.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/)
        try {
            return Date.parse(matcher[0])
        } catch (error) {
            throw new Error(`[Error] - Coudn't get timestamp`);
        }
    }

    /**
     * Get an Output obj from a string
     * @param str string with the obj
     * @returns Output obj
     * @throws Error when string can't be parsed to Output obj
     */
    public static getOutputLog(str: string): OutputLog{
        const matcher: any = str.match(/{.*}/)
        try {
            const obj = JSON.parse(matcher[0])
            return new OutputLog(obj.timestamp, obj.transactionId, obj.err)
        } catch (error) {
            throw new Error(`[Error] - Coudn't parse str to OutputLog obj`);
        }
    }

}