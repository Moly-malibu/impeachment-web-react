import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import {orderBy} from 'lodash'

import Spinner from "../Spinner"

var API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"

const BarLabel = function(props) {
    const {x, y, value} = props
    return (
        <text x={x} y={y} dx="1%" dy="4%" fontSize="10" fontWeight="bold" fill="#ffffff" textAnchor="left">
            {value}
        </text>
    )
}

export default class StatusesMostRetweeted extends React.Component {
    constructor(props) {
        super(props)
        this.state = {metric: "retweet_count", parsedResponse: null}
        this.fetchData = this.fetchData.bind(this)
    }

    render() {
        var spinIntoCharts;
        if (!this.state.parsedResponse) {
            spinIntoCharts = <Spinner/>
        } else {
            var users = this.state.parsedResponse;
            var metric = this.state.metric

            var community0 = orderBy(users.filter(function (u) {return u["community_id"] === 0}), metric, "desc")
            var community1 = orderBy(users.filter(function (u) {return u["community_id"] === 1}), metric, "desc")

            var chartContainerStyle = { width: '100%', height: 500}
            var chartMargin = {top: 5,left: 10, bottom: 5}

            spinIntoCharts = <span>
                <h4 className='app-center'>Statuses Most Retweeted by Bot Community</h4>

                <Card>
                    <Card.Body>
                        <Card.Text className="app-center">
                            Statuses Most Retweeted by Left-leaning Bots
                        </Card.Text>

                        <div style={chartContainerStyle}>
                            <ResponsiveContainer>
                                <BarChart data={community0} layout="vertical" margin={{chartMargin}}>
                                    <XAxis type="number" dataKey="retweet_count"/>
                                    <YAxis type="category" dataKey="status_text" width={525} tick={{fontSize: 14}}/>
                                    <CartesianGrid strokeDasharray="1 1"/>
                                    <Tooltip
                                        labelFormatter={() => undefined}
                                        formatter={(okay) => [new Intl.NumberFormat('en').format(okay), undefined]}
                                    />
                                    <Legend/>
                                    <Bar dataKey="retweet_count" fill="#002868" label={<BarLabel/>}/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Body>
                        <Card.Text className="app-center">
                            Statuses Most Retweeted by Right-leaning Bots
                        </Card.Text>

                        <div style={chartContainerStyle}>
                            <ResponsiveContainer>
                                <BarChart data={community1} layout="vertical" margin={chartMargin}>
                                    <XAxis type="number" dataKey="retweet_count"/>
                                    <YAxis type="category" dataKey="status_text" width={525} tick={{fontSize: 14}}/>
                                    <CartesianGrid strokeDasharray="1 1"/>
                                    <Tooltip
                                        labelFormatter={() => undefined}
                                        formatter={(okay) => [new Intl.NumberFormat('en').format(okay), undefined]}
                                    />
                                    <Legend/>
                                    <Bar dataKey="retweet_count" fill="#bf0a30" label={<BarLabel/>}/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card.Body>
                </Card>
            </span>
        }

        return (
            <Container fluid>
                {spinIntoCharts}
            </Container>
        )
    }

    componentDidMount() {
        console.log("DASHBOARD DID MOUNT")
        this.fetchData()
    }

    componentDidUpdate(prevProps) {
        console.log("DASHBOARD DID UPDATE")
    }

    fetchData() {
        var requestUrl = `${API_URL}/api/v0/statuses_most_retweeted?limit=10&metric=${this.state.metric}`
        console.log("REQUEST URL:", requestUrl)
        fetch(requestUrl).then(function (response) {
                // console.log("RAW RESPONSE", "STATUS", response.status, response.statusText,
                // response.ok, "HEADERS", response.headers, response.url)
                return response.json()
            })
            .then(function (json) {
                console.log("FETCHED", json.length, "ITEMS")
                this.setState({parsedResponse: json})
            }.bind(this))
            .catch(function (err) {
                console.error("FETCH ERR", err)
            })
    }

}
