import React from 'react'
import NavBar from './NavBar'
import Pest from '../components/Pest'
import { selectData } from '../data/data.slice'
import { useDispatch, useSelector } from 'react-redux'

function Other() {
    const dispatch = useDispatch()
    const data = useSelector(selectData)

    const pest = data.reduce((acc, entry) => {
        const pestle = entry.pestle || 'Unknown';
        if (!acc[pestle]) {
            acc[pestle] = 0;
        }
        acc[pestle]++;
        return acc;
    }, {});
    // Convert the data into an array of objects for D3
    const pestData = Object.keys(pest).map(key => ({ pestle: key, count: pest[key] }));
    console.log(pestData);

    return (
        <div>
            <NavBar>
                <div style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                    <h1>Strength Analysis</h1>
                    <Pest data={pestData} />
                </div>
            </NavBar>
        </div>
    )
}

export default Other
