"use client"

import getItems from "@/service/api/getItem";
import { Item } from "@/types";
import { useEffect, useState } from "react";

export default function PatientDirectory(){

    const [items, setItems] = useState<Item[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const [loading, setLoading] = useState(false);

    const handleSearch = (e : any) => {
        setSearch(e.target.value);
    }

    const handlePage = (e : any) => {
        setPage(e.target.value);
    }

    const fetchItems = async () => {
        try{
            setLoading(true);
            const response = await getItems({
                search,
                page,
                perPage : 15,
                sort : "asc"
            });

            if(!response.data){
                setLoading(false);
                return;
            }

            setItems(response.data.items);
            setTotal(response.data.total);
            setLoading(false);
        }
        catch(err){
            console.error(err);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchItems();
    }, [search, page]);

    console.log(items);
    console.log(total);

    if(loading){
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div>
           
        </div>
    )
}