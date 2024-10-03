(function () {
  let hoverElement = null;
  let dimensionsBox = null;

  // Function to create the dimensions box (tooltip)
  const createDimensionsBox = () => {
    dimensionsBox = document.createElement("div");
    dimensionsBox.style.position = "absolute";
    dimensionsBox.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    dimensionsBox.style.color = "#fff";
    dimensionsBox.style.padding = "4px";
    dimensionsBox.style.fontSize = "12px";
    dimensionsBox.style.borderRadius = "4px";
    dimensionsBox.style.pointerEvents = "none"; // So it doesn't interfere with hover
    document.body.appendChild(dimensionsBox);
  };

  // Function to update the hover effect
  const updateHoverEffect = (event) => {
    // Remove border and tooltip from previous element
    if (hoverElement) {
      hoverElement.style.border = "";
    }
    hoverElement = event.target;

    // Apply red border to hovered element
    hoverElement.style.border = "2px solid greenyellow";

    // Get the dimensions of the hovered element
    const width = hoverElement.offsetWidth;
    const height = hoverElement.offsetHeight;

    // Update and display the dimensions box (tooltip)
    dimensionsBox.textContent = `${width}px × ${height}px`;
    dimensionsBox.style.left = `${event.pageX + 10}px`; // Adjust position near cursor
    dimensionsBox.style.top = `${event.pageY + 10}px`;
    dimensionsBox.style.display = "block";
  };

  // Function to handle mouseout
  const removeHoverEffect = () => {
    if (hoverElement) {
      hoverElement.style.border = "";
      hoverElement = null;
    }
    dimensionsBox.style.display = "none"; // Hide the dimensions box
  };

  // Initialize the dimensions box
  createDimensionsBox();

  // Attach event listeners for hover (mouseenter and mouseleave)
  document.addEventListener("mousemove", updateHoverEffect);
  document.addEventListener("mouseout", removeHoverEffect);
})();
