fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const tabsContainer = document.getElementById('tabs');
        const accordionContainer = document.getElementById("accordion");

        // Tabs Header Group 
        const tabHeader = document.createElement('div');
        tabHeader.className = 'tab-header';

        // Tabs Content Box
        const tabContent = document.createElement('div');
        tabContent.className = 'tab-content';

        data.forEach((section, index) => {

            // Tab Button Element Creation
            const tabButton = document.createElement('button');
            tabButton.textContent = section.title;

            // Accordion Item Element Creation
            const accordionItem = document.createElement('div');
            accordionItem.className = 'accordion-item';

            // Accordion Header Element Creation
            const accordionHeader = document.createElement('div');
            accordionHeader.className = 'accordion-header';
            accordionHeader.textContent = section.title;

            // Accordion Content Element Creation
            const accordionContent = document.createElement('div');
            accordionContent.className = 'accordion-content';
            accordionContent.innerHTML = section.content;

            // Arrow Icon Element Creation
            const toggleIcon = document.createElement('span');
            toggleIcon.className = 'toggle-icon';
            accordionHeader.appendChild(toggleIcon);


            // To allow content opened between both modes to to be consistent.
            [tabButton, accordionHeader].forEach(element => {

                element.addEventListener('click', () => {
                    // Close accordion if it is opened
                    if(accordionHeader.classList.contains('active')){
                        accordionHeader.classList.remove('active');
                        accordionContent.style.display = 'none';
                    } else{
                        // Selecting a tab
                        document.querySelectorAll('.tab-header button').forEach(btn => btn.classList.remove('active'));
                        document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');
    
                        tabButton.classList.add('active');
                        tabContent.innerHTML = section.content;
                        tabContent.style.display = 'block';

                        // Selecting an accordion
                        document.querySelectorAll('.accordion-header').forEach(header => header.classList.remove('active'));
                        document.querySelectorAll('.accordion-content').forEach(content => content.style.display = 'none');
    
                        accordionHeader.classList.add('active');
                        accordionContent.style.display = 'block';

                    }
                });

            });

            // Open first section when first launched
            if (index === 0){
                tabButton.classList.add('active');
                tabContent.innerHTML = section.content;
                tabContent.style.display = 'block';

                accordionHeader.classList.add('active');
                accordionContent.style.display = 'block';
            }

            tabHeader.appendChild(tabButton);

            accordionItem.appendChild(accordionHeader);
            accordionItem.appendChild(accordionContent);
            accordionContainer.appendChild(accordionItem);
        });

        tabsContainer.appendChild(tabHeader);
        tabsContainer.appendChild(tabContent);

    })
    .catch(error => console.error('Error loading data: ', error));