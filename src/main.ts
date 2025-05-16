import WebViewer, { Core } from '@pdftron/webviewer'
import "./style.css"

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="viewer"></div>
`
const element = document.getElementById('viewer');

const observer = new MutationObserver((mutationList, _observer) => {
  mutationList.forEach((mutation) => {
      mutation.addedNodes.forEach((addedNode => {
          if (addedNode.nodeType === Node.ELEMENT_NODE) {
              const addedElement = addedNode as HTMLElement;
              if (addedElement.classList.contains("a11y-reader-container")) {
                const pageContainer = addedElement.closest('.pageContainer') as HTMLElement;
                console.log(`Page ${pageContainer.id.replace('pageContainer', '')}: layer added`);
              }
          }
      }));
      mutation.removedNodes.forEach(((removedNode) => {
          const removedElement = removedNode as HTMLElement;
          if (removedElement.classList.contains("a11y-reader-container")) {
              const removedElement = removedNode as HTMLElement;
              const contentNode = removedElement.querySelector(".a11y-reader-content");
              const dataElement = contentNode!.getAttribute("data-element")!;

              const reg = RegExp("a11y-reader-content-(.+)_.*", "i").exec(dataElement)!;
              
              console.info(`Page ${reg[1]}: layer removed`);
          }
      }));
  });
});

WebViewer.Iframe({
  path: '/webviewer/', 
  initialDoc: 'Well-Tagged-PDF-WTPDF-1.0.pdf',
  accessibleMode: false,
  disableVirtualDisplayMode: true,

  fullAPI: true  
}, element!).then((instance) => {
  const {documentViewer} = instance.Core;
  const accessibleReadingOrderManager = (documentViewer as any).getAccessibleReadingOrderManager() as Core.AccessibleReadingOrderManager; // eslint-disable-line  - Bug in TS Library
  
  instance.UI.hotkeys.on('ctrl+alt+a', e => {
    e.preventDefault();
    instance.Core.documentViewer.getAccessibleReadingOrderManager().startAccessibleReadingOrderMode();
  });

  accessibleReadingOrderManager.addEventListener("accessibleReadingOrderModeStarted", () => {
    console.log("accessibleReadingOrderModeStarted called");
  });

  accessibleReadingOrderManager.addEventListener("accessibleReadingOrderModeReady", () => {
    console.log("accessibleReadingOrderModeReady called");
  });

  observer.observe(instance.UI.iframeWindow.document, { childList: true, subtree: true });
  



})