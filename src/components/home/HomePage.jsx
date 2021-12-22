import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: 'user',
            search: '',
            usernameInsta: '',
            loading: false,
            scarpings: [],
            typing: false,
            typingTimeout: 0
        }
        axios.get('http://localhost:5000/users/me').then((req) => {
            if (!req.data.username) {
                this.props.history.push('/login');
            } else {
                this.setState({
                    username: req.data.username
                });
            }
        }).catch((e) => {
            if (e) {
                this.props.history.push('/login');
            }
        })

        this.onInputChange = this.onInputChange.bind(this);
        this.scrapInsta = this.scrapInsta.bind(this);
        this.getScarapings = this.getScarapings.bind(this);
        this.createUserInsta = this.createUserInsta.bind(this);
        this.searchUser = this.searchUser.bind(this);
        this.openInNewTab = this.openInNewTab.bind(this);
        this.getScarapings();
    };

    scrapInsta() {
        const {
            usernameInsta,
            scarpings
        } = this.state
        this.setState({
            loading: true
        })
        axios.get(`http://localhost:5000/scrapings/${usernameInsta}/followers`).then((res) => {
            if (res) {
                scarpings.push({
                    userInsta: res.data.userInsta,
                    followers: res.data.followers,
                    following: res.data.following,
                    posts: res.data.posts
                })
                this.setState({
                    loading: false
                })
            }
        })
    }

    getScarapings() {
        const { scarpings } = this.state
        axios.get(`http://localhost:5000/scrapings`).then((scrapingsJson) => {
            scrapingsJson.data.map((v) => {
                scarpings.push({
                    userInsta: v.userInsta,
                    followers: v.followers,
                    following: v.following,
                    posts: v.posts
                })
            })
            this.setState({
                scarpings: scarpings
            })
        })
    }

    onInputChange({ target: { value, name } }) {
        switch (name) {
            case 'usernameInsta': {
                this.setState({ usernameInsta: value });
                break;
            }

            default: {
                console.log(`invalid name for login field: ${value}`);
            }
        }
    }

    searchUser = (event) => {
        const self = this;

        if (self.state.typingTimeout) {
            clearTimeout(self.state.typingTimeout);
        }

        self.setState({
            name: event.target.value,
            typing: false,
            typingTimeout: setTimeout(function () {
                self.searchDb()
            }, 500)
        });
    }

    searchDb() {
        this.setState({
            scarpings: []
        })
        const { name, scarpings } = this.state
        if (name.length < 1) {
            this.getScarapings();
        } else {

            axios.get(`http://localhost:5000/scrapings/${name}/search`).then((res) => {
                if (res) {
                    res.data.map((v) => {
                        scarpings.push({
                            userInsta: v.userInsta,
                            followers: v.followers,
                            following: v.following,
                            posts: v.posts
                        })
                    })
                    this.setState({
                        scarpings: scarpings
                    })
                }
            });
        }
    }


    updateInputValue = (value) => {
        this.setState({
            inputValue: value
        });
    }

    createUserInsta(scarping) {
        return (
            <div className="instaShown" onClick={()=>{this.openInNewTab(scarping)}}>
                <img src={require('../../assets/imgs/iconImage.png')} alt="scrap2per" />
                <h2>{scarping.userInsta}</h2>
                <div className="info">
                    <div className="followers">
                        <span>Followers</span>
                        <span>{scarping.followers}</span>
                    </div>
                    <div className="following">
                        <span>Following</span>
                        <span>{scarping.following}</span>
                    </div>
                    <div className="posts">
                        <span>Posts</span>
                        <span>{scarping.posts}</span>
                    </div>
                </div>
            </div>
        );
    }

    openInNewTab(scarping) {
        console.log('scarpingss ',scarping);
        var win = window.open(`https://www.instagram.com/${scarping.userInsta}`, '_blank');
        win.focus();
      }

    render() {

        const {
            username,
            usernameInsta,
            loading,
            scarpings,
            search
        } = this.state

        return (
            <section>
                <div className="homePage" >
                    <div className="headers">
                        <img src={require('../../assets/imgs/iconImage.png')} alt="scrap2per" />
                        <div className="scraper" >
                            <h1>{username}</h1>
                            <div>

                                <TextField
                                    className="instUsername"
                                    name="usernameInsta"
                                    id="outlined-textarea"
                                    label="Instagram Username"
                                    placeholder="Instagram Username"
                                    multiline
                                    defaultValue={usernameInsta}
                                    onChange={this.onInputChange}
                                />

                                {!loading ? <Button className="button" variant="contained" onClick={this.scrapInsta}>Scrap</Button> :
                                    <CircularProgress className="loader" />}
                            </div>
                            <TextField
                                className="search"
                                name="search"
                                id="outlined-textarea"
                                label="Search Database by name"
                                placeholder="Search Database Username"
                                multiline
                                defaultValue={search}
                                onChange={this.searchUser}
                            />
                        </div>

                    </div>
                    <hr></hr>
                    <div className="scrapings" >
                        {scarpings.map(this.createUserInsta)}
                    </div>
                </div>
            </section>
        );
    }
}

export default withRouter(HomePage);
