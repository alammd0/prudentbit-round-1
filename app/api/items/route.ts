import { readJsonData } from "@/lib/server/readJsonData";
import { filterAndSort } from "@/utils/filterAndSort";
import { NextResponse } from "next/server";

export async function GET(req : Request){
    try{
        const url = new URL(req.url);

        console.log(url);

        const q = url.searchParams
        const search = q.get("search") || "";
        const perPage = Number(q.get("perPage")) || 16;
        const page = Number(q.get("page")) || 1;
        const sortParam = q.get("sort");
        const sort: "asc" | "desc" = sortParam === "desc" ? "desc" : "asc";
        
        const data = await readJsonData();

        const filteredData = filterAndSort(data, {
            search,
            sort
        });
    
         const total = filteredData.length;
         const offset = (page - 1) * perPage;
         const items = filteredData.slice(offset, offset + perPage);


        const response = {
            items,
            total,
            page,
            perPage,
            sort
        };

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