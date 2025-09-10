import { readJsonData } from "@/lib/server/readJsonData";
import { filterAndSort } from "@/utils/filterAndSort";
import { NextResponse } from "next/server";

export async function GET(req : Request){
    try{
        // here write the logic to sort, searching, filtering 
        const url = new URL(req.url);
        const q = url.searchParams
        const search = q.get("search") || "";
        const limit = Number(q.get("limit")) || 10;
        const page = Number(q.get("page")) || 1;
        const sortParam = q.get("sort");
        const sort: "asc" | "desc" = sortParam === "desc" ? "desc" : "asc";
        const offset = (page - 1) * limit;

        // here read the data from the file
        const data = await readJsonData();

        // console.log(data);
        const filteredData = filterAndSort(data, {
            search,
            limit,
            page,
            sort
        });

        // console.log(filteredData);

    
         const total = filteredData.length;
        //  console.log(total);
         const items = filteredData.slice(offset, offset + limit);


        const response = {
            items,
            total,
            page,
            limit,
            sort
        };

        // console.log(response);

        return NextResponse.json({
            data : response
        }, {
            status : 200
        })
    }
    catch(error : any){
        return NextResponse.json({
            message : "Server Error, While fetching the Data..",
            error : error.message || error
        }, {
            status : 500
        })
    }
}