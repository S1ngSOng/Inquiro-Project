fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('container');

        const noOfItems = Object.keys(data).length;

        const baseLayout = document.createElement('div');
        baseLayout.className = 'border-b border-slate-500 md:grid md:grid-cols-(noOfItems) md:grid-rows-[2rem, 4rem] md:auto-rows-min'
        baseLayout.id = 'base';

        data.forEach((section, index) => {
            
            const header = document.createElement('div');
            header.className = 'flex-1 p-2.5 bg-slate-300 cursor-pointer transition-colors duration-300 rounded-t-lg text-x1 font-bold max-md:hover:bg-slate-400 md:row-start-1 md:text-center';
            header.textContent = section.title;
            header.id = 'header';

            const content = document.createElement('div');
            // NOTE: 'md:col-span-(noOfItems)' is not working, however it is meant to adapt to the number of items in the data.json file
            content.className = 'p-2.5 bg-slate-200 hidden md:p-5 md:border md:border-slate-500 md:border-t-0 md:col-span-4 md:row-start-2 ';
            content.innerHTML = section.content;
            content.id = 'content';

            const toggleIcon = document.createElement('span');
            toggleIcon.className = 'float-right w-5 h-5 bg-contain bg-center bg-no-repeat bg-[url(./images/down-arrow.png)] md:hidden';
            toggleIcon.id = 'toggleIcon';
            header.appendChild(toggleIcon);

            header.addEventListener('click', () => {

                //Checks if webapp is in the mobile interface and if user is clicking an opened accordion.
                if(window.innerWidth < 768 && header.classList.contains('bg-slate-500')){
                    header.classList.replace('bg-slate-500', 'bg-slate-300');
                    toggleIcon.classList.replace('bg-[url(./images/up-arrow.png)]', 'bg-[url(./images/down-arrow.png)]');
                    content.classList.add('max-md:hidden');
                }
                else{
                    document.querySelectorAll('#header').forEach(header => {
                        header.classList.replace('bg-slate-500', 'bg-slate-300');
                        header.querySelector('#toggleIcon').classList.replace('bg-[url(./images/up-arrow.png)]', 'bg-[url(./images/down-arrow.png)]');
                    });
                    document.querySelectorAll('#content').forEach(content => {
                        content.classList.replace('block', 'hidden');
                        content.classList.remove('max-md:hidden');
                    });

                    header.classList.replace('bg-slate-300', 'bg-slate-500');
                    content.classList.replace('hidden', 'block');
                    toggleIcon.classList.replace('bg-[url(./images/down-arrow.png)]', 'bg-[url(./images/up-arrow.png)]');
                }
                
            });

            if(index === 0){
                header.classList.replace('bg-slate-300', 'bg-slate-500');
                content.classList.replace('hidden', 'block');
                toggleIcon.classList.replace('bg-[url(./images/down-arrow.png)]', 'bg-[url(./images/up-arrow.png)]');
            }

            baseLayout.appendChild(header);
            baseLayout.appendChild(content);
        });

        container.appendChild(baseLayout);

    })
    .catch(error => console.error('Error loading data: ', error));