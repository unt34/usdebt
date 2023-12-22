import { format } from 'date-fns';

export const usDebt = async () => {
    const baseURL = 'https://api.fiscaldata.treasury.gov/services/api/fiscal_service/'
    const endpoint = 'v2/accounting/od/debt_to_penny'

    const today = new Date()
    today.setUTCDate(today.getUTCDate() - 7)
    const forrmatedToday = format(today, 'yyyy-MM-dd')

    const parameters = `?filter=record_date:gte:${forrmatedToday}`

    try {
        const res = await fetch(baseURL + endpoint + parameters, {
            cache: "no-store",
            method: "GET"
        })

        if (res.status !== 200) throw new Error(`Status code: ${res.status}`)

        const { data } = await res.json()
        
        return data
    } catch (error) {
        console.log(error)
        alert(error)
    }
}