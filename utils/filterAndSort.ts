
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
    const { search, sort } = options;
    let arr = all.filter((item) => matchesSearch(item, search ?? ""));

    if (sort === "asc") {
        arr = arr.sort((a, b) => {
            return (
            (a.patient_name ?? "").localeCompare(b.patient_name ?? "") ||
            ((a.age ?? 0) - (b.age ?? 0)) ||
            (a.medical_issue ?? "").localeCompare(b.medical_issue ?? "") ||
            (a.patient_id ?? 0) - (b.patient_id ?? 0)
            );
        });
    } else if (sort === "desc") {
        arr = arr.sort((a, b) => {
            return (
            (b.patient_name ?? "").localeCompare(a.patient_name ?? "") ||
            ((b.age ?? 0) - (a.age ?? 0)) ||
            (b.medical_issue ?? "").localeCompare(a.medical_issue ?? "") ||
            (b.patient_id ?? 0) - (a.patient_id ?? 0)
            );
        });
    } else {
        arr = arr.sort((a, b) => (a.patient_id ?? 0) - (b.patient_id ?? 0));
    }

    return arr;
}