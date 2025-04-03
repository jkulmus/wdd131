document.addEventListener('DOMContentLoaded', () => {
    const homeImages = [
        'styles/homeImages/1.jpg', 'styles/homeImages/2.jpg', 'styles/homeImages/3.jpg',
        'styles/homeImages/4.jpg', 'styles/homeImages/5.jpg', 'styles/homeImages/6.jpg'
    ];
    const pantryImages = [
        'styles/pantryImages/1.jpg', 'styles/pantryImages/2.jpg', 'styles/pantryImages/3.jpg',
        'styles/pantryImages/4.jpg', 'styles/pantryImages/5.jpg', 'styles/pantryImages/6.jpg',
        'styles/pantryImages/7.jpg', 'styles/pantryImages/8.jpg', 'styles/pantryImages/9.jpg',
        'styles/pantryImages/10.jpg', 'styles/pantryImages/11.jpg', 'styles/pantryImages/12.jpg',
        'styles/pantryImages/13.jpg'
    ];

    // Random Image display functions
    function displayRandomImages(imageArray, targetDivId) {
        const targetDiv = document.getElementById(targetDivId);
        if (!targetDiv) {
            console.log('Target div not found:', targetDivId);
            return;
        }

        const shuffledImages = imageArray.sort(() => 0.5 - Math.random()).slice(0, 3);
        shuffledImages.forEach(url => {
            const img = document.createElement('img');
            img.src = url;
            img.alt = 'Random food item';
            img.style.width = '200px';
            img.style.height = 'auto';
            img.style.borderRadius = '8px';
            targetDiv.appendChild(img);
        });
    }

    displayRandomImages(homeImages, 'randomHomeImages');
    displayRandomImages(pantryImages, 'randomPantryImages');


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
                <img src="${item.imageSrc || 'placeholder.jpg'}" alt="Image of ${item.name}" style="width: 100px; height: auto; border-radius: 5px;">
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
        const imageInput = document.querySelector('input[name="itemImage"]');
        const imageFile = imageInput.files[0];

        if (!itemName || quantity <= 0 || !expirationDate) {
            errorDiv.textContent = "Please fill in all fields correctly.";
            return;
        }

        let imageSrc = null;
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imageSrc = e.target.result;
                addItem(itemName, quantity, expirationDate, imageSrc);
            };
            reader.readAsDataURL(imageFile);
        } else {
            addItem(itemName, quantity, expirationDate, imageSrc);
        }
    });

    function addItem(itemName, quantity, expirationDate, imageSrc) {
        const newItem = {
            name: itemName,
            quantity: quantity,
            expirationDate: expirationDate,
            imageSrc: imageSrc,
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