import * as fs from 'fs'
import * as path from 'path';

export class InputData {
    private input: string
    private output: string

    constructor(input: string, output: string) {
        this.input = input
        this.output = output
    }

    public get _input(): string {
        return this.input
    }
    public set _input(value: string) {
        this.input = value
    }

    public get _output(): string {
        return this.output
    }
    public set _output(value: string) {
        this.output = value
    }

    /**
     * Validate input command value
     * @returns true, if is valid, false otherwise
     */
    public isInputValid(){
        if (!fs.existsSync(this.input)){
            console.error(`Path not found: '${this.input}'`);
            return false
        }
        else if (path.basename(this.input).toString().match(/.log$/) === null){
            console.error(`Invalid file extension, must be a '.log'`);
            return false
        }
        return true
    }

    /**
     * Validate output command value
     * @returns true, if is valid, false otherwise
     */
    public isOutputValid(){
        if (!fs.existsSync(path.dirname(this.output))){
            console.error(`Directory not found: '${path.dirname(this.output)}'`);
            return false
        }
        else if (path.basename(this.output).toString().match(/\w+.json$/) === null){
            console.error(`Invalid file name, must be like 'any_name.json'`);
            return false
        }
        return true
    }

    /**
     * Create the output file. File will be removed and created if exist.
     * @returns true, if file was created, false otherwise
     */
    public async createOutputFile(): Promise<boolean>{
        return await fs.promises.writeFile(this._output, '[')
        .then(_ => fs.existsSync(this._output))
        .catch(e => {
            console.error(`[Error] - error creando el archivo: "${this._output}", message: ${e.message}`);
            return false
        })
    }

}