
import React from 'react'

import GaugeChart from 'react-gauge-chart'

export default function Dial(props) {

    return (
        <div>
            <p>Opinion Meter {props.score}</p>

            <GaugeChart id="required" style={{ height: "300px", width: "400px", margin: "10px auto" }}
                arcsLength={[0.3, 0.4, 0.3]}
                colors={["steelblue", "#ccc", "#D62021"]}
                percent={props.score}
                arcPadding={0.03}
                cornerRadius={0}
                hideText={true}
        
            />

        </div>
    )
}
