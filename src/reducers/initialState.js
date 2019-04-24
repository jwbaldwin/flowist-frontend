export default {
	flow: {
		data: [],
		isLoading: true
	},
    flowDebug: {
        data: [{
            "id":"8f170426-8ba8-439f-97bc-577d9016cc16",
            "activity":"planning",
            "title":"Need to add in delete methods",
            "content":"# Things to do for this\n* Can't delete\n * Connect to RDS\n * prod requests",
            "tags":["#todo"],
            "created":"2019-02-25T03:57:38.244Z",
            "flowStatus":"ACTIVE"},
            {
            "id":"cd48822c-d407-4bca-b342-f48edb670637",
            "activity":"debugging",
            "title":"Testing multiple flows",
            "content":"# Things to do for this\n* Can't delete\n * Connect to RDS\n * prod requests",
            "tags":["#active"],
            "created":"2019-02-25T03:57:38.244Z",
            "flowStatus":"COMPLETED"},
            {
            "id":"8f170426-8ba8-439f-97bc-577d9016cc16",
            "activity":"planning",
            "title":"Need to add in delete methods",
            "content":"# Things to do for this\n* Can't delete\n * Connect to RDS\n * prod requests",
            "tags":["#todo"],
            "created":"2019-02-25T03:57:38.244Z",
            "flowStatus":"COMPLETED"},],

        isLoading: true
    },
    logs: {
        data: [],
        isLoading: true
    },
    logsDebug: {
        data: [{
            "author": 'Han Solo',
            "avatar": 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            "content": "This is a testing log that will be #used to #test edits and deletes and so on",
            "datetime": "2019-02-25T03:57:38.244Z",
           },
           {
            "author": 'Luke Skywalker',
            "avatar": 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            "content": "This is a second testing log that will be #used to #test edits and deletes and spacing",
            "datetime": "2019-02-25T12:57:38.244Z",
           }],
        isLoading: true
    },
	user: {
        isAuthenticated: false
    },
    settings: {
        theme: 'dark'
    }
};