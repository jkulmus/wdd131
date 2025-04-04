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
    const expiringItemsDiv = document.getElementById('expiringItems');
    const errorDiv = document.getElementById('error');

    let items = loadItemsFromLocalStorage();
    displayItems(items);
    displayExpiringItems(); // Call this on page load to show initial expiring items

    // Function to save items to local storage
    function saveItemsToLocalStorage(items) {
        localStorage.setItem('pantryItems', JSON.stringify(items));
    }

    // Function to load items from local storage
    function loadItemsFromLocalStorage() {
        const storedItems = localStorage.getItem('pantryItems');
        return storedItems ? JSON.parse(storedItems) : [];
    }

    // Function to display the pantry items in the UI
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
            itemDiv.innerHTML = `
                <p><strong>Item:</strong> ${item.name}</p>
                <p><strong>Quantity:</strong> ${item.quantity}</p>
                <p><strong>Expiration Date:</strong> ${item.expirationDate || 'Not specified'}</p>
                <button class="delete-button" onclick="deleteItem('${item.name}')">Delete</button>
            `;
            inventoryList.appendChild(itemDiv);
        });
    }

    // Event listener for adding a new item
    if (addItemForm) {
        addItemForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (errorDiv) {
                errorDiv.textContent = "";
            }

            const itemName = document.getElementById('itemName').value.trim(); // Trim whitespace
            const quantity = parseInt(document.getElementById('quantity').value);
            const expirationDate = document.getElementById('expirationDate').value; // This will be an empty string if not filled

            if (!itemName || quantity <= 0) {
                if (errorDiv) {
                    errorDiv.textContent = "Please enter a valid item name and quantity.";
                }
                return;
            }

            addItem(itemName, quantity, expirationDate);
        });
    }

    // Function to add a new item to the pantry
    function addItem(itemName, quantity, expirationDate) {
        const newItem = {
            name: itemName,
            quantity: quantity,
            expirationDate: expirationDate || null, // Store null if no date is provided
        };
        items.push(newItem);
        saveItemsToLocalStorage(items);
        displayItems(items);
        displayExpiringItems(); // Update expiring items after adding
        if (addItemForm) {
            addItemForm.reset();
        }
    }

    // Event listener for searching pantry items
    if (searchForm) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const searchQuery = document.getElementById('searchQuery').value.toLowerCase();
            const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchQuery));
            displayItems(filteredItems);
        });
    }

    // Function to delete an item (attached to the window for onclick in HTML)
    window.deleteItem = (itemName) => {
        items = items.filter(item => item.name !== itemName);
        saveItemsToLocalStorage(items);
        displayItems(items);
        displayExpiringItems(); // Update expiring items after deleting
    };

    // Function to display expiring items on the expiration page
    function displayExpiringItems() {
        if (!expiringItemsDiv) return;
        const today = new Date();
        const expiring = items.filter(item => item.expirationDate && new Date(item.expirationDate) <= today); // Check if expirationDate exists

        expiring.sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate));

        expiringItemsDiv.innerHTML = expiring.length === 0 ? '<p>No items expiring soon.</p>' :
            expiring.map(item => `<p>${item.name} expires on ${item.expirationDate}</p>`).join('');
    }
});