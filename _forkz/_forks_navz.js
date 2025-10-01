// Function to generate and append the navigation menu
// data is expected to be the object containing 'mainNode'
function _forkz_add_nav(data) {
    // 1. Get the menu data from the mainNode
    const menuItems = data && data.mainNode && data.mainNode.items;

    // Check if data is valid and contains items
    if (!menuItems || !Array.isArray(menuItems) || menuItems.length === 0) {
        console.error("No menu data found in data.mainNode.items.");
        return;
    }

    // 2. Create a container element (e.g., a <div>) for the menu
    const navContainer = document.createElement('div');
    navContainer.id = 'lineMenuContainer'; // ID to style and target easily
    navContainer.style.display = 'flex'; // Arrange items in a line
    navContainer.style.gap = '10px'; // Space between buttons

    // 3. Loop through the items and create the menu structure
    menuItems.forEach(item => {
        // Create the <a> tag
        const anchor = document.createElement('a');
        anchor.href = item.url;
        anchor.className = 'nav-button-link'; // Class for the <a> tag as requested

        // Create the <button> element inside the <a> tag
        const button = document.createElement('button');

        // Populate text using {{_data.node}} as per the request
        button.textContent = item.node;

        // Apply styles for the button
        button.style.backgroundColor = 'yellow';
        button.style.color = 'black';
        button.style.border = 'none'; // Remove default border
        button.style.padding = '10px 15px';
        button.style.borderRadius = '5px'; // Corner radius 5px
        button.style.cursor = 'pointer';
        button.style.fontWeight = 'bold'; // Make text stand out

        // Append the button to the anchor tag
        anchor.appendChild(button);

        // Append the anchor (with the button) to the container
        navContainer.appendChild(anchor);
    });

    // 4. Find the target element in the HTML (e.g., the <body> or a specific <div>)
    // For simplicity, we'll append it to the document body.
    document.body.prepend(navContainer); // Adds the menu at the top of the body
}
