
import { Item, Options } from "@/types";

function matchesSearch(item : Item, q : string){
    if(!q){
        return true;
    };

    q = q.toLowerCase();
    
    const searchWords = []

    if (item.patient_name) {
        searchWords.push(item.patient_name.toLowerCase());
    }

    if (item.age) {
        searchWords.push(String(item.age).toLowerCase());
    }

    if (item.medical_issue) {
        searchWords.push(item.medical_issue.toLowerCase());
    }

    return searchWords.some(word => word.includes(q));
}

export function filterAndSort(all : Item[], options : Options){

    // console.log("Test - 00", all);

    const { search, limit, page, sort } = options;
    // console.log(search, limit, page, sort);

    // filter
    const safeLimit = limit ?? 10;
    const safePage = page ?? 1;
    const offset = (safePage - 1) * safeLimit;

    let arr = all.filter((item) => matchesSearch(item, search ?? ""));

    // console.log("Test - 01", arr);


    if (sort === "asc") {
        arr = arr.sort((a, b) => {
            return (
            a.patient_name.localeCompare(b.patient_name) ||
            a.age - b.age ||
            (a.medical_issue ?? "").localeCompare(b.medical_issue ?? "") ||
            a.patient_id - b.patient_id
            );
        });
    } else if (sort === "desc") {
        arr = arr.sort((a, b) => {
            return (
            b.patient_name.localeCompare(a.patient_name) ||
            b.age - a.age ||
            (b.medical_issue ?? "").localeCompare(a.medical_issue ?? "") ||
            b.patient_id - a.patient_id
            );
        });
    } else {
        arr = arr.sort((a, b) => a.patient_id - b.patient_id);
    }

    return arr.slice(offset, offset + safeLimit);
}