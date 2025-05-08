import WebViewer from "@pdftron/webviewer";

class DoubleShadowedEditor extends HTMLElement {

    public connectedCallback() {

        const root = this.attachShadow({mode: "open"});
        const webviewerElement = document.createElement("div");
        webviewerElement.setAttribute("id", "viewer");
        webviewerElement.style.width = "100%";
        webviewerElement.style.height = "100%";
        root.append(webviewerElement);

        WebViewer({
            path: '/webviewer', 
            initialDoc: 'Well-Tagged-PDF-WTPDF-1.0.pdf',
          }, webviewerElement).then((instance) => {
            console.log("Webviewer initialized");
            instance.Core.documentViewer.addEventListener(instance.Core.DocumentViewer.Events.DOCUMENT_LOADED, () => {
                console.log("Document loaded");
            });
          })

    }
}

customElements.define("webviewer-component", DoubleShadowedEditor);