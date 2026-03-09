"use client"

import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import HotelList from '@/components/HotelCard/HotelCard'
import React from 'react'

const page = () => {
    return (
        <div>
            <Breadcrumb title="Hotels" image={"/BusinessBay.jpg"}  />
            <HotelList />
        </div>
    )
}

export default page