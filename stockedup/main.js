document.addEventListener('DOMContentLoaded', () => {
    const randomImagesDiv = document.getElementById('randomImages');
    const imagesUrls = [
        'styles/home/1.jpg',
        'styles/home/2.jpg',
        'styles/home/3.jpg',
        'styles/home/4.jpg',
        'styles/home/5.jpg',
        'styles/home/6.jpg',
        'styles/home/7.jpg',
        'styles/home/8.jpg',
        'styles/home/9.jpg',
        'styles/home/10.jpg'
    ];

    function loadRandomImages() {
        randomImagesDiv.innerHTML = '';
        const shuffledImages = imagesUrls.sort(() => 0.5 - Math.random()).slice(0, 3);
        shuffledImages.forEach(url => {
            const img = document.createElement('img');
            img.src = url;
            img.alt = 'Food storage item';
            img.style.width = '200px';
            img.style.height = 'auto';
            img.style.borderRadius = '8px';
            randomImagesDiv.appendChild(img);
        });
    }

    loadRandomImages();

    function saveItemsToLocalStorage(items) {
        localStorage.setItem('pantryItems', JSON.stringify(items));
    }

    function loadItemsFromLocalStorage() {
        const items = localStorage.getItem('pantryItems');
        return items ? JSON.parse(items) : [];
    }

    const addItemForm = document.getElementById('addItemForm');
    const searchForm = document.getElementById('searchForm');
    const inventoryList = document.getElementById('inventoryList');
    const expiringItemsDiv = document.getElementById('expiringItems');

    function displayItems(items) {
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
                `;
            inventoryList.appendChild(itemDiv);
        });
    }

    function displayExpiringItems(items) {
        expiringItemsDiv.innerHTML = '';
        const today = new Date();
        const expiring = items.filter(item => new Date(item.expirationDate) <= today);
        
        if (expiring.length === 0) {
            expiringItemsDiv.innerHTML = '<p>No items expiring soon.</p>';
            return;
        }

        expiring.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('expiring-soon');
            itemDiv.textContent = `${item.name} expires on ${item.expirationDate}`;
            expiringItemsDiv.appendChild(itemDiv);
        });
    }

    function addItem(event) {
        event.preventDefault();
        const errorDiv = document.getElementById('error');

        const itemName = document.getElementById('itemName').value.trim();
        const quantity = document.getElementById('quantity').value.trim();
        const expirationDate = document.getElementById('expirationDate').value.trim();

        if (!itemName || !quantity || !expirationDate) {
            alert("Please fill in all fields.");
            return;
        }

        const newItem = { name: itemName, quantity: quantity, expirationDate: expirationDate };
        const items = loadItemsFromLocalStorage();
        items.push(newItem);
        saveItemsToLocalStorage(items);
        displayItems(items);
        displayExpiringItems(items);
        addItemForm.reset();
    }

    function searchItems(event) {
        event.preventDefault();
        const searchQuery = document.getElementById('searchQuery').value.toLowerCase();
        const items = loadItemsFromLocalStorage();
        const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchQuery));
        displayItems(filteredItem => item.name.toLowerCase().includes(searchQuery)
    );
    displayItems(filteredItems);
    }

    function deleteItem(itemName) {
        const items = loadItemsFromLocalStorage();
        const updatedItems = items.filtered(item => item.name !== itemName);
        saveItemsToLocalStorage(updatedItems);
        displayItems(updatedItems);
        displayExpiringItems(updatedItems);
    }
    
    // Attach event listeners
    addItemForm.addEventListener('submit', addItem);
    searchForm.addEventListener('submit', searchItems);

    // Load and display items on page load
    const items = loadItemsFromLocalStorage();
    displayItems(items);
    displayExpiringItems(items);
});