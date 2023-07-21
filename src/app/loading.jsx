import React from "react";
import { Skeleton } from "@mui/material";
import dynamic from "next/dynamic";

function Loading() {
    return (
        <div>
            <Skeleton width={200} height={20} />
        </div>
    );
}

export default dynamic(() => Promise.resolve(Loading), { ssr: false });