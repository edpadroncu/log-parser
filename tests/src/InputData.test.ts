import { InputData } from '../../src/model/idata'
import * as fs from 'fs'

describe('InputData', () => {
    describe('isInputValid', () => {
        const input_cmd = `${require('os').homedir()}/app-logs/myapp.log`
        
        beforeEach(() => {
            if (!fs.existsSync(input_cmd))
                fs.writeFileSync(input_cmd, '')
        })

        it('should return true', () => {
            expect(new InputData(input_cmd, "").isInputValid).toBeTruthy()
        })
    })

    describe('isOutputValid', () => {
        const directory_path = `${require('os').homedir()}/app-logs`
        const output_cmd = `${directory_path}/myapp_errors.json`
        
        beforeEach(() => {
            if (!fs.existsSync(directory_path))
                fs.mkdirSync(directory_path)
        })

        it('should return true', () => {
            expect(new InputData('', output_cmd).isOutputValid).toBeTruthy()
        })
    })

    describe('createOutputFile', () => {
        const directory_path = `${require('os').homedir()}/app-logs/`
        const output_cmd = `${directory_path}/myapp_errors.json`
        
        beforeEach(() => {
            if (!fs.existsSync(directory_path))
                fs.mkdirSync(directory_path)
        })

        it('should create the output path to .json file', () => {
            const idata = new InputData('', output_cmd)
            idata.createOutputFile()
            expect(fs.existsSync(output_cmd)).toBeTruthy()
        })
    })
})