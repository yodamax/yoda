import React from 'react';
import logo from './logo.svg';
import './App.css';
import {FilePond, registerPlugin} from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import ImageGrid from "./components/image_grid";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "reactstrap/es/Container";
import Button from "reactstrap/es/Button";
import Header from "./components/header";
import {Footer} from "./components/footer";


// Register the plugins
registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType,
    FilePondPluginFileValidateSize
);

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // Set initial files, type 'local' means this is a file
            // that has already been uploaded to the server (see docs)
            files: [
                {
                    source: "index.html",
                    options: {
                        type: "local"
                    }
                }
            ],
            session: props.match.params.id || "new",
            buttonText: "Cppy Link to Clipboard",
            buttonColor: "warning"
        };
    }

    loaded(response) {
        if(this.state.session == "new") {
            window.location.href = window.location.href + JSON.parse(response).session;
            window.location.reload()
        }
        else {
            window.location.reload();
        }
    }

    render() {
        return (
            <div>
                <Container style={{marginTop: "20px"}}>
                    <Header />
                    <FilePond
                        acceptedFileTypes={["image/png", "image/jpg", "image/jpeg"]}
                        labelIdle={"Upload an image with a <b>damaged phone screen</b>  to verify the functioning of this app. Accepts <b>.jpg, .jpeg, .png</b> files. <br/> Drag & Drop your files or <span class=\"filepond--label-action\">Browse</span>"}
                        allowMultiple={true}
                        maxFileSize={"10MB"}
                        allowFileSizeValidation={true}
                        server={{
                            url: "http://104.42.38.143:5000/api/detect/single" + "?" + this.state.session,
                            process: {
                                headers: {"session": "new"},
                                onload: response => this.loaded(response)
                            }
                        }}
                    />
                    {this.state.session !== "new" && <Button color={this.state.buttonColor} style={{display: "block", width: "80%", margin: "0 auto"}}
                            onClick={() => this.copyToClipBoard()}>{this.state.buttonText}</Button>}
                    <br/>
                </Container>
                <ImageGrid sessionId={this.state.session}/>
                <Container>
                    <Footer/>
                </Container>
            </div>
        );
    }

    copyToClipBoard() {
        let dummy = document.createElement('input'),
            text = window.location.href;
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        this.setState({
            buttonColor: "primary",
            buttonText: "Copied Link to Clipboard!"
        })
    }
}

export default App;
