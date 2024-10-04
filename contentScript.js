(function () {
  let hoverElement = null;
  let dimensionsBox = null;
  let clickedElement = null; // Track the clicked element to keep its border

  // Function to create the dimensions box (tooltip)
  const createDimensionsBox = () => {
    dimensionsBox = document.createElement("div");
    dimensionsBox.style.position = "absolute";
    dimensionsBox.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    dimensionsBox.style.color = "#fff";
    dimensionsBox.style.padding = "4px";
    dimensionsBox.style.fontSize = "12px";
    dimensionsBox.style.pointerEvents = "none";
    document.body.appendChild(dimensionsBox);
  };

  // Function to update the hover effect
  const updateHoverEffect = (event) => {
    if (hoverElement && hoverElement !== clickedElement) {
      // Clear outline if it's not the clicked element
      hoverElement.style.outline = "";
    }
    hoverElement = event.target;

    if (hoverElement !== clickedElement) {
      hoverElement.style.outline = "2px solid blue"; // Only apply hover outline if not clicked
    }

    const width = hoverElement.offsetWidth;
    const height = hoverElement.offsetHeight;

    const rect = hoverElement.getBoundingClientRect();

    dimensionsBox.textContent = `${width}px × ${height}px`;
    dimensionsBox.style.left = `${
      rect.right - dimensionsBox.offsetWidth - 5
    }px`;
    dimensionsBox.style.top = `${rect.top - 35}px`;
    dimensionsBox.style.display = "block";
  };

  // Function to handle mouseout
  const removeHoverEffect = () => {
    if (hoverElement && hoverElement !== clickedElement) {
      // Only remove the outline if it's not the clicked element
      hoverElement.style.outline = "";
    }
    dimensionsBox.style.display = "none";
  };

  // Function to handle the element click
  const handleElementClick = (event) => {
    event.stopPropagation();

    // Clear the outline from the previously clicked element
    if (clickedElement) {
      clickedElement.style.outline = "";
    }

    // Set the new clicked element
    clickedElement = event.target;
    clickedElement.style.outline = "2px solid blue"; // Keep the outline on the clicked element
  };

  createDimensionsBox();

  document.addEventListener("mousemove", updateHoverEffect);
  document.addEventListener("mouseout", removeHoverEffect);

  // Add event listener for click to apply a persistent border
  document.addEventListener("click", handleElementClick);
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

  // Function to handle the resizing process with smooth transitions and dimension limits
  const resizeElement = (event, resizer) => {
    const rect = selectedElement.getBoundingClientRect();
    let newWidth, newHeight;

    // Minimum and maximum size restrictions
    const minWidth = 50; // You can adjust this based on the smallest reasonable size
    const minHeight = 50;
    const maxWidth = selectedElement.naturalWidth || 1000; // Adjust as needed
    const maxHeight = selectedElement.naturalHeight || 1000;

    if (resizer.classList.contains("right")) {
      newWidth = event.pageX - rect.left;
      newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
      selectedElement.style.width = `${newWidth}px`;
    } else if (resizer.classList.contains("left")) {
      newWidth = rect.right - event.pageX;
      newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
      selectedElement.style.width = `${newWidth}px`;
      selectedElement.style.left = `${event.pageX}px`;
    } else if (resizer.classList.contains("bottom")) {
      newHeight = event.pageY - rect.top;
      newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));
      selectedElement.style.height = `${newHeight}px`;
    } else if (resizer.classList.contains("top")) {
      newHeight = rect.bottom - event.pageY;
      newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));
      selectedElement.style.height = `${newHeight}px`;
      selectedElement.style.top = `${event.pageY}px`;
    }

    if (resizer.classList.contains("bottom-right")) {
      newWidth = event.pageX - rect.left;
      newHeight = event.pageY - rect.top;
      newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
      newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));
      selectedElement.style.width = `${newWidth}px`;
      selectedElement.style.height = `${newHeight}px`;
    }

    // Update resizer position after resizing
    updateResizersPosition(selectedElement);
  };

  const attachResizers = (element) => {
    selectedElement = element;
    selectedElement.style.position = "relative";
    selectedElement.style.boxSizing = "border-box";
    selectedElement.style.transition = "width 0.2s, height 0.2s"; // Smooth transitions

    updateResizersPosition(selectedElement);

    resizers.forEach((resizer) => {
      resizer.style.display = "block";
      resizer.onmousedown = (e) => {
        e.preventDefault();
        document.onmousemove = (event) => resizeElement(event, resizer);
        document.onmouseup = () => {
          document.onmousemove = null;
        };
      };
    });
  };

  const clearResizers = () => {
    resizers.forEach((resizer) => {
      resizer.style.display = "none";
    });
    selectedElement = null;
  };

  document.addEventListener("click", (event) => {
    event.stopPropagation();
    const target = event.target;

    if (selectedElement !== target) {
      clearResizers();
      attachResizers(target);
    }
  });

  createResizers();

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
