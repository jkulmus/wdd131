// Save to local storage
function saveItemsToLocalStorage(items) {
    localStorage.setItem('pantryItems', JSON.stringify(items));
}

// Load from local storage
function loadItemsFromLocalStorage() {
    const items = localStorage.getItem('pantryItems');
    return items ? JSON.parse(items) : [];
}

// Add Items to Pantry and save to local storage
document.getElementById('addItemBtn').addEventListener('submit', function(event) {
    event.preventDefault();
    const itemName = document.getElementById('itemName').value;
    const quantity = document.getElementById('quantity').value;
    const expirationDate = document.getElementById('expirationDate').value;
   Date = document.getElementById('expirationDate').value;

    if (itemName && quantity && expirationDate) {
        const newItem = { name: itemName, quantity: quantity, expirationDate: expirationDate };
        const items = loadItemsFromLocalStorage();
        items.push(newItem);
        saveItemsToLocalStorage(items);
        displayExpiringItems(items);
        displayExpiringItems(items);
        document.getElementById('addItemForm').reset();
    }
});

// Display items
function displayItems(items) {
    const inventoryList = document.getElementById('inventoryList');
    inventoryList.innerHTML = '';
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <p><strong>Item:</strong> ${item.name}</p>
            <p><strong>Quantity:</strong> ${item.quantity}</p>
            <p><strong>Expiration Date:</strong> ${item.expirationDate}</p>
        `;
        inventoryList.appendChild(itemDiv);
    });
}

// Display expiring items
function displayExpiringItems(items) {
    const expiringItemsDiv = document.getElementById('expiringItems');
    expiringItemsDiv.innerHTML = '';
    const today = new Date().toISOString().split('T')[0];
    items.forEach(item => {
        if (item.expirationDate <= today) {
            const itemDiv = document.createElement('div');
            itemDiv.textContent = `${item.name} expires on ${item.expirationDate}`;
            expiringItemsDiv.appendChild(itemDiv);
        }
    });
}

// Search functionality
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchQuery = document.getElementById('searchQuery').value.toLowerCase();
    const items = loadItemsFromLocalStorage();
    const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchQuery));
    displayItems(filteredItems);
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    const items = loadItemsFromLocalStorage();
    displayItems(items);
    displayExpiringItems(items);
});