document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('item-input');
    const addButton = document.getElementById('add-button');
    const clearButton = document.getElementById('clear-button');
    const shoppingList = document.getElementById('shopping-list');

    let itemsArray = JSON.parse(localStorage.getItem('items')) || [];

    // Function to render the list
    function renderList() {
        shoppingList.innerHTML = '';
        itemsArray.forEach((item, index) => {
            const listItem = document.createElement('li');
            const itemText = document.createElement('span');
            itemText.textContent = item.name;
            if (item.purchased) {
                itemText.classList.add('purchased');
            }
            listItem.appendChild(itemText);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit-Items';
            editButton.classList.add('edit');
            editButton.addEventListener('click', () => editItem(index));
            listItem.appendChild(editButton);

            itemText.addEventListener('click', () => markPurchased(index));
            shoppingList.appendChild(listItem);
        });
    }

    // Function to add an item
    function addItem() {
        const itemName = itemInput.value.trim();
        if (itemName) {
            itemsArray.push({ name: itemName, purchased: false });
            itemInput.value = '';
            updateLocalStorage();
            renderList();
        }
    }

    // Function to edit an item
    function editItem(index) {
        const newItemName = prompt('Edit item:', itemsArray[index].name);
        if (newItemName !== null) {
            itemsArray[index].name = newItemName.trim();
            updateLocalStorage();
            renderList();
        }
    }

    // Function to mark an item as purchased
    function markPurchased(index) {
        itemsArray[index].purchased = !itemsArray[index].purchased;
        updateLocalStorage();
        renderList();
    }

    // Function to clear the list
    function clearList() {
        itemsArray = [];
        updateLocalStorage();
        renderList();
    }

    // Function to update local storage
    function updateLocalStorage() {
        localStorage.setItem('items', JSON.stringify(itemsArray));
    }

    // Event listeners
    addButton.addEventListener('click', addItem);
    clearButton.addEventListener('click', clearList);

    // Initial render
    renderList();
});
