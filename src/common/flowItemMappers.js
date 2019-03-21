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