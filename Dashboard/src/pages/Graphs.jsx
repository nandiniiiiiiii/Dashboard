import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import BarGraph from '../components/BarGraph'
import { selectData } from '../data/data.slice'
import { useDispatch, useSelector } from 'react-redux'

function Graphs() {
  const dispatch = useDispatch()
  const data = useSelector(selectData)

  const aggregatedData1 = data.reduce((acc, item) => {
    const key = item.sector;
    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key] += parseFloat(item.intensity);
    return acc;
  }, {});
  const groupedArray = Object.entries(aggregatedData1).map(([key, value]) => ({ sector: key, intensity: value }));
  const intensityData = groupedArray.map(d => ({
    sector: d.sector || 'Unknown',
    intensity: isNaN(d.intensity) ? 0 : d.intensity
  }));
  console.log(aggregatedData1);


  const aggregatedData2 = data.reduce((acc, entry) => {
    const sector = entry.sector || 'Unknown';
    const intensity = isNaN(entry.likelihood) ? 0 : entry.likelihood;
    if (!acc[sector]) {
      acc[sector] = 0;
    }
    acc[sector] += parseFloat(intensity);    //intensity == likelihood
    return acc;
  }, {});
  const likelihoodData = Object.entries(aggregatedData2).map(([sector, intensity]) => ({ sector, intensity }));
  console.log(likelihoodData)

  const aggregatedData3 = data.reduce((acc, entry) => {
    const sector = entry.sector || 'Unknown';
    const intensity = isNaN(entry.relevance) ? 0 : Number(entry.relevance);
    if (!acc[sector]) {
      acc[sector] = 0;
    }
    acc[sector] += intensity;         //relevance == intensity
    return acc;
  }, {});
  const relevanceData = Object.entries(aggregatedData3).map(([sector, intensity]) => ({ sector, intensity }));

  return (
    <div>
      <NavBar>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: '50px', transform:'translateY(-4%)' }}>
          <h1>Sector Analysis</h1>
          <div style={{ marginLeft: '230px', marginTop: '5px' }}>
            <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
              <div>
                <BarGraph data={intensityData} />
                <h3 style={{ marginLeft: '150px',}}>Region Count</h3>
              </div>
              <div>
                <BarGraph data={likelihoodData} />
                <h3 style={{ marginLeft: '150px',}}>Topic Count</h3>
              </div>
              <div>
                <BarGraph data={relevanceData} />
                <h3 style={{ marginLeft: '150px',}}>Country Count</h3>
              </div>
            </div>
          </div>
        </div>
      </NavBar>
    </div>
  )
}

export default Graphs
