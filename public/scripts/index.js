
document.addEventListener("DOMContentLoaded", function(){  
   //access JSON files async
    fetch("blogs.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(blog => {
            // createCard(blog.title);
            createAndAppendCard(blog.title, blog.preview, blog.time)
            
        });
    })
    .catch(error => {
        console.error('Error fetching blogs:', error);
    });
})




function createCard(title) {
    const cardContainer = document.getElementById('card-container');
    const form = document.createElement('form')
    form.method = 'get'
    form.action = `/blog/${title}`
    const card = document.createElement('div');
    card.className = 'card';

    const iconDiv = document.createElement('div');
    iconDiv.className = 'icon';
    iconDiv.innerHTML = `
        <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.984 16.815c2.596 0 4.706-2.111 4.706-4.707 0-1.409-.623-2.674-1.606-3.538-.346-.303-.735-.556-1.158-.748-.593-.27-1.249-.421-1.941-.421s-1.349.151-1.941.421c-.424.194-.814.447-1.158.749-.985.864-1.608 2.129-1.608 3.538 0 2.595 2.112 4.706 4.706 4.706zm.016-8.184c1.921 0 3.479 1.557 3.479 3.478 0 1.921-1.558 3.479-3.479 3.479s-3.479-1.557-3.479-3.479c0-1.921 1.558-3.478 3.479-3.478zm5.223.369h6.777v10.278c0 2.608-2.114 4.722-4.722 4.722h-14.493c-2.608 0-4.785-2.114-4.785-4.722v-10.278h6.747c-.544.913-.872 1.969-.872 3.109 0 3.374 2.735 6.109 6.109 6.109s6.109-2.735 6.109-6.109c.001-1.14-.327-2.196-.87-3.109zm2.055-9h-12.278v5h-1v-5h-1v5h-1v-4.923c-.346.057-.682.143-1 .27v4.653h-1v-4.102c-1.202.857-2 2.246-2 3.824v3.278h7.473c1.167-1.282 2.798-2 4.511-2 1.722 0 3.351.725 4.511 2h7.505v-3.278c0-2.608-2.114-4.722-4.722-4.722zm2.722 5.265c0 .406-.333.735-.745.735h-2.511c-.411 0-.744-.329-.744-.735v-2.53c0-.406.333-.735.744-.735h2.511c.412 0 .745.329.745.735v2.53z"></path>
        </svg>
    `;

    const titleElement = document.createElement('strong');
    titleElement.textContent = title;

    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'card__body';
    bodyDiv.textContent = 'Are we missing out on life?';

    const button = document.createElement('button');
    button.innerHTML = '<span>Read Now!</span>';
    button.className = "arrow-btn";
    button.type = 'submit'
    card.appendChild(iconDiv);
    card.appendChild(titleElement);
    card.appendChild(bodyDiv);
    card.appendChild(button);
    form.appendChild(card)
    cardContainer.appendChild(form);
}


function createAndAppendCard(blogTitle, preview, time) {
    // Create elements
    const form = document.createElement('form');
    const card = document.createElement('div');
    const title = document.createElement('h3');
    const content = document.createElement('p');
    const date = document.createElement('div');
    const arrow = document.createElement('div');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const button = document.createElement("button")
    // Set classes and attributes
    card.className = 'card';
    title.className = 'card__title';
    content.className = 'card__content';
    date.className = 'card__date';
    arrow.className = 'card__arrow';
    button.className = 'invisible-btn'
    form.method = 'get'
    form.action = `/blog/${blogTitle}`
    button.type = `submit`

    // Set text content
    title.textContent = blogTitle;
    content.textContent = preview;
    date.textContent = time;

    // Set SVG attributes
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('height', '15');
    svg.setAttribute('width', '15');
    path.setAttribute('fill', '#fff');
    path.setAttribute('d', 'M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z');

    // Assemble SVG
    svg.appendChild(path);
    button.appendChild(svg)
    arrow.appendChild(button);

    // Assemble card
    card.appendChild(title);
    card.appendChild(content);
    card.appendChild(date);
    card.appendChild(arrow);
    // form.appendChild(button)

    // Assemble form
    form.appendChild(card);

    // Append form to card-container
    const cardContainer = document.getElementById('card-container');
    cardContainer.appendChild(form);
}
const edit = document.getElementById("edit-form")

edit.addEventListener("submit", function(event){
    // event.preventDefault();
    const title = document.createElement('h3').value;   
    window.location.href = `/edit/${title}`;
})