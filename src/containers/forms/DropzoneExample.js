import React, { Component } from "react";
import DropzoneComponent from "react-dropzone-component";
import "dropzone/dist/min/dropzone.min.css";
var ReactDOMServer = require("react-dom/server");

var dropzoneComponentConfig = {
  iconFiletypes: [".jpg", ".png", ".gif", ".svg"],
  postUrl: "https://httpbin.org/post",
};

var eventHandlers = {
  addedfile: (file) => {
    {
      let formData = new FormData();
      formData.append("file", file);
      console.log(formData);
    }
  },
};

export default class DropzoneExample extends Component {
  clear() {
    this.myDropzone.removeAllFiles(true);
  }

  render() {
    const dropzoneConfig = {
      thumbnailHeight: 240,
      thumbnailWidth: 300,
      maxFilesize: 4,
      parallelUploads: 4,
      style: this.props.style,
      dictDefaultMessage: this.props.dictDefaultMessage,
      previewTemplate: ReactDOMServer.renderToStaticMarkup(
        <div
          style={this.props.style}
          className="dz-preview dz-file-preview mb-3"
          style={{
            width: "90%",
            maxHeight: "220px",
            minHeight: "220px",
            marginLeft: "10%",
            
          }}
        >
          <div
            className="d-flex flex-row "
            style={{ width: "100%", border: "0px" }}
          >
            <div
              style={{
                width: "100%",
                minHeight: "220px",
              }}
            >
              <div class="dz-message" data-dz-message>
                <span>Your Custom Message</span>
              </div>

              <div
                className="dz-error-mark"
                style={{
                  width: "100%",
                  minHeight: "220px",
                  backgroundColor: "#fff",
                }}
              >
                <span>
                  <i />{" "}
                </span>
              </div>
              <div className="dz-progress">
                <span
                  className="dz-upload"
                  data-dz-uploadprogress="true"
                ></span>
              </div>

              <div className="dz-success-mark">
                <span>
                  <i />
                </span>
              </div>
              <div className="dz-details">
                {/*  eslint-disable-next-line jsx-a11y/alt-text */}

                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <img
                    data-dz-thumbnail="true"
                    style={{
                      height: "100%",
                      maxHeight: "180px",
                      minHeight: "180px",
                    }}
                  />

                  <i className="simple-icon-doc preview-icon" />
                  <a href="#/" className="remove" data-dz-remove>
                    {" "}
                    <i className="glyph-icon simple-icon-trash" />{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      headers: { "My-Awesome-Header": "header value" },
    };
    return (
      <DropzoneComponent
        config={dropzoneComponentConfig}
        djsConfig={dropzoneConfig}
        eventHandlers={{
          init: (dropzone) => {
           

            console.log("formdata--------------", dropzone);
            this.myDropzone = dropzone;
          },
          ...this.props.eventHandlers,
        }}
        className={this.props.className}
      />
    );
  }
}
