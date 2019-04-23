const PREFIX = '#';

export function extractTags(currentActivity) {
    const extractedTags = [];

    if(currentActivity !== '' && currentActivity !== undefined) {
        extractedTags.push(extractFromActivity(currentActivity));
    } else if ( currentActivity === undefined ) {
        return [];
    }

    return extractedTags;
}

function extractFromActivity(activity) {
    return PREFIX + activity.toString().toLowerCase();
}