import React from "react";
import dynamic from "next/dynamic";

function Loader() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '700px',
        }}>
            <div className="loader">
            </div>
        </div>

    );
}

export default dynamic(() => Promise.resolve(Loader), { ssr: false });