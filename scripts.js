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
const handleHelpToggle = (event) => {}


const handleAddToggle = (event) => {
    viewFile.html.add.overlay.show()
    event.preventDefault(); 
   
    const path = event.path || event.composedPath()
    let order = null
    
    for (const element of path) { // The for loop iterates over the elements the event is passing through.

        const { add } = element.dataset 
        if (add) { // Checks if the data-add attribute exists for the current element.
            order = add
            break;
        }
    }
    
    // Do something with the order value, such as adding a new item to a list or database.
    console.log(`Adding new item at order ${order}`);
    
    // Reset the form.
    event.target.reset();
    
}

const handleAddSubmit = (event) => {
    handleAddToggle()
    event.preventDefault(); // Prevents the page from reloading or going to the next page (default behavior).
    
    // Get the submitted item and table values.
    const item = add.target.item.value;
    const table = event.target.table.value;
    
    
    const newItem =  document.querySelector('[data-area="ordered"][data-column="ordered"]');
    newItem.textContent = `New order: ${item} - Table ${table}`;
    
    event.target.reset();
};




const handleEditToggle = (event) => {
    handleAddToggle()
    event.preventDefault(); // Prevents the page from reloading or going to the next page (default behavior).
    
    // Get the submitted item and table values.
    const item = add.target.item.value;
    const table = event.target.table.value;
    
    
    const newItem =  document.querySelector('[data-area="ordered"][data-column="ordered"]');
    newItem.textContent = `New order: ${item} - Table ${table}`;
    
    event.target.reset();

}
const handleEditSubmit = (event) => {}
const handleDelete = (event) => {}


viewFile.html.add.cancel.addEventListener('click', handleAddToggle) //pass the function reference without parenthesis so that the function runs when actual click event occurs.
viewFile.html.other.add.addEventListener('click', handleAddToggle)
viewFile.html.add.form.addEventListener('submit', handleAddSubmit)

viewFile.html.other.grid.addEventListener('click', handleEditToggle)
viewFile.html.edit.cancel.addEventListener('click', handleEditToggle)
viewFile.html.edit.form.addEventListener('submit', handleEditSubmit)
viewFile.html.edit.delete.addEventListener('click', handleDelete)

viewFile.html.help.cancel.addEventListener('click', handleHelpToggle)
viewFile.html.other.help.addEventListener('click', handleHelpToggle)

for (const htmlColumn of Object.values(html.columns)) {
    htmlColumn.addEventListener('dragstart', handleDragStart)
    htmlColumn.addEventListener('dragend', handleDragEnd)
}

for (const htmlArea of Object.values(html.area)) {
    htmlArea.addEventListener('dragover', handleDragOver)
}