import { LeftColumn } from "./LeftColumn";
import { RightColumn } from "./RightColumn";
import type { TemplateProps } from "../types";
import { A4_DIMENSIONS } from "../../A4PageContainer";

export function ExecutiveTemplate({ data }: TemplateProps) {
    return (
        <div
            className="bg-white"
            style={{
                width: `${A4_DIMENSIONS.width}px`,
            }}
        >
            {/* Header Section */}
            <div className="px-8 pt-8 pb-4">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
                            {data.header.jobTitle || "Job Title"}
                        </p>
                        <h1 className="text-3xl font-light text-zinc-800 tracking-wide uppercase">
                            {data.header.fullName?.split(" ")[0] || "First"}
                        </h1>
                        <h1 className="text-3xl font-bold text-zinc-800 tracking-wide uppercase">
                            {data.header.fullName?.split(" ").slice(1).join(" ") || "Last Name"}
                        </h1>
                    </div>
                    {/* Profile Photo */}
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-zinc-200 border-4 border-zinc-100 shadow-md flex-shrink-0">
                        {data.header.photoUrl ? (
                            <img
                                src={data.header.photoUrl}
                                alt={data.header.fullName}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-zinc-300 flex items-center justify-center">
                                <span className="text-xl text-zinc-500 font-semibold">
                                    {data.header.fullName
                                        ? data.header.fullName
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .toUpperCase()
                                        : "?"}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="flex items-stretch">
                <LeftColumn data={data} />
                <RightColumn data={data} />
            </div>
        </div>
    );
}








