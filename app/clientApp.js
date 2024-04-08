const socket = io('http://localhost:3000');

function renderList(items) {
    const list = document.getElementById('groceryItems');

    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.style.display = 'flex'; 
        listItem.style.alignItems = 'center'; 
        listItem.style.padding = '10px';

        const detailsContainer = document.createElement('div');
        detailsContainer.style.flexGrow = '1'; 

        const quantityDiv = document.createElement('div');
        quantityDiv.textContent = `Quantity: ${item.quantity}`;
        
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `<strong>${item.item}</strong>`;

        const dateDiv = document.createElement('div');
        let dateTemp = new Date(item.dateRO);
        let dateForm = dateTemp.toDateString('en-us');
        dateDiv.innerHTML =  `When: ${dateForm}`;

        const storeDiv = document.createElement('div');
        storeDiv.textContent = `Store: ${item.store}`;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.style.marginRight = '10px';

        checkbox.addEventListener('click', () => {
            deleteGroceryItem(item.item);
        });
 
        detailsContainer.appendChild(itemDiv);
        detailsContainer.appendChild(quantityDiv);
        detailsContainer.appendChild(dateDiv);
        detailsContainer.appendChild(storeDiv);
    
        listItem.appendChild(checkbox);
        listItem.appendChild(detailsContainer);
    
        list.appendChild(listItem);
    });
}

function addInput() {
    const list = document.getElementById('groceryItems');

    const listItem = document.createElement('li');
    listItem.style.display = 'flex';
    listItem.style.alignItems = 'center';
    listItem.style.padding = '10px';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.marginRight = '10px';

    const detailsContainer = document.createElement('div');
    detailsContainer.style.flexGrow = '1';
    detailsContainer.style.display = 'flex';
    detailsContainer.style.flexDirection = 'column';

    const createStyledInput = (placeholder) => {
        const input = document.createElement('input');
        input.placeholder = placeholder;
        input.style.border = 'none';
        input.style.outline = 'none';
        input.style.backgroundColor = 'transparent';
        input.style.marginBottom = '5px';
        return input;
    };

    const dateInput = document.createElement('input');
    dateInput.id = 'dateShit';
    dateInput.type = 'date';
    dateInput.style.border = 'none';
    dateInput.style.outline = 'none';
    dateInput.style.backgroundColor = 'transparent';

    dateInput.addEventListener('change', () => {
        const testing = document.getElementById('dateShit');
        dateInput.value = testing.value;
    });

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Add';
    submitButton.addEventListener('click', () => {

        const dateTemp = new Date(dateInput.value + "T00:00-0800");

        const quantity = quantityInput.value;
        const itemName = itemInput.value;
        const storeName = storeInput.value;
        const itemDate = dateTemp;

        console.log(dateTemp);
        console.log(itemDate);

        const item = {
            item: itemName,
            quantity: quantity,
            dateRO: itemDate,
            store: storeName
        };

        addGroceryItem(item);
    });

    const quantityInput = createStyledInput('Quantity...');
    const itemInput = createStyledInput('Item...');
    const storeInput = createStyledInput('Store...');
    storeInput.style.marginBottom = '0';

    detailsContainer.appendChild(itemInput);
    detailsContainer.appendChild(quantityInput);
    detailsContainer.appendChild(dateInput);
    detailsContainer.appendChild(storeInput);

    listItem.appendChild(checkbox);
    listItem.appendChild(detailsContainer);
    listItem.appendChild(submitButton);

    list.appendChild(listItem);
}

function addListeners(){
    const button = document.getElementById('groceryAdd');
    button.addEventListener('click', () => {
        addInput();
    });
}

function addGroceryItem(groceryItem){
    console.log('Reached addGroceryItem function (client side)');
    socket.emit('addGroceryItem', groceryItem);
    location.reload();
}

function deleteGroceryItem(groceryItem){
    console.log('Reached deleteGroceryItem function (client side)');
    socket.emit('deleteGroceryItem', groceryItem);
    location.reload();
}

socket.on('connect', () => {
    console.log('A client has connected to the server');
    addListeners();
});

socket.on('groceryItems', (items) => {
    renderList(items);
})
