import { OutputLog } from '../../src/model/outputlog'
import * as fs from 'fs'

describe('OutputLog', () => {
    const str = '2021-08-09T02:12:51.259Z - error - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Cannot find user orders list","code": 404,"err":"Not found"}'
    const pdate = Date.parse('2021-08-09T02:12:51.259Z')
    
    describe('getTimestamp', () => {
        it(`should be available to get an 'iso date' and return it in timestamp format, from a given string`, () => {
            expect(OutputLog.getTimestamp(str)).toBe(pdate)
        })
    })

    describe('getOutputLog', () => {
        const obj1 = new OutputLog(pdate, '9abc55b2-807b-4361-9dbe-aa88b1b2e978', 'Not found')
        const obj2 = OutputLog.getOutputLog(str)
        obj2.timestamp = pdate
        it('should return an OutputLog object from a given string', () => {
            expect(obj2).toEqual(obj1)
        })
    })
})