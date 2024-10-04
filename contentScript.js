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
    // dimensionsBox.style.borderRadius = "4px";
    dimensionsBox.style.pointerEvents = "none"; // So it doesn't interfere with hover
    document.body.appendChild(dimensionsBox);
  };

  // Function to update the hover effect
  const updateHoverEffect = (event) => {
    // Remove border from the previous element
    if (hoverElement) {
      hoverElement.style.outline = "";
    }
    hoverElement = event.target;

    // Apply red border to the hovered element
    hoverElement.style.outline = "2px solid blue";

    // Get the dimensions of the hovered element
    const width = hoverElement.offsetWidth;
    const height = hoverElement.offsetHeight;

    // Get the position of the hovered element
    const rect = hoverElement.getBoundingClientRect();

    // Update and display the dimensions box (tooltip) near the top-right corner of the element
    dimensionsBox.textContent = `${width}px × ${height}px`;
    dimensionsBox.style.left = `${
      rect.right - dimensionsBox.offsetWidth - 5
    }px`; // Position at the top-right
    dimensionsBox.style.top = `${rect.top - 35}px`; // A bit below the top-right corner
    dimensionsBox.style.display = "block";
  };

  // Function to handle mouseout
  const removeHoverEffect = () => {
    if (hoverElement) {
      hoverElement.style.outline = "";
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


(function () {
  let selectedElement = null;
  const resizers = [];

  // Create resizer elements (small divs at corners and sides)
  const createResizers = () => {
    const positions = [
      "top-left",
      "top-right",
      "bottom-left",
      "bottom-right",
      "top",
      "right",
      "bottom",
      "left",
    ];

    positions.forEach((pos) => {
      const resizer = document.createElement("div");
      resizer.classList.add("resizer", pos);
      document.body.appendChild(resizer);
      resizers.push(resizer);
    });
  };

  // Function to update resizer position
  const updateResizersPosition = (element) => {
    const rect = element.getBoundingClientRect();

    // Set the position of corner resizers
    resizers.forEach((resizer) => {
      if (resizer.classList.contains("top-left")) {
        resizer.style.left = `${rect.left - 5}px`;
        resizer.style.top = `${rect.top - 5}px`;
      }
      if (resizer.classList.contains("top-right")) {
        resizer.style.left = `${rect.right - 5}px`;
        resizer.style.top = `${rect.top - 5}px`;
      }
      if (resizer.classList.contains("bottom-left")) {
        resizer.style.left = `${rect.left - 5}px`;
        resizer.style.top = `${rect.bottom - 5}px`;
      }
      if (resizer.classList.contains("bottom-right")) {
        resizer.style.left = `${rect.right - 5}px`;
        resizer.style.top = `${rect.bottom - 5}px`;
      }
      // Set the position of side resizers
      if (resizer.classList.contains("top")) {
        resizer.style.left = `${(rect.left + rect.right) / 2 - 5}px`;
        resizer.style.top = `${rect.top - 5}px`;
      }
      if (resizer.classList.contains("right")) {
        resizer.style.left = `${rect.right - 5}px`;
        resizer.style.top = `${(rect.top + rect.bottom) / 2 - 5}px`;
      }
      if (resizer.classList.contains("bottom")) {
        resizer.style.left = `${(rect.left + rect.right) / 2 - 5}px`;
        resizer.style.top = `${rect.bottom - 5}px`;
      }
      if (resizer.classList.contains("left")) {
        resizer.style.left = `${rect.left - 5}px`;
        resizer.style.top = `${(rect.top + rect.bottom) / 2 - 5}px`;
      }
    });
  };

  // Function to handle the resizing process
  const resizeElement = (event, resizer) => {
    const rect = selectedElement.getBoundingClientRect();
    let newWidth, newHeight;

    if (resizer.classList.contains("right")) {
      newWidth = event.pageX - rect.left;
      selectedElement.style.width = `${newWidth}px`;
    } else if (resizer.classList.contains("left")) {
      newWidth = rect.right - event.pageX;
      selectedElement.style.width = `${newWidth}px`;
      selectedElement.style.left = `${event.pageX}px`;
    } else if (resizer.classList.contains("bottom")) {
      newHeight = event.pageY - rect.top;
      selectedElement.style.height = `${newHeight}px`;
    } else if (resizer.classList.contains("top")) {
      newHeight = rect.bottom - event.pageY;
      selectedElement.style.height = `${newHeight}px`;
      selectedElement.style.top = `${event.pageY}px`;
    }

    // For corner resizing (handle diagonal resizers)
    if (resizer.classList.contains("bottom-right")) {
      newWidth = event.pageX - rect.left;
      newHeight = event.pageY - rect.top;
      selectedElement.style.width = `${newWidth}px`;
      selectedElement.style.height = `${newHeight}px`;
    }
    if (resizer.classList.contains("bottom-left")) {
      newWidth = rect.right - event.pageX;
      newHeight = event.pageY - rect.top;
      selectedElement.style.width = `${newWidth}px`;
      selectedElement.style.height = `${newHeight}px`;
      selectedElement.style.left = `${event.pageX}px`;
    }
    if (resizer.classList.contains("top-right")) {
      newWidth = event.pageX - rect.left;
      newHeight = rect.bottom - event.pageY;
      selectedElement.style.width = `${newWidth}px`;
      selectedElement.style.height = `${newHeight}px`;
      selectedElement.style.top = `${event.pageY}px`;
    }
    if (resizer.classList.contains("top-left")) {
      newWidth = rect.right - event.pageX;
      newHeight = rect.bottom - event.pageY;
      selectedElement.style.width = `${newWidth}px`;
      selectedElement.style.height = `${newHeight}px`;
      selectedElement.style.left = `${event.pageX}px`;
      selectedElement.style.top = `${event.pageY}px`;
    }

    // Update resizer position after resizing
    updateResizersPosition(selectedElement);
  };

  // Attach resizers to the clicked element
  const attachResizers = (element) => {
    selectedElement = element;
    selectedElement.style.position = "relative";
    selectedElement.style.boxSizing = "border-box";

    // Position the resizers around the element
    updateResizersPosition(selectedElement);

    resizers.forEach((resizer) => {
      resizer.style.display = "block"; // Make resizers visible
      resizer.onmousedown = (e) => {
        e.preventDefault();
        document.onmousemove = (event) => resizeElement(event, resizer);
        document.onmouseup = () => {
          document.onmousemove = null; // Stop resizing
        };
      };
    });
  };

  // Function to clear resizers if you click outside the element
  const clearResizers = () => {
    resizers.forEach((resizer) => {
      resizer.style.display = "none";
    });
    selectedElement = null;
  };

  // Click handler to attach resizers to an element
  document.addEventListener("click", (event) => {
    event.stopPropagation();
    const target = event.target;

    if (selectedElement !== target) {
      clearResizers();
      attachResizers(target);
    }
  });

  // Initialize resizers
  createResizers();

  // Style for resizer elements
  const style = document.createElement("style");
  style.innerHTML = `
    .resizer {
      width: 10px;
      height: 10px;
      background: blue;
      position: absolute;
      cursor: pointer;
      z-index: 9999;
    }
    .resizer.top-left, .resizer.bottom-right, .resizer.top-right, .resizer.bottom-left {
      cursor: nwse-resize;
    }
    .resizer.top, .resizer.bottom {
      cursor: ns-resize;
    }
    .resizer.left, .resizer.right {
      cursor: ew-resize;
    }
  `;
  document.head.appendChild(style);
})();
