// Global variable to store the currently selected card
let selectedCard = 'card1';

// Function to select a card
function selectCard(card) {
    selectedCard = card;
    if(document.getElementById('delete').checked)
    {
        deleteMode(); 
    }
    if(document.getElementById('editTitle').checked)
    {
        const cardTitleInput = document.getElementById('cardTitle');
        const selectedCardTitle = document.querySelector(`.${selectedCard} h2`).textContent;
        cardTitleInput.value = selectedCardTitle;
    }
}

// Function to add work
function addWork() {
    // Get the value of the input field for work
    const workInput = document.getElementById('work');
    const work = workInput.value.trim();
    
    // Check if the input field is not empty
    if (work !== '') {
        // Get the selected card
        const card = document.querySelector(`.${selectedCard}`);
        
        // Create a new list item element
        const newWorkItem = document.createElement('li');
        newWorkItem.textContent = work;
        
        // Append the new work item to the selected card's work list
        let workList = card.querySelector('ul'); // Select the <ul> element

        // If <ul> doesn't exist, create one
        if (!workList) {
            workList = document.createElement('ul');
            card.appendChild(workList);
        }
        
        // Create a delete button for the new work item
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.id = 'deleteBtn'+(workList.childElementCount + 1); // Generate unique ID
        deleteButton.onclick = function() {
            deleteWork(newWorkItem);
        };
        deleteButton.style.display = 'none'; // Hide the delete button initially
        newWorkItem.appendChild(deleteButton);

        // Append the new work item to the <ul> element
        workList.appendChild(newWorkItem);
        
        // Clear the input field after adding work
        workInput.value = '';
    }
}



// Function to delete work
function deleteWork(u) {
    const card = document.querySelector(`.${selectedCard}`);
    const workList = card.querySelector('ul');
    workList.removeChild(u);

}

// Function to update card title
function update() {
    // Get the value of the input field for card title
    const cardTitleInput = document.getElementById('cardTitle');
    const newTitle = cardTitleInput.value.trim();
    if (newTitle!='')
    {
         // Get the selected card
    const card = document.querySelector(`.${selectedCard}`);

    // Update the card title
    const cardHeading = card.querySelector('h2');
    cardHeading.textContent = newTitle;

    // Clear the input field after updating
    cardTitleInput.value = '';
    document.getElementById('edit').style.display='none';
    }

}

// Function to clear work list
function clearWorkList() {
    const cards = document.querySelectorAll('[class^="card"]');
    
    // Loop through each card
    cards.forEach(card => {
        // Get the <ul> element inside the card
        const ul = card.querySelector('ul');
        if(ul!=null)
            ul.remove();
    });
    document.getElementById('card1Selected').checked = true;
    console.log(document.querySelectorAll('.card1 ul').length);
}

// Function to switch between modes
function changeMode() {
    const addWorkRadio = document.getElementById('addWork');
    const editTitleRadio = document.getElementById('editTitle');
    const deleteRadio = document.getElementById('delete');
    const addSection = document.getElementById('add');
    const editSection = document.getElementById('edit');
    
    if (addWorkRadio.checked) {
        addSection.style.display = 'block'; // Show the "Add" section
        editSection.style.display = 'none'; // Hide the "Edit" section
        
    } else if (editTitleRadio.checked) {
        addSection.style.display = 'none'; // Hide the "Add" section
        editSection.style.display = 'block'; // Show the "Edit" section
        const cardTitleInput = document.getElementById('cardTitle');
        const selectedCardTitle = document.querySelector(`.${selectedCard} h2`).textContent;
        cardTitleInput.value = selectedCardTitle;
    } else if (deleteRadio.checked) {
        addSection.style.display = 'none'; // Hide both "Add" and "Edit" sections
        editSection.style.display = 'none';
    }
    deleteMode();
}

// Function to switch to delete mode
function deleteMode() {
   
    const cards = document.querySelectorAll('[class^="card"]');

    if(document.getElementById('addWork').checked || document.getElementById('editTitle').checked)
    {
        cards.forEach(card=>{
            const buttons = card.querySelectorAll('ul li button');
            buttons.forEach(button => {
                button.style.display = 'none';
            });
        })

    }
    else
    {   
            cards.forEach(card => {
                const buttons = card.querySelectorAll('ul li button');
                if (card.classList.contains(selectedCard)) {
                    buttons.forEach(button => {
                        button.style.display = 'inline';
                    });
                } else {
                    buttons.forEach(button => {
                        button.style.display = 'none';
                    });
                }
            });
    }

}
