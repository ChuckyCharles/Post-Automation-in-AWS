function filterAnalytics() {
    // For demonstration, using static data
    const data = [
        {
            content: "New product launch!",
            date: "2024-08-30",
            platform: "Facebook",
            impressions: 1500,
            engagements: 300,
            reach: 1200
        },
        {
            content: "Check out our blog!",
            date: "2024-08-29",
            platform: "Twitter",
            impressions: 2000,
            engagements: 450,
            reach: 1800
        },
        // Add more dummy data as needed
    ];

    let filteredData = data;
    
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const platform = document.getElementById('platform').value;

    if (startDate && endDate) {
        filteredData = filteredData.filter(post => post.date >= startDate && post.date <= endDate);
    }

    if (platform !== 'all') {
        filteredData = filteredData.filter(post => post.platform.toLowerCase() === platform);
    }

    populateAnalytics(filteredData);
}

function populateAnalytics(data) {
    const totalPosts = data.length;
    const totalImpressions = data.reduce((acc, post) => acc + post.impressions, 0);
    const totalEngagements = data.reduce((acc, post) => acc + post.engagements, 0);
    const totalReach = data.reduce((acc, post) => acc + post.reach, 0);

    document.getElementById('total-posts').textContent = totalPosts;
    document.getElementById('total-impressions').textContent = totalImpressions;
    document.getElementById('total-engagements').textContent = totalEngagements;
    document.getElementById('total-reach').textContent = totalReach;

    const analyticsData = document.getElementById('analytics-data');
    analyticsData.innerHTML = '';

    data.forEach(post => {
        const row = `<tr>
            <td>${post.content}</td>
            <td>${post.date}</td>
            <td>${post.platform}</td>
            <td>${post.impressions}</td>
            <td>${post.engagements}</td>
            <td>${post.reach}</td>
        </tr>`;
        analyticsData.innerHTML += row;
    });
}

// Initial load with all data
filterAnalytics();
