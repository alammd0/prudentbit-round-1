import { fetchArgs } from "@/types";

export default async function getItems(args : fetchArgs){
    const { search, perPage, page, sort, all} = args;
    let baseUrl = "/api/items";

    if(!all){
        const params = new URLSearchParams();
        // console.log(params);
        if(search) params.append("search", search);
        if(perPage) params.append("perPage", perPage.toString());
        if(page) params.append("page", page.toString());
        if(sort) params.append("sort", sort);

        baseUrl += `?${params.toString()}`
    }

    const response = await fetch(baseUrl);
    // console.log(response);
    const data = await response.json();
    return data;
}