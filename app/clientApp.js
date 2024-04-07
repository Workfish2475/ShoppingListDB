const socket = io('http://localhost:3000');

function renderList(items) {
    const list = document.getElementById('groceryItems');

    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.style.display = 'flex'; 
        listItem.style.alignItems = 'center'; 
        listItem.style.padding = '10px';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.style.marginRight = '10px';

        const detailsContainer = document.createElement('div');
        detailsContainer.style.flexGrow = '1'; 

        const quantityDiv = document.createElement('div');
        quantityDiv.textContent = `Quantity: ${item.quantity}`;
        
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `Item: ${item.item}`;
        
        const storeDiv = document.createElement('div');
        storeDiv.textContent = `Store: ${item.store}`;

        detailsContainer.appendChild(quantityDiv);
        detailsContainer.appendChild(itemDiv);
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

    const quantityInput = createStyledInput('Enter quantity');
    const itemInput = createStyledInput('Enter item name');
    const storeInput = createStyledInput('Enter store name');
    storeInput.style.marginBottom = '0';

    detailsContainer.appendChild(quantityInput);
    detailsContainer.appendChild(itemInput);
    detailsContainer.appendChild(storeInput);

    listItem.appendChild(checkbox);
    listItem.appendChild(detailsContainer);

    list.appendChild(listItem);
}

function addListeners(){
    const button = document.getElementById('groceryAdd');
    button.addEventListener('click', () => {
        addInput();
    });
}

socket.on('connect', () => {
    console.log('A client has connected to the server');
    addListeners();
});

socket.on('groceryItems', (items) => {
    renderList(items);
})
