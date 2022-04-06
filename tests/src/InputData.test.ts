import { InputData } from '../../src/model/idata'
import * as fs from 'fs'

describe('InputData', () => {
    const directory_path = `${require('os').homedir()}/app-logs`
    const input_cmd = `${directory_path}/myapp.log`
    const output_cmd = `${directory_path}/myapp_errors.json`

    beforeEach(() => {
        if (!fs.existsSync(directory_path))
            fs.mkdirSync(directory_path)
        if (!fs.existsSync(input_cmd))
            fs.writeFileSync(input_cmd, '')
    })

    describe('isInputValid', () => {
        it('should return true', () => {
            expect(new InputData(input_cmd, "").isInputValid).toBeTruthy()
        })
    })

    describe('isOutputValid', () => {
        it('should return true', () => {
            expect(new InputData('', output_cmd).isOutputValid).toBeTruthy()
        })
    })

    describe('createOutputFile', () => {
        beforeEach(() => {
            const idata = new InputData('', output_cmd)
            idata.createOutputFile()
        })

        it('should create the output path to .json file', () => {
            expect(fs.existsSync(output_cmd)).toBeTruthy()
        })
    })
})