const iconMap = {
    'planning': 'project',
    'programming': 'laptop',
    'debugging': 'alert',
    'researching': 'search'
}


export function mapIcon(type) {
    return iconMap[type];
}

export function mapFlowStatusToBadge(flowStatus) {
    switch (flowStatus) {
        case 'ACTIVE':
            return "processing";
        case 'PAUSED':
            return "warning";
        case 'COMPLETED':
            return "success";
        default:
            return "processing";
    }
}

export function mapStringToColor(str) {
    const tagColorMap = {
        'java': '#5382a1',
        'javascript': '#f0db4f',
        'python': '#306998',
        'code': '#0078d7',
        'fixme': '#f50',
        'fix': '#2ecc71',
        'todo': '#faad14',
        'bug': '#ff6f00',
        'error': '#ff0033',
        'enhancement': '#2db7f5',
        'feature': '#87d068',
        'planning': 'project',
        'programming': 'laptop',
        'debugging': 'alert',
        'researching': 'search',
        'active': '#1890ff',
        'paused': '#faad14',
        'completed': '#52c41a',
    }
    
    var string = str.replace('#', '');

    if (tagColorMap[string] !== undefined) {
        return tagColorMap[string];
    } else {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        var color = '#'
        for (var j = 0; j < 3; j++) {
            var value = (hash >> (j * 8)) & 0xFF;
            color += ('00' + value.toString(16)).substr(-2);
        }
        return color;
    }
}