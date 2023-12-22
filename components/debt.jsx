'use client'

import { useState, useEffect } from 'react';
import { usDebt } from '../app/api/debtAPI'

export default function DebtClock({  }) {
    const [debt, setDebt] = useState('0.00')

    useEffect(() => {
        let startingDebt, dayAverage, lastRecordDate;
        
        const getDebtData = async () => {
            const data = await usDebt()
            const lastDebt = parseFloat(data[data.length-1].tot_pub_debt_out_amt)
            const firsDebt = parseFloat(data[0].tot_pub_debt_out_amt)
            const averageDebt = (lastDebt - firsDebt) / data.length

            startingDebt = lastDebt
            dayAverage = averageDebt
            lastRecordDate = new Date(data[data.length-1].record_date)
        }

        getDebtData()

        setInterval(() => {
            const now = new Date()
            const h = now.getUTCHours()
            const min = now.getUTCMinutes()
            const sec = now.getUTCSeconds()
            const ms = now.getUTCMilliseconds()

            const daysOffset = Math.floor((now.getTime() - lastRecordDate.getTime()) / (1000 * 60 * 60 * 24))
            const debtPerMs = dayAverage / 86400000
            const calculatedDebt = startingDebt + debtPerMs * (h * 36000 + min * 60000 + sec * 1000 + ms) + dayAverage * daysOffset

            setDebt((Math.round(calculatedDebt)).toLocaleString())
        }, 1000)
    }, [])

    return (
        <div className='debt-container'>
            <h2>
                <span>$</span>
                {debt}
            </h2>
        </div>

    )
}