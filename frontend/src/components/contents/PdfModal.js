import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import ControlPanel from "./ControlPanel";

export default function PdfModal(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isLoading, setIsLoading] = useState(true);

  function onDocumentLoadSuccess({ numPages }) {
    setIsLoading(false);
    setNumPages(numPages);
    console.log("sdfsdfs");
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Body>
        {/* {isLoading ? (
          <Loader isLoading={isLoading} />
        ) : ( */}
        <>
          <section className="d-flex flex-column align-items-center">
            <ControlPanel
              scale={scale}
              setScale={setScale}
              numPages={numPages}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              file={props.file}
            />
            <Document file={props.file} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} scale={scale} />
            </Document>
          </section>
          <Button className="mt-3" onClick={props.onHide}>
            Close
          </Button>
        </>
        {/* )} */}
      </Modal.Body>
    </Modal>
  );
}
