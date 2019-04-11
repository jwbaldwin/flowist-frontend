import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import environment from "../../environment";

const CLIENT_ID = environment.github.CLIENT_ID;
const GITHUB_GET_URL = "https://github.com/login/oauth/authorize?&client_id=" + CLIENT_ID;
const GITHUB_POST_URL = "https://github.com/login/oauth/access_token?&client_id=" + CLIENT_ID + "&client_secret=" + "secret"

export class Github extends Component {
    componentDidMount() {
        // const code =
        //     this.props.location.match(/?code=(.*)/) &&
        //     this.props.location.match(/?code=(.*)/)[1];
        // if (code) {
        // console.log(code);
        // fetch(GITHUB_POST_URL + "&code=" + code)
        //     .then(response => response.json())
        //     .then(({ token }) => {
        //         console.log(token);
        //     });
        // }
    }

	render() {
		return (
            <Button type="default" block href={GITHUB_GET_URL}>
				<Icon type="github" />Login with Github
			</Button>
		);
	}
}

export default Github;
