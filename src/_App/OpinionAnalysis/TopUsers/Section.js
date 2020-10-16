
import React from 'react'
import Container from 'react-bootstrap/Container'
//import Row from 'react-bootstrap/Row'
//import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
//import Table from 'react-bootstrap/Table'

import TopUserOpinionsDashboard from "./Dashboard"

export default function TopUserOpinion() {

    return (
        <Container fluid>
            <Card>
                <Card.Body>
                    <Card.Title><h2>Top User Opinions</h2></Card.Title>
                    <Card.Text>
                        After <a href="/user-opinions">calculating mean opinion scores</a> for all users in our dataset, we are able to compare the user's scores relative to each other to see which are more pro-Impeachment vs which are more pro-Trump.
                    </Card.Text>

                    <Card.Text>
                        The chart below shows mean impeachment opinion scores for the users in our dataset who have the most followers.
                        {" "}NOTE: bar size represents the number of followers, while color represents the opinion score.
                        {" "}NOTE: follower counts are based on users in our dataset only.
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card>
                <Card.Body>
                    <TopUserOpinionsDashboard />
                </Card.Body>
            </Card>
        </Container>
    )
}
