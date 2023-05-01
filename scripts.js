import * as dataFile from "./data.js"; // imports all exports fromm data.js as a big object.
import * as viewFile from "./view.js"; // imports all exports from view.js as a big object.
//import { getPrimes } from "/modules/getPrimes.js";

/**
 * A handler that fires when a user drags over any element inside a column. In
 * order to determine which column the user is dragging over the entire event
 * bubble path is checked with `event.path` (or `event.composedPath()` for
 * browsers that don't support `event.path`). The bubbling path is looped over
 * until an element with a `data-area` attribute is found. Once found both the
 * active dragging column is set in the `state` object in "data.js" and the HTML
 * is updated to reflect the new column.
 *
 * @param {Event} event 
 */

const handleDragStart = (event) => {
    event.preventDefault(); // This stops the default action the browser has of trying to open it once its clicked so that now it can be dragged.

}


const handleDragOver = (event) => {
   handleDragStart()
   viewFile.updateDraggingHtml()
    const path = event.path || event.composedPath()
    /*Gets the lists of elements that the event is being passed through.
    * So it basically gains access to those elements so that they can be used.
     */
    let column = null // Will later be used to show the column the user is currently dragging over.

    for (const element of path) {  //The for loop iterates over the elements the event is passing through.

        const { area } = element.dataset //Used to mark the different columns on the page using the data-attribute values as headings.
        if (area) { // Checks if the data-area attribute exists for the current element then sets column to its value.
            column = area
            break;
        }
    }
 
    if (!column) return
    updateDragging({ over: column })
    updateDraggingHtml({ over: column })
}



const handleDragEnd = (event) => {
   event.preventDefault();
    handleDragOver();
}


const handleHelpToggle = (event) => {
    viewFile.html.help.overlay.show()
    event.preventDefault(); 
  
}


const handleHelpCancelToggle = (event) => {
   event.preventDefault(); 
    viewFile.html.help.overlay.close();
 };



const handleAddToggle = (event) => {
    viewFile.html.add.overlay.show()
  
   
    const path = event.path || event.composedPath()
    let order = null
    
    for (const element of path) { // The for loop iterates over the elements the event is passing through.

        const { add } = element.dataset 
        if (add) { // Checks if the data-add attribute exists for the current element.
            order = add
            break;
        }
    }

    
    // Reset the form.
    event.target.reset();
    
}

//Added a function
const handleCancelToggle = (event) => {
    event.preventDefault(); 
    viewFile.html.add.overlay.close();
}

const handleAddSubmit = (event) => {  
    event.preventDefault();
    const overlay = viewFile.html.add.overlay;
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries()); // Create a new object.
    const newData = dataFile.createOrderData(data);
    const htmlData = viewFile.createOrderHtml(newData);
    const append = document.querySelector('[data-area="ordered"]');
    event.target.reset();
    overlay.close();
    append.appendChild(htmlData);
 };



const handleEditToggle = (event) => {
    viewFile.html.edit.overlay.show();
    event.preventDefault(); // Prevents the page from reloading or going to the next page (default behavior).
    
}

const handleEditSubmit = (event) => {
    event.preventDefault();
    const overlay = viewFile.html.edit.overlay;
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries()); // Create a new object.
    const newData = viewFile.moveToColumn(data);
    const append = document.querySelector('.grid');
    event.target.reset();
    overlay.close();
    append.appendChild(newData);
  };

  const handleEditClose = (event) => {
    event.preventDefault();
    viewFile.html.edit.overlay.close()
}
  


const handleDelete = (event) => {
    event.preventDefault();
    viewFile.html.edit.overlay.delete() 
}

 //pass the function reference without parenthesis so that the function runs when actual click event occurs.
viewFile.html.add.cancel.addEventListener('click', handleCancelToggle)
viewFile.html.other.add.addEventListener('click', handleAddToggle)
viewFile.html.add.form.addEventListener('submit', handleAddSubmit)

viewFile.html.other.grid.addEventListener('click', handleEditToggle)
viewFile.html.edit.cancel.addEventListener('click', handleEditClose)
viewFile.html.edit.form.addEventListener('submit', handleEditSubmit)
viewFile.html.edit.delete.addEventListener('click', handleDelete)

viewFile.html.help.cancel.addEventListener('click', handleHelpCancelToggle )
viewFile.html.other.help.addEventListener('click', handleHelpToggle)

for (const htmlColumn of Object.values(html.columns)) {
    htmlColumn.addEventListener('dragstart', handleDragStart)
    htmlColumn.addEventListener('dragend', handleDragEnd)
}

for (const htmlArea of Object.values(html.area)) {
    htmlArea.addEventListener('dragover', handleDragOver)
}