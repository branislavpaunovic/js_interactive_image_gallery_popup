window.addEventListener('load', init); // ✅ Registers the 'init' function to run when the page fully loads (DOM + resources)

function hidePopup() { // ✅ Declares a function to hide the popup preview window

    let popup = document.getElementById('galery-preview'); // ✅ Gets the popup element by its ID
    popup.classList.remove('visible'); // ✅ Removes the 'visible' class to hide the popup via CSS

}

function init() { // ✅ Main initializer function called on page load
    bindGaleryItems(); // ✅ Attaches click event listeners to gallery image links
    bindKeyDown(); // ✅ Attaches keyboard event listener for navigation and closing
}
// ✅ Binds click events to gallery items to show the image in a popup

function bindGaleryItems() { // ✅ Binds each image in the gallery to a click event

    let images = document.querySelectorAll('.galery a'); // ✅ Selects all <a> elements inside the .galery container

    let index = 0; // ✅ Initializes a counter to assign index to each image

    for (image of images) { // ✅ Iterates over each image link in the NodeList

        image.addEventListener('click', showImage); // ✅ Adds a click event to call showImage when clicked
        image.dataset.index = index; // ✅ Stores the index as a custom data attribute for later reference
        index++; // ✅ Increments the index for the next image

    }
}
// ✅ Function to show the clicked image in a popup preview
// ✅ It prevents the default link behavior and displays the image in a modal-like popup

function showImage(event) { // ✅ Handles the image click event and shows the popup

    event.preventDefault(); // ✅ Prevents the default link behavior (opening the image in a new tab)

    let link = event.target.parentElement.href; // ✅ Retrieves the image URL from the clicked <a> element
    let index = event.target.parentElement.dataset.index; // ✅ Gets the stored index of the clicked image

    let image = document.querySelector('#galery-preview img'); // ✅ Selects the <img> inside the popup container

    image.src = link; // ✅ Updates the src attribute to show the selected image

    let popup = document.getElementById('galery-preview'); // ✅ Selects the popup container again
    popup.dataset.currentIndex = index; // ✅ Stores the current index for navigation purposes

    popup.classList.add('visible'); // ✅ Makes the popup visible by adding the 'visible' class

}
// ✅ Binds the keydown event to allow navigation through images and closing the popup with keyboard shortcuts

function bindKeyDown() { // ✅ Binds the global keydown event for keyboard navigation
    window.addEventListener('keydown', keyDownHandler); // ✅ Adds keydown event listener to the window
}

// ✅ Handles keydown events to navigate through images or close the popup
function keyDownHandler(event) { // ✅ Handles key presses for Escape, Left, and Right navigation

    switch(event.key) { // ✅ Switches based on the pressed key

        case "Escape": // ✅ If Escape is pressed
            hidePopup(); // ✅ Close the popup
            break;

        case "ArrowRight": // ✅ If Right Arrow is pressed
            showNextImage(); // ✅ Show next image
            break;

        case "ArrowLeft": // ✅ If Left Arrow is pressed
            showPreviousImage(); // ✅ Show previous image
            break;
    }
}

// ✅ Function to show the next image in the gallery popup
function showNextImage() { // ✅ Shows the next image in the gallery popup

    let popup = document.getElementById('galery-preview'); // ✅ Gets the popup container
    let currentIndex = parseInt(popup.dataset.currentIndex); // ✅ Parses the current image index from the data attribute

    currentIndex++; // ✅ Increments index to go to the next image

    let images = document.querySelectorAll('.galery a'); // ✅ Selects all gallery image links

    currentIndex = currentIndex % images.length; // ✅ Wraps index around if it's greater than image count

    let link = images[currentIndex].href; // ✅ Gets the href of the next image

    let image = popup.querySelector('img'); // ✅ Gets the image element inside the popup

    image.src = link; // ✅ Updates the image source to the new one

    popup.dataset.currentIndex = currentIndex; // ✅ Updates the data attribute with the new index
    popup.classList.add('visible'); // ✅ Ensures popup remains visible
}

// ✅ Function to show the previous image in the gallery popup
function showPreviousImage() { // ✅ Shows the previous image in the gallery popup

    let popup = document.getElementById('galery-preview'); // ✅ Gets the popup element
    let currentIndex = parseInt(popup.dataset.currentIndex); // ✅ Converts current index from string to number

    let images = document.querySelectorAll('.galery a'); // ✅ Gets all image links

    currentIndex--; // ✅ Moves to the previous index

    if (currentIndex < 0) { // ✅ If index is below zero (start of array)
        currentIndex = images.length - 1; // ✅ Wrap around to the last image
    }

    currentIndex = currentIndex % images.length; // ✅ (Optional here) Ensures index is within bounds

    let link = images[currentIndex].href; // ✅ Gets the new image link to show

    let image = popup.querySelector('img'); // ✅ Gets the image element inside the popup

    image.src = link; // ✅ Sets the image source to new image

    popup.dataset.currentIndex = currentIndex; // ✅ Updates current index for future navigation
    popup.classList.add('visible'); // ✅ Keeps the popup visible
}
// ✅ Adds click event to the close button to hide the popup
