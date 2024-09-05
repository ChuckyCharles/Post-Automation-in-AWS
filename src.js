const postContent = document.getElementById('post-content');
const postImage = document.getElementById('post-image');
const scheduleDate = document.getElementById('schedule-date');
const scheduleTime = document.getElementById('schedule-time');
const socialAccounts = document.getElementById('social-accounts');

const previewContent = document.getElementById('preview-content');
const previewImage = document.getElementById('preview-image');
const previewSchedule = document.getElementById('preview-schedule');

postContent.addEventListener('input', updatePreview);
postImage.addEventListener('change', updateImagePreview);
scheduleDate.addEventListener('input', updateSchedulePreview);
scheduleTime.addEventListener('input', updateSchedulePreview);

function updatePreview() {
    previewContent.textContent = postContent.value;
}

function updateImagePreview() {
    const file = postImage.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        previewImage.style.display = 'none';
    }
}

function updateSchedulePreview() {
    const date = scheduleDate.value;
    const time = scheduleTime.value;
    if (date && time) {
        previewSchedule.textContent = `Scheduled for ${date} at ${time}`;
    } else {
        previewSchedule.textContent = '';
    }
}

const schedulePost = async (postData) => {
    try {
        const response = await fetch('/api/accounts/schedule-post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('Post scheduled successfully:', result);
        } else {
            console.error('Failed to schedule post:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const handleSubmit = () => {
    const postData = {
        content: postContent.value,
        time: `${scheduleDate.value}T${scheduleTime.value}:00Z`,
        accounts: Array.from(socialAccounts.selectedOptions).map(option => option.value),
    };

    schedulePost(postData);
};

document.getElementById('schedule-form').addEventListener('submit', (e) => {
    e.preventDefault();  // Prevent default form submission
    handleSubmit();
});
