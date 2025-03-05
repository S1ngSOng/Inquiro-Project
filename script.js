fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('container');

        // Tabs Header Group 
        const tabHeader = document.createElement('div');
        tabHeader.className = 'hidden md:flex md:border-b md:border-slate-500';
        tabHeader.id = 'tabHeader';

        // Tabs Content Box
        const tabContent = document.createElement('div');
        tabContent.className = 'hidden md:p-5 md:border md:border-slate-500 md:border-t-0 md:bg-slate-200 md:hidden';
        tabContent.id = 'tabContent';

        data.forEach((section, index) => {

            // Tab Button Element Creation
            const tabButton = document.createElement('button');
            tabButton.className = 'md:flex-1 md:p-2.5 md:bg-slate-300 md:cursor-pointer md:transition-colors md:duration-300 md:rounded-t-lg md:text-x1 md:font-bold' ;
            tabButton.id = 'tabButton';
            tabButton.textContent = section.title;

            // Accordion Item Element Creation
            const accordionItem = document.createElement('div');
            accordionItem.className = 'border-b border-slate-500 md:hidden';
            tabButton.id = 'tabButton';

            // Accordion Header Element Creation
            const accordionHeader = document.createElement('div');
            accordionHeader.className = 'flex-1 p-2.5 bg-slate-300 cursor-pointer transition-colors duration-300 rounded-t-lg text-x1 font-bold hover:bg-slate-400 md:hidden';
            accordionHeader.textContent = section.title;
            accordionHeader.id = 'accordionHeader';

            // Accordion Content Element Creation
            const accordionContent = document.createElement('div');
            accordionContent.className = 'p-2.5 bg-slate-200 hidden md:hidden';
            accordionContent.innerHTML = section.content;
            accordionContent.id = 'accordionContent';

            // Arrow Icon Element Creation
            const toggleIcon = document.createElement('span');
            toggleIcon.className = 'float-right w-5 h-5 bg-contain bg-center bg-no-repeat bg-[url(./images/down-arrow.png)] md:hidden';
            toggleIcon.id = 'toggleIcon';
            accordionHeader.appendChild(toggleIcon);


            // To allow content opened between both modes to to be consistent.
            [tabButton, accordionHeader].forEach(element => {

                element.addEventListener('click', () => {
                    // Close accordion if it is opened
                    if(accordionHeader.classList.contains('bg-slate-500')){
                        //Click to unselect
                        accordionHeader.classList.replace('bg-slate-500', 'bg-slate-300');
                        toggleIcon.classList.replace('bg-[url(./images/up-arrow.png)]', 'bg-[url(./images/down-arrow.png)]');
                        accordionContent.classList.add('hidden');
                    } else{
                        // Selecting a tab
                        document.querySelectorAll('#tabButton').forEach(btn => btn.classList.replace('md:bg-slate-500', 'md:bg-slate-300'));
                        document.querySelectorAll('#tabContent').forEach(content => content.classList.replace('md:block', 'md:hidden'));
    
                        tabButton.classList.replace('md:bg-slate-300', 'md:bg-slate-500');
                        tabContent.innerHTML = section.content;
                        tabContent.classList.replace('md:hidden', 'md:block');

                        // Selecting an accordion
                        document.querySelectorAll('#accordionHeader').forEach(header => {
                            header.classList.replace('bg-slate-500', 'bg-slate-300'); /*Add replacing arrow heads*/});
                        document.querySelectorAll('#accordionContent').forEach(content => content.classList.replace('block', 'hidden'));
                        document.querySelectorAll('#toggleIcon').forEach(icon => icon.classList.replace('bg-[url(./images/up-arrow.png)]', 'bg-[url(./images/down-arrow.png)]'));
    
                        accordionHeader.classList.replace('bg-slate-300', 'bg-slate-500');
                        accordionContent.classList.replace('hidden', 'block');
                        toggleIcon.classList.replace('bg-[url(./images/down-arrow.png)]', 'bg-[url(./images/up-arrow.png)]')

                    }
                });

            });

            // Open first section when first launched
            if (index === 0){
                tabButton.classList.replace('md:bg-slate-300', 'md:bg-slate-500');
                tabContent.innerHTML = section.content;
                tabContent.classList.replace('md:hidden', 'md:block');

                accordionHeader.classList.replace('bg-slate-300', 'bg-slate-500');
                accordionContent.classList.replace('hidden', 'block');
                toggleIcon.classList.replace('bg-[url(./images/down-arrow.png)]', 'bg-[url(./images/up-arrow.png)]')
            }

            tabHeader.appendChild(tabButton);
            accordionItem.appendChild(accordionHeader);
            accordionItem.appendChild(accordionContent);
            container.appendChild(accordionItem);
        });

        container.appendChild(tabHeader);
        container.appendChild(tabContent);

    })
    .catch(error => console.error('Error loading data: ', error));