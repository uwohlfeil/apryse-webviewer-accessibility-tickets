import WebViewer, { Core } from '@pdftron/webviewer'
import "./style.css"

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="viewer"></div>
`
const element = document.getElementById('viewer');

WebViewer({
  path: '/webviewer', 
  initialDoc: 'Well-Tagged-PDF-WTPDF-1.0.pdf',
  accessibleMode: true
}, element!).then((instance) => {
  const {documentViewer} = instance.Core;
  const accessibleReadingOrderManager = (documentViewer as any).getAccessibleReadingOrderManager() as Core.AccessibleReadingOrderManager; // eslint-disable-line  - Bug in TS Library
  
  accessibleReadingOrderManager.addEventListener("accessibleReadingOrderModeStarted", () => {
    console.log("accessibleReadingOrderModeStarted called");
  });

  accessibleReadingOrderManager.addEventListener("accessibleReadingOrderModeReady", () => {
    console.log("accessibleReadingOrderModeReady called");
  });
})