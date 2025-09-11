import fs from "fs";
import path from "path";
import { Item } from "@/types";

let data : Item[] | null = null;

export async function readJsonData(): Promise<Item[]> {
    try{
        
        
        if(data){
            return data;
        };

        // match your actual file path
        const filePath = path.join(process.cwd(), 'data', 'MOCK_DATA.json');
        const jsonString = await fs.promises.readFile(filePath, 'utf8');
        data = JSON.parse(jsonString) as Item[];
        return data;
    }
    catch(error){
        console.error(error);
        throw new Error("Server Error, While fetching the Data..");
    }
}