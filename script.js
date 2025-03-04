fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const tabsContainer = document.getElementById('tabs');
        const accordionContainer = document.getElementById("accordion");

        // Tabs Header Group 
        const tabHeader = document.createElement('div');
        tabHeader.className = 'flex border-b border-slate-500';
        tabHeader.id = 'tabHeader';

        // Tabs Content Box
        const tabContent = document.createElement('div');
        tabContent.className = 'p-5 border border-slate-500 border-t-0 bg-slate-200 hidden';
        tabContent.id = 'tabContent';

        data.forEach((section, index) => {

            // Tab Button Element Creation
            const tabButton = document.createElement('button');
            tabButton.className = 'flex-1 p-2.5 bg-slate-300 cursor-pointer transition-colors duration-300 rounded-t-lg text-x1 font-bold';
            tabButton.id = 'tabButton';
            tabButton.textContent = section.title;

            // Accordion Item Element Creation
            const accordionItem = document.createElement('div');
            accordionItem.className = 'border-b border-slate-500';
            tabButton.id = 'tabButton';

            // Accordion Header Element Creation
            const accordionHeader = document.createElement('div');
            accordionHeader.className = 'flex-1 p-2.5 bg-slate-300 cursor-pointer transition-colors duration-300 rounded-t-lg text-x1 font-bold hover:bg-slate-400';
            accordionHeader.textContent = section.title;
            accordionHeader.id = 'accordionHeader';

            // Accordion Content Element Creation
            const accordionContent = document.createElement('div');
            accordionContent.className = 'p-2.5 bg-slate-200 hidden';
            accordionContent.innerHTML = section.content;
            accordionContent.id = 'accordionContent';

            // Arrow Icon Element Creation
            const toggleIcon = document.createElement('span');
            toggleIcon.className = 'w-5 h-5 bg-contain bg-center bg-no-repeat';
            toggleIcon.id = 'toggleIcon';
            accordionHeader.appendChild(toggleIcon);


            // To allow content opened between both modes to to be consistent.
            [tabButton, accordionHeader].forEach(element => {

                element.addEventListener('click', () => {
                    // Close accordion if it is opened
                    if(accordionHeader.classList.contains('bg-slate-500')){
                        //Select to Unselect
                        accordionHeader.classList.replace('bg-slate-500', 'bg-slate-300');
                        //toggleIcon remove up arrow
                        //toggleIcon add down arrow
                        accordionContent.classList.add('hidden');
                    } else{
                        // Selecting a tab
                        document.querySelectorAll('#tabButton').forEach(btn => btn.classList.replace('bg-slate-500', 'bg-slate-300'));
                        document.querySelectorAll('#tabContent').forEach(content => content.classList.replace('block', 'hidden'));
    
                        tabButton.classList.replace('bg-slate-300', 'bg-slate-500');
                        tabContent.innerHTML = section.content;
                        tabContent.classList.replace('hidden', 'block');

                        // Selecting an accordion
                        document.querySelectorAll('#accordionHeader').forEach(header => header.classList.replace('bg-slate-500', 'bg-slate-300') /*Add replacing arrow heads*/);
                        document.querySelectorAll('#accordionContent').forEach(content => content.classList.replace('block', 'hidden'));
    
                        accordionHeader.classList.replace('bg-slate-300', 'bg-slate-500');
                        accordionContent.classList.replace('hidden', 'block');
                        //Add arrow head toggling

                    }
                });

            });

            // Open first section when first launched
            if (index === 0){
                tabButton.classList.replace('bg-slate-300', 'bg-slate-500');
                tabContent.innerHTML = section.content;
                tabContent.classList.replace('hidden', 'block');

                accordionHeader.classList.replace('bg-slate-300', 'bg-slate-500');
                accordionContent.classList.replace('hidden', 'block');
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