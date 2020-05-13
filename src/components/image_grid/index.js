import React from "react";
import axios from "axios";
import {Container, Col, Card, CardBody, CardTitle, Button} from 'reactstrap';


export default class ImageGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageGrid: ""
        }
    }

    componentDidMount() {
        if (this.props.sessionId !== "new") {
            axios.post("http://104.42.38.143:5000/api/images/lookup", {
                session: this.props.sessionId
            }).then((res) => {
                try {
                    let imageGridData = res.data.data.map((result) =>
                        <Col style={{display: "flex", justifyContent: "center", marginBottom: "20px"}}
                             key={result.image}>
                            <Card style={{padding: "10px"}}>
                                <CardBody>
                                    <CardTitle style={{textAlign: "center"}}><b>{result.label}</b></CardTitle>
                                </CardBody>
                                <img src={"http://104.42.38.143/uploads/" + this.props.sessionId + "/" + result.image} style={{maxWidth: '400px'}}/>
                                <div><Button color="primary" style={{width: "100%", marginTop: "10px"}}
                                             onClick={() => this.openDetectedImage("http://104.42.38.143/uploads/" + this.props.sessionId + "/out/" + result.image)}>View
                                    Detected Image</Button></div>
                            </Card>
                        </Col>)
                    this.setState({
                        imageGrid: imageGridData
                    })
                }
                catch (e) {
                    window.location.href = "http://104.42.38.143/404";
                }
            })
        }
    }

    render() {
        return (
            <Container>
                    {this.state.imageGrid}
            </Container>
        )
    }

    openDetectedImage(url) {
        window.location.href = url
    }
}