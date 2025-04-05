document.addEventListener('DOMContentLoaded', () => {
    // --- Newsletter Subscription Form Handling ---
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.getElementById('newsletterEmail').value;
            alert(`Thank you for subscribing with ${email}!`);
            newsletterForm.reset();
        });
    }

    // --- Pantry Page: Inventory Management ---
    const addItemForm = document.getElementById('addItemForm');
    const searchForm = document.getElementById('searchForm');
    const inventoryList = document.getElementById('inventoryList');
    const errorDiv = document.getElementById('error');

    // --- Expiration Page ---
    const expiringItemsDiv = document.getElementById('expiringItems');

    let items = loadItemsFromLocalStorage();
    displayItems(items); // For Pantry Page
    displayExpiringItems(); // For Expiration Page

    // Function to save items to local storage
    function saveItemsToLocalStorage(items) {
        localStorage.setItem('pantryItems', JSON.stringify(items));
    }

    // Function to load items from local storage
    function loadItemsFromLocalStorage() {
        const storedItems = localStorage.getItem('pantryItems');
        return storedItems ? JSON.parse(storedItems) : [];
    }

    // Function to display pantry items on the Pantry Page
    function displayItems(items) {
        if (!inventoryList) return;
        inventoryList.innerHTML = '';

        if (items.length === 0) {
            inventoryList.innerHTML = '<p>Your pantry is empty.</p>';
            return;
        }

        items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('inventory-item');
            itemDiv.dataset.itemName = item.name; // Store item name as data attribute
            itemDiv.innerHTML = `
                <p><strong>Item:</strong> ${item.name}</p>
                <p><strong>Quantity:</strong> ${item.quantity}</p>
                <p><strong>Expiration Date:</strong> ${item.expirationDate || 'Not specified'}</p>
                <button class="delete-button">Delete</button>
            `;
            inventoryList.appendChild(itemDiv);
        });
    }

    // Event listener for delete button clicks on the inventory list
    if (inventoryList) {
        inventoryList.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete-button')) {
                const itemDiv = event.target.closest('.inventory-item');
                if (itemDiv) {
                    const itemName = itemDiv.dataset.itemName;
                    deleteItem(itemName);
                }
            }
        });
    }

    // Function to delete an item
    function deleteItem(itemName) {
        if (confirm(`Are you sure you want to delete ${itemName}?`)) {
            items = items.filter(item => item.name !== itemName);
            saveItemsToLocalStorage(items);
            displayItems(items);
            displayExpiringItems(); // Refresh expiring items
        }
    }

    // Event listener for adding a new item (Pantry Page)
    if (addItemForm) {
        addItemForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (errorDiv) {
                errorDiv.innerHTML = ""; // Clear previous errors
            }

            const itemNameInput = document.getElementById('itemName');
            const quantityInput = document.getElementById('quantity');
            const expirationDateInput = document.getElementById('expirationDate');

            const itemName = itemNameInput.value.trim();
            const quantity = parseInt(quantityInput.value);
            const expirationDate = expirationDateInput.value;

            let hasError = false;

            if (!itemName) {
                displayError("Item name cannot be empty.");
                hasError = true;
            }

            if (isNaN(quantity) || quantity <= 0) {
                displayError("Quantity must be a number greater than 0.");
                hasError = true;
            }

            if (hasError) {
                return;
            }

            addItem(itemName, quantity, expirationDate);
        });

        function displayError(message) {
            if (errorDiv) {
                const errorParagraph = document.createElement('p');
                errorParagraph.classList.add('error-message'); // Assuming you have this CSS class
                errorParagraph.textContent = message;
                errorDiv.appendChild(errorParagraph);
            }
        }
    }

    // Function to add a new item to the pantry
    function addItem(itemName, quantity, expirationDateString) { // Expecting a string from the input
        const newItem = {
            name: itemName,
            quantity: quantity,
            expirationDate: expirationDateString || null, // Store as string for now
        };

        items.push(newItem);
        saveItemsToLocalStorage(items);
        displayItems(items);
        displayExpiringItems(); // Refresh expiring items
        if (addItemForm) {
            addItemForm.reset();
        }
    }

    // Event listener for searching pantry items (Pantry Page)
    if (searchForm) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const searchQuery = document.getElementById('searchQuery').value.toLowerCase();
            const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchQuery));
            displayItems(filteredItems);
        });
    }

    // Function to display expiring items on the Expiration Page
    function displayExpiringItems() {
        if (!expiringItemsDiv) return;

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today's date to midnight

        const expiringItems = items.filter(item => {
            if (item.expirationDate) {
                const expiryDate = new Date(item.expirationDate);
                expiryDate.setHours(0, 0, 0, 0); // Normalize expiry date
                return expiryDate <= today;
            }
            return false;
        });

        expiringItems.sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate));

        expiringItemsDiv.innerHTML = expiringItems.length === 0
            ? '<p>No items expired.</p>' // Changed message for clarity
            : expiringItems.map(item => {
                const expiryDate = new Date(item.expirationDate);
                const formattedDate = expiryDate.toLocaleDateString(); // Use a user-friendly format
                return `<p><strong>${item.name}</strong> expires on <strong>${formattedDate}</strong></p>`;
            }).join('');
    }
});