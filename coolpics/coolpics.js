document.addEventListener("DOMContentLoaded", function() {
    const menuButton = document.querySelector('.menu-button');
    const navMenu = document.querySelector('nav');
  
    menuButton.addEventListener('click', function() {
      navMenu.classList.toggle('hide');
    });
  
    function handleResize() {
      if (window.innerWidth > 1000) {
        navMenu.classList.remove('hide');
      } else {
        navMenu.classList.add('hide');
      }
    }
  
    window.addEventListener('resize', handleResize);
    handleResize(); // Call immediately when the page loads
  
    function viewerTemplate(pic, alt) {
      return `<div class="viewer">
        <button class="close-viewer">X</button>
        <img src="${pic}" alt="${alt}">
      </div>`;
    }
  
    function viewHandler(event) {
      // Create a variable to hold the element that was clicked on
      const clickedElement = event.target;
  
      // Check if the clicked element is an image
      if (clickedElement.tagName === 'IMG') {
        // Get the src attribute from that element and split it on the "-"
        const srcParts = clickedElement.src.split('-');
        
        // Construct the new image file name by adding "-full.jpeg" to the first part of the array
        const newSrc = srcParts[0] + '-full.jpeg';
        
        // Insert the viewerTemplate into the top of the body element
        document.body.insertAdjacentHTML("afterbegin", viewerTemplate(newSrc, clickedElement.alt));
        
        // Add a listener to the close button (X) that calls a function called closeViewer when clicked
        document.querySelector('.close-viewer').addEventListener('click', closeViewer);
      }
    }
  
    function closeViewer() {
      // Remove the viewer div from the DOM when clicked
      document.querySelector('.viewer').remove();
    }
  
    // Add an event listener to the .gallery section of your HTML page
    document.querySelector('.gallery').addEventListener('click', viewHandler);
  });