const PREFIX = '#';

export function extractTags(items) {
    // Take props and derive tags from their text
    const { activity, title, content } = items.flowData;
    const extractedTags = [];

    if(activity !== '') {
        extractedTags.push(extractFromActivity(activity));
    }
    return extractedTags;
}

function extractFromActivity(activity) {
    return PREFIX + activity.toString().toLowerCase();
}