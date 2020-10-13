import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import {orderBy} from 'lodash'

import Spinner from "../Spinner"

var API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"

export default class UsersMostRetweeted extends React.Component {
    constructor(props) {
        super(props)
        this.state = {metric: "retweet_count", parsedResponse: null}
        this.fetchData = this.fetchData.bind(this)
    }

    render() {
        var spinIntoCharts
        if (!this.state.parsedResponse) {
            spinIntoCharts = <div className="d-flex align-items-center min-vh-90">
                <div className="container text-center">
                    <Spinner/>
                </div>
            </div>
        } else {
            var users = this.state.parsedResponse
            var metric = this.state.metric

            var community0 = orderBy(users.filter(function (u) {return u["community_id"] === 0}), metric, "desc")
            var community1 = orderBy(users.filter(function (u) {return u["community_id"] === 1}), metric, "desc")

            spinIntoCharts = <Container fluid>
                <h3 className='app-center'>Users Most Retweeted by Community</h3>
                <Row>
                    <Col sm={12} md={12} lg={6}>
                        <div className="chartWrapper">

                            <Card>
                                <Card.Body>
                                    <Card.Text className="app-center">
                                        Users Most Retweeted by Left-leaning Bots
                                    </Card.Text>
                                </Card.Body>

                                <div style={{ width: "100%", height: 500}}>
                                    <ResponsiveContainer>
                                        <BarChart
                                            data={community0}
                                            layout="vertical"
                                            margin={{top: 5, right: 30, left: 100, bottom: 5}}>
                                            <XAxis type="number" dataKey="retweet_count"/>
                                            <YAxis type="category" dataKey="retweeted_user_screen_name"/>
                                            <CartesianGrid strokeDasharray="1 1"/>
                                            <Tooltip/>
                                            <Legend/>
                                            <Bar dataKey="retweet_count" fill="#002868"/>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                            </Card>
                        </div>
                    </Col>
                    <Col sm={12} md={12} lg={6}>

                        <Card>

                            <Card.Body>
                                <Card.Text className="app-center">

                                    Users Most Retweeted by Right-leaning Bots

                                </Card.Text>
                            </Card.Body>

                            <div
                                style={{
                                width: '100%',
                                height: 500
                            }}>
                                <ResponsiveContainer>
                                    <BarChart
                                        data={community1}
                                        layout="vertical"
                                        margin={{
                                        top: 5,
                                        right: 30,
                                        left: 100,
                                        bottom: 5
                                    }}>
                                        <XAxis type="number" dataKey="retweet_count"/>
                                        <YAxis type="category" dataKey="retweeted_user_screen_name"/>
                                        <CartesianGrid strokeDasharray="1 1"/>
                                        <Tooltip/>
                                        <Legend/>
                                        <Bar dataKey="retweet_count" fill="#bf0a30"/>

                                    </BarChart>
                                </ResponsiveContainer>
                            </div>


                        </Card>
                    </Col>
                </Row>
            </Container>

        }

        return (
            <Container fluid className="no-padding">
                <Container fluid>
                    {spinIntoCharts}
                </Container>
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
        var requestUrl = `${API_URL}/api/v0/users_most_retweeted?limit=10&metric=${this.state.metric}`
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
