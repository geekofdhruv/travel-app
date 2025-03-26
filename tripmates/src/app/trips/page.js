// page.js
"use client"
import React from "react"
import Navbar from "../components/navbar"
import Tripbox from "../components/tripbox"

const page = () => {
    return (
        <div className="my-24 gap-8 relative"> {/* added relative for context */}
            <div className="relative z-10"> {/* added z-10 to make navbar appear on top */}
                <Navbar />
            </div>
            <div className="relative z-0"> {/* added z-0 to ensure Tripbox stays behind */}
                <Tripbox />
            </div>
        </div>
    )
}

export default page
