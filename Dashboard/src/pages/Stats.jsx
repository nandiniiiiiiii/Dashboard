import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { selectData } from '../data/data.slice'
import { useDispatch, useSelector } from 'react-redux'
import PieChart from '../components/PieChart'
import Horizontalscrole from '../components/Horizontalscrole'

function Stats() {
    const dispatch = useDispatch()
    const data = useSelector(selectData)

    const [regionCounts, setRegionCounts] = useState({});
    useEffect(() => {
        const counts = data.reduce((acc, entry) => {
            acc[entry.region] = (acc[entry.region] || 0) + 1;
            return acc;
        }, {});
        setRegionCounts(counts);
    }, []);

    const [topicsCounts, setTopicsCounts] = useState({});
    useEffect(() => {
        const counts = data.reduce((acc, entry) => {
            acc[entry.topic] = (acc[entry.topic] || 0) + 1;
            return acc;
        }, {});
        setTopicsCounts(counts);
    }, []);

    const [countryCounts, setCountryCounts] = useState({});
    useEffect(() => {
        const counts = data.reduce((acc, entry) => {
            acc[entry.country] = (acc[entry.country] || 0) + 1;
            return acc;
        }, {});
        setCountryCounts(counts);
    }, []);

    return (
        <div>
            <NavBar>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: '50px',transform:'translateY(-4%)' }}>
                    <h1>Stats of different regions and sectors</h1>
                    <div style={{ marginLeft: '280px', marginTop:'10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                            <div>
                                <PieChart data={regionCounts} />
                                <h3 style={{ marginLeft: '200px' }}>Region Count</h3>
                            </div>
                            <div>
                                <PieChart data={topicsCounts} />
                                <h3 style={{ marginLeft: '200px' }}>Topic Count</h3>
                            </div>
                            <div>
                                <PieChart data={countryCounts} />
                                <h3 style={{ marginLeft: '200px' }}>Country Count</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </NavBar >
        </div >
    )
}

export default Stats
