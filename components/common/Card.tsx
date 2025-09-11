import { CardProps } from "@/types";
import Image from "next/image";



export default function Card(item : CardProps){

    // here add color for medical issue i have no idea ki how many type medical are issue are available in json file so, i just add some color
    const medicalIssueStyle : Record<string, string> = {
        "fever" : "bg-[#FFD6D6] border-[#FF0000] border-1",
        "headache" : "bg-[#FFE6D6] border-[#EA7100] border-1",
        "sinusitis" : "bg-[#4A4A4A66] border-[#000000] border-1",
        "stomach ache" : "bg-[#D6FFD6]",
        "cough" : "bg-[#D6FFD6]",
        "diarrhea" : "bg-[#D6FFE6]",
        "sore throat" : "bg-[#D6D6FF]",
        "chest pain" : "bg-[#FFE6FF]",
        "fatigue" : "bg-[#FFD6FF]",
        "muscle pain" : "bg-[#D6FFD6]",
        "joint pain" : "bg-[#D6FFD6]",
        "loss of appetite" : "bg-[#D6FFD6]",
        "weight loss" : "bg-[#D6FFD6]",
        "difficulty breathing" : "bg-[#D6FFD6]",
        "asthma" : "bg-[#D6FFD6]",
        "pneumonia" : "bg-[#D6FFD6]",
        "heart disease" : "bg-[#D6FFD6]",
        "kidney disease" : "bg-[#D6FFD6]",
        "liver disease" : "bg-[#D6FFD6]",
        "lung disease" : "bg-[#D6FFD6]",
        "cancer" : "bg-[#D6FFD6]",
        "pregnancy" : "bg-[#D6FFD6]",
    }

    return (
        <div className="flex flex-col gap-2 h-[250px] rounded-xl shadow-sm shadow-gray-500 hover:scale-105 hover:shadow-md hover:shadow-gray-400/20 transition-all duration-200 ease-in-out">

            <div className="flex gap-2 justify-between items-center bg-[#B5D1FE82] px-4 py-2 rounded-tl-xl rounded-tr-xl">
                <div className="flex gap-[4px] ">
                    <div>
                        {/* Add Image */}
                        <Image src="https://avatar.iran.liara.run/public/35" alt="Patient Image" width={50} height={50} />
                    </div>
                    <div>
                        {/* Name and Id */}
                        <p className="font-semibold text-[16px]">{item.item.patient_name}</p>
                        <p className="font-medium text-[14px]">ID-{item.item.patient_id}</p>
                    </div>
                </div>
                <p className="font-semibold text-[12px] bg-nav px-3 py-1 rounded-full text-white leading-4">
                    {/* Add Age */}
                    Age:{item.item.age}
                </p>
            </div>

            <div className="flex flex-col gap-5 px-4 py-2">
                {/* add medical issue */}
               <p
                className={`bg-[#D6D6FF] w-fit py-1 px-3 rounded-sm leading-4 font-bold text-[12px] capitalize
                            ${item.item.medical_issue ? medicalIssueStyle[item.item.medical_issue] || "" : ""}`}
                >
                  {item.item.medical_issue}
                </p>

                    {/* add contact */}
                <div className="flex gap-4 flex-col">
                    {/* add address */}
                    <p className="flex gap-[4px] items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        <span>
                           {item.item.contact?.[0]?.address ?? "N/A"}

                        </span>
                    </p>
                    {/* add number */}
                    <p className="flex gap-[4px] items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                        <span>
                            {item.item.contact?.[0]?.number ?? "N/A"}
                        </span>
                    </p>
                    {/* add email */}
                    <p className="flex gap-[4px] items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
                        <span>
                           {item.item.contact?.[0]?.email ?? "N/A"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}