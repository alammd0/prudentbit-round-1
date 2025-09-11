import { fetchArgs } from "@/types";

export default async function getItems(args : fetchArgs){
    const { search, perPage, page, sort } = args;

    const params = new URLSearchParams();
    if(search) params.append("search", search);
    if(perPage) params.append("perPage", perPage.toString());
    if(page) params.append("page", page.toString());
    if(sort) params.append("sort", sort);

    const response = await fetch(`/api/items?${params.toString()}`);
    const data = await response.json();

    return data;
}