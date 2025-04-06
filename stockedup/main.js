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
            itemDiv.innerHTML = `
                <p><strong>Item:</strong> ${item.name}</p>
                <p><strong>Quantity:</strong> ${item.quantity}</p>
                <p><strong>Expiration Date:</strong> ${item.expirationDate || 'Not specified'}</p>
                <button class="delete-button" data-item-name="${item.name}">Delete</button>
            `;
            inventoryList.appendChild(itemDiv);
        });

        // Add event listeners to the delete buttons after they are added to the DOM
        const deleteButtons = inventoryList.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemName = this.dataset.itemName;
                deleteItem(itemName);
            });
        });
    }

    // Event listener for adding a new item (Pantry Page)
    if (addItemForm) {
        addItemForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (errorDiv) {
                errorDiv.textContent = "";
            }

            const itemName = document.getElementById('itemName').value.trim();
            const quantity = parseInt(document.getElementById('quantity').value);
            const expirationDate = document.getElementById('expirationDate').value;

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
            expirationDate: expirationDate || null,
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

    // Function to delete an item
    function deleteItem(itemName) {
        if (confirm(`Are you sure you want to delete ${itemName}?`)) {
            items = items.filter(item => item.name !== itemName);
            saveItemsToLocalStorage(items);
            displayItems(items);
            displayExpiringItems(); // Refresh expiring items
        }
    }

    // Function to display expiring items on the Expiration Page
    function displayExpiringItems() {
        if (!expiringItemsDiv) return;

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to the beginning of the day for comparison

        const expiringItems = items.filter(item => {
            if (item.expirationDate) {
                const expirationDate = new Date(item.expirationDate);
                expirationDate.setHours(0, 0, 0, 0);
                return expirationDate <= today;
            }
            return false;
        });

        expiringItems.sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate));

        expiringItemsDiv.innerHTML = expiringItems.length === 0
            ? '<p>No items expiring today or in the past.</p>'
            : expiringItems.map(item =>
                `<p><strong>${item.name}</strong> expires on <strong>${item.expirationDate}</strong></p>`
            ).join('');
    }
});