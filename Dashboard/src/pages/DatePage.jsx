import React from 'react'
import NavBar from './NavBar'
import Date from '../components/Date'
import { selectData } from '../data/data.slice'
import { useDispatch, useSelector } from 'react-redux'
import Horizontalscrole from '../components/Horizontalscrole'


function DatePage() {
    const dispatch = useDispatch()
    const data = useSelector(selectData)

    //start year
    const dateData = data
        .filter(entry => entry.start_year && entry.end_year)
        .map(entry => ({
            sector: entry.sector || 'Unknown',
            start_year: Number(entry.start_year),
            end_year: Number(entry.end_year)
        }));
    const counts = dateData.reduce((acc, entry) => {
        const key = `${entry.start_year}-${entry.sector}`;
        if (!acc[key]) {
            acc[key] = { start_year: entry.start_year, sector: entry.sector, count: 0 };
        }
        acc[key].count++;
        return acc;
    }, {});
    const transformedData = Object.values(counts);
    console.log(transformedData)

    const counts2 = dateData.reduce((acc, entry) => {
        const key = `${entry.end_year}-${entry.sector}`;
        if (!acc[key]) {
            acc[key] = { start_year: entry.end_year, sector: entry.sector, count: 0 };
        }
        acc[key].count++;
        return acc;
    }, {});
    const transformedData2 = Object.values(counts2);
    console.log(transformedData2)

    return (
        <div>
            <NavBar>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', transform:'translateY(-4%)'}}>
                    <h1>Time Lines</h1>
                    <div style={{display:'flex', alignItems:'center', overflow:'hidden'}}>
                        <div style={{marginLeft: '500px'}}>
                            <Date data={transformedData} />
                            <h3 style={{ marginLeft: '250px' }}>Start_year VS Sector</h3>
                        </div>
                        <div>
                            <Date data={transformedData2} />
                            <h3 style={{ marginLeft: '250px' }}>End_year VS Sector</h3>
                        </div>
                    </div>
                </div>
            </NavBar>
        </div>
    )
}

export default DatePage
