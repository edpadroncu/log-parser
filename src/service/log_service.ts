import { OutputLog } from '../model/outputlog'
import { InputData } from '../model/idata'
import * as fs from 'fs'

export class LogService {

    /**
     * Validate the input and output values. Execute the read and write process
     * @param idata Object InputData
     */
    public static async parseDoc(idata: InputData) {
        if (!idata.isInputValid())
            throw new Error("Invalid input value...");

        if (!idata.isOutputValid())
            throw new Error("Invalid output value...");
        
        if (!await idata.createOutputFile())
            throw new Error(`[Error] - Couldn't create the output file: ${idata._output}`);
            
        await this.readWriteFile(idata._input, idata._output)
    }

    /**
     * Writes to the output file, the errors found on the input file
     * @param path input file path, to read information
     * @param writepath output file path, to write information
     */
    private static async readWriteFile(path: string, writepath: string){
        let no = 1
        let firstime = true
        const readStream = fs.createReadStream(path, { highWaterMark: 500000 }); //5MB
        const writeStream = fs.createWriteStream(writepath, { flags: 'a' });

        for await(const item of readStream) {
            const errorlist = item.toString().match(/.*error - {"transactionId".*/g)
            if (errorlist !== null){
                
                for (const itemErr of errorlist) {
                    try {
                        console.log(`\n----------- Analyzing match ${no} -----------`);
                        no++
                        const timestamp: number = OutputLog.getTimestamp(itemErr)
                        const output: OutputLog = OutputLog.getOutputLog(itemErr)
                        output.timestamp = timestamp

                        //writing values
                        if (firstime){
                            writeStream.write(`\n${JSON.stringify(output)}`);
                            firstime = false
                        }
                        else
                            writeStream.write(`,\n${JSON.stringify(output)}`);

                        console.info(`[ok] - ${JSON.stringify(output)}`);
                    } catch (error: any) {
                        console.error(`[Error] - Got error analyzing str: ${itemErr}`);
                        console.error(error.message);
                    }
                }
            }
        }

        writeStream.write('\n]');
        writeStream.close()
        readStream.close()
    }
    
}






