

export type Item = {
    patient_id : number,
    patient_name : string,
    age : number,
    photo_url : string,
    contact : Contact[],
    medical_issue : string
}

export type Contact = {
    address : string,
    number : string,
    email : string
}

export type Options = {
    search?: string,
    limit?: number,
    page?: number,
    sort?: "asc" | "desc"
}
