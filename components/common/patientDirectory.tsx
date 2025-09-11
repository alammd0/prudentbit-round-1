"use client"

import getItems from "@/service/api/getItem";
import { Item } from "@/types";
import { useEffect, useState } from "react";
import Card from "./Card";
import Link from "next/link";
// import Pagination from "./Pagination";

export default function PatientDirectory(){

    const [items, setItems] = useState<Item[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [filterData, setFilterData] = useState("")
    const [allItems, setAllItems] = useState<Item[]>([]);
    const [sortBy, setSortBy] = useState("patient_name");
    const [sort, setSort] = useState<"asc" | "desc">("asc");


    // here All items
    useEffect(  () => {
        const fetchAllItems = async () => {
            setLoading(true);
            try{
                const response = await getItems({perPage : 1000});
                if(response.data){
                    setAllItems(response.data.items);
                    setLoading(false);
                }
                else{
                    setAllItems([]);
                    setLoading(false);
                }
            }
            catch(err){
                console.error(err);
                setLoading(false);
            }
        }
        fetchAllItems();
    }, []) 
    
    // Here write search Filter sort 
    useEffect( () => {
        let filtered = [...allItems];

        // 1. Search Logic 
        if(search.trim() !== ""){
            const q = search.toLowerCase();
            filtered = filtered.filter( (item) => 
                item?.patient_name?.toLowerCase().includes(q) || 
                String(item?.age).toLowerCase().includes(q) || 
                item?.medical_issue?.toLowerCase().includes(q))
        }

        // 2. filter Logic 
        // filtered = filtered.filter(item => item?.age ?? 0 > 50);
        if(filterData.includes("ageAbove50")){
            filtered = filtered.filter(item => item?.age ?? 0 > 50);
        }

        if(filterData.includes("fever")){
            filtered = filtered.filter(item => item?.medical_issue?.includes("fever"));
        }

        if(filterData.includes("headache")){
            filtered = filtered.filter(item => item?.medical_issue?.includes("headache"));
        }

        // age between 50 and 100
        if(filterData.includes("ageBetween50And100")){
            filtered = filtered.filter(item => item?.age ?? 0 > 50 && item?.age ?? 0 < 100);
        }

        // 3. sort Logic 
       if (sortBy === "patient_name") {
            filtered.sort((a, b) =>
               sort === "asc" ? (a.patient_name ?? "").localeCompare((b.patient_name ?? "")) : (b.patient_name ?? "").localeCompare((a.patient_name ?? ""))
            );
        } else if (sortBy === "age") {
            filtered.sort((a, b) =>
                sort === "asc" ? (a.age ?? 0) - (b.age ?? 0) : (b.age ?? 0) - (a.age ?? 0)
            );
        };

        // console.log(sort);
        
        // pagination
        const perPage = 16;
        const totalPages = Math.ceil(filtered.length / perPage);
        const offset = (page - 1) * perPage;
        setItems(filtered.slice(offset, offset + perPage));
        setTotal(totalPages);

    }, [allItems, search, filterData, page, sortBy, sort]);

    const prevChangePage = () => {
        if(page > 1){
            setPage(page - 1);
        }
    };

    const nextChangePage = () => {
        if(page < total){
            setPage(page + 1);
        }
    };

    const fetchItems = async () => {
        try{
            setLoading(true);
            const response = await getItems({
                search,
                page,
                perPage : 16,
                sort : "asc"
            });

            if(!response.data){
                setItems([]);
                setTotal(0);
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
    }, [search, page, sort]);

    return (
        <div className="px-10 py-5">
            <div className="space-y-6">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        {/* right side */}
                        <div className="font-semibold text-[16px] underline underline-offset-4 underline-primary cursor-pointer text-nav">
                            Card View
                        </div>

                        {/* left side */}
                        <div className="flex items-center justify-center gap-[5px]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-list-filter-icon lucide-list-filter"><path d="M2 5h20"/><path d="M6 12h12"/><path d="M9 19h6"/></svg>
                            <span className="font-normal text-[16px] text-[#191D23]">
                                <select className="text-sm border-none outline-none" onChange={(e) => setFilterData(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="ageAbove50">Age Above 50</option>
                                    <option value="headache">Headache</option>
                                    <option value="ageBetween50And100">Age Between 50 and 100</option>
                                    <option value="fever">Fever</option>
                                </select>   
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="w-full">
                            <input 
                              type="text"
                              className="w-full px-4 py-2 rounded-md border-[#8F8F8F] border-2 outline-none"
                              placeholder="Search by name, age or medical issue"
                              onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="flex md:w-[20%] md:justify-between gap-5 w-full items-center">
                                <div className="text-nav font-bold text-[20px]">Sort By:</div>
                                <button className="border-[#8F8F8F] border-2 rounded-md px-3 py-2 text-sm"
                                onClick={() => {
                                    setSortBy("patient_name");
                                    setSort( sort === "asc" ? "desc" : "asc");
                                    setFilterData("");
                                }}>Name</button>
                                <button className="border-[#8F8F8F] border-2 rounded-md px-3 py-2 text-sm"
                                onClick={() => {
                                    setSortBy("age");
                                    setSort( sort === "asc" ? "desc" : "asc");
                                    setFilterData("");
                                }}
                                >Age</button>
                        </div>
                    </div>
                </div>

                {/* Cards Section */}
               <div className="relative min-h-[240px]">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 relative">
                        {items.length === 0 && !loading ? (
                            <p className="text-center text-xl font-semibold">No Data Found</p>
                        ) : (
                            items.map((item) => (
                                <Card key={item.patient_id} item={item} />
                            ))
                        )}
                    </div>

                    {
                        loading && (
                            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                            </div>
                        )
                    }
               </div>

               <div className="flex justify-between flex-row items-center  pt-10 pb-10">
                    <p>This is Design and Build By 
                        <Link href="https://github.com/alammd0" target="_blank" rel="noreferrer">Khalid Alam</Link>
                    </p>
                    {/* Pagination Section */}
                    <div className="flex justify-end items-center gap-3 absolute right-12">
                        <button 
                            className="bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 px-4 py-2 rounded-md"
                            onClick={prevChangePage}
                            disabled = {page === 1}
                        >Prev</button>
                        
                        <p>{page} of {total}</p>

                        <button className="bg-nav text-primary-foreground shadow-2xs hover:bg-nav-group/90 px-4 py-2 rounded-md" onClick={nextChangePage}
                            disabled={page === total}
                        >Next</button>
                    </div>  
               </div>
            </div>
        </div>
    )
} 