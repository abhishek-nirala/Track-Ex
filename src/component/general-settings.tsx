
import { UserInterface } from '@/models/User.model'
import axios from 'axios'
import React, { useEffect } from 'react'

interface IResponse {
    data: {
        success: boolean,
        message: UserInterface,
    }
}
function GeneralSettings() {
    useEffect(() => {
        const fetchCurrencyType = async () => {
            try {
                const response: IResponse = await axios.get("/api/fetch-user-currency")
                if (response.data.success) {
                    localStorage.setItem("currency", JSON.stringify(response.data?.message.currency))
                }
            } catch (error) {
                console.error("error while fetching currency@gs: ", error)
            }
        }

        fetchCurrencyType();
    }, [])
    return (
        <div>general-settings</div>
    )
}

export default GeneralSettings