import * as yargs from 'yargs';
import { LogService } from './service/log_service'
import { InputData } from './model/idata'

export class Main {

    public static async init(){
        const args: any = await yargs
        .option('input', {
            alias: 'i',
            type: 'string',
            demand: true,
            description: "Input file path"
        })
        .option('output', {
            alias: 'o',
            type: 'string',
            demand: true,
            description: "Output file path"
        })
        .argv

        LogService.parseDoc(new InputData(args.input, args.output))
        .then(_item => console.log("\n--------- END PROCESS ---------"))
        .catch(e => console.error(e.message))
    }
}