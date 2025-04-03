document.addEventListener('DOMContentLoaded', () => {
    // Newsletter subscription form handling
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('newsletterEmail').value;
        alert(`Thank you for subscribing with ${email}!`);
        newsletterForm.reset();
    });

    // Pantry Page: Inventory Management
    const addItemForm = document.getElementById('addItemForm');
    const searchForm = document.getElementById('searchForm');
    const inventoryList = document.getElementById('inventoryList');
    const expiringItemsDiv = document.getElementById('expiringItems');
    const errorDiv = document.getElementById('error');

    let items = loadItemsFromLocalStorage();
    displayItems(items);

    function saveItemsToLocalStorage(items) {
        localStorage.setItem('pantryItems', JSON.stringify(items));
    }

    function loadItemsFromLocalStorage() {
        const storedItems = localStorage.getItem('pantryItems');
        return storedItems ? JSON.parse(storedItems) : [];
    }

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
                <p><strong>Expiration Date:</strong> ${item.expirationDate}</p>
                <button class="delete-button" onclick="deleteItem('${item.name}')">Delete</button>
            `;
            inventoryList.appendChild(itemDiv);
        });
    }

    addItemForm.addEventListener('submit', (event) => {
        event.preventDefault();
        errorDiv.textContent = "";

        const itemName = document.getElementById('itemName').value;
        const quantity = parseInt(document.getElementById('quantity').value);
        const expirationDate = document.getElementById('expirationDate').value;

        if (!itemName || quantity <= 0 || !expirationDate) {
            errorDiv.textContent = "Please fill in all fields correctly.";
            return;
        }

        addItem(itemName, quantity, expirationDate);
    });

    function addItem(itemName, quantity, expirationDate) {
        const newItem = {
            name: itemName,
            quantity: quantity,
            expirationDate: expirationDate,
        };
        items.push(newItem);
        saveItemsToLocalStorage(items);
        displayItems(items);
        addItemForm.reset();
    }

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchQuery = document.getElementById('searchQuery').value.toLowerCase();
        const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchQuery));
        displayItems(filteredItems);
    });

    window.deleteItem = (itemName) => {
        items = items.filter(item => item.name !== itemName);
        saveItemsToLocalStorage(items);
        displayItems(items);
    };

    function displayExpiringItems() {
        if (!expiringItemsDiv) return;
        const today = new Date();
        const expiring = items.filter(item => new Date(item.expirationDate) <= today);

        expiring.sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate));

        expiringItemsDiv.innerHTML = expiring.length === 0 ? '<p>No items expiring soon.</p>' :
            expiring.map(item => `<p>${item.name} expires on ${item.expirationDate}</p>`).join('');     
    }
    displayExpiringItems();
});