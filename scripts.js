document.addEventListener('DOMContentLoaded', () => {
    let isEditing = false;
    const password = '1014';
    
    const toggleModeButton = document.getElementById('toggleMode');
    const passwordContainer = document.getElementById('passwordContainer');
    const submitPasswordButton = document.getElementById('submitPassword');
    const passwordInput = document.getElementById('password');
    const calendarDiv = document.getElementById('calendar');
    const scheduleContainer = document.getElementById('scheduleContainer');
    const scheduleForm = document.getElementById('scheduleForm');
    const addEventButton = document.getElementById('addEvent');
    const closeFormButton = document.getElementById('closeForm');
    const dateInput = document.getElementById('date');
    const eventInput = document.getElementById('event');
    
    const today = new Date();
    let events = {};
    
    function generateCalendar() {
        calendarDiv.innerHTML = '';
        for (let i = 0; i < 28; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const dateString = `${year}-${month}-${day}`;
            
            const dayDiv = document.createElement('div');
            dayDiv.textContent = `${month}/${day}`;
            calendarDiv.appendChild(dayDiv);
            
            if (events[dateString]) {
                events[dateString].forEach(event => {
                    const eventDiv = document.createElement('div');
                    eventDiv.className = 'schedule-item';
                    eventDiv.innerHTML = `
                        <span class="event-dot"></span>${event}
                        ${isEditing ? '<button class="deleteEvent">삭제</button>' : ''}
                    `;
                    dayDiv.appendChild(eventDiv);
                });
            }
        }
        
        if (isEditing) {
            document.querySelectorAll('.deleteEvent').forEach(button => {
                button.addEventListener('click', handleDeleteEvent);
            });
        }
    }
    
    function handleDeleteEvent(event) {
        const parentDiv = event.target.parentElement;
        const dateDiv = parentDiv.parentElement;
        const dateText = dateDiv.textContent.split('/').reverse().join('-');
        
        const eventText = parentDiv.childNodes[1].textContent;
        events[dateText] = events[dateText].filter(e => e !== eventText);
        if (events[dateText].length === 0) {
            delete events[dateText];
        }
        generateCalendar();
    }
    
    function addEvent() {
        const date = dateInput.value;
        const event = eventInput.value;
        
        if (!events[date]) {
            events[date] = [];
        }
        events[date].push(event);
        generateCalendar();
        scheduleForm.classList.add('hidden');
    }
    
    function handlePasswordSubmit() {
        if (passwordInput.value === password) {
            isEditing = true;
            passwordContainer.classList.add('hidden');
            toggleModeButton.textContent = '보기 모드';
            generateCalendar();
        } else {
            alert('비밀번호가 틀립니다.');
        }
    }
    
    function handleToggleMode() {
        if (isEditing) {
            isEditing = false;
            toggleModeButton.textContent = '편집 모드';
            generateCalendar();
        } else {
            passwordContainer.classList.remove('hidden');
        }
    }
    
    toggleModeButton.addEventListener('click', handleToggleMode);
    submitPasswordButton.addEventListener('click', handlePasswordSubmit);
    addEventButton.addEventListener('click', addEvent);
    closeFormButton.addEventListener('click', () => scheduleForm.classList.add('hidden'));
    
    generateCalendar();
});
