import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import {orderBy} from 'lodash'

import Spinner from "../../Spinner"

import StatusesMostRetweetedTable from "./StatusesMostRetweetedTable"

var API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"

export default class StatusesMostRetweeted extends React.Component {
    constructor(props) {
        super(props)
        this.state = {metric: "retweeter_count", parsedResponse: null}
        this.fetchData = this.fetchData.bind(this)
    }

    render() {
        var spinIntoCharts = <Spinner/>
        if (this.state.parsedResponse) {
            var users = this.state.parsedResponse;
            var metric = this.state.metric

            var community0 = orderBy(users.filter(function (u) {return u["community_id"] === 0}), metric, "desc")
            var community1 = orderBy(users.filter(function (u) {return u["community_id"] === 1}), metric, "desc")

            spinIntoCharts = <span>
                {/* <h4 className='app-center'>Statuses Most Retweeted by Bot Community</h4> */}

                <Row>
                    <Col sm={12} md={12} lg={6}>
                        <Card>
                            <Card.Body>
                                <Card.Text className="app-center">
                                    Statuses Most Retweeted by Left-leaning Bots
                                </Card.Text>

                                {/* <StatusesBarChart data={community0} barFill="#002868"/> */}

                                <StatusesMostRetweetedTable data={community0}/>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col sm={12} md={12} lg={6}>
                        <Card>
                            <Card.Body>
                                <Card.Text className="app-center">
                                    Statuses Most Retweeted by Right-leaning Bots
                                </Card.Text>

                                {/* <StatusesBarChart data={community1} barFill="#bf0a30"/> */}
                                <StatusesMostRetweetedTable data={community1}/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
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
