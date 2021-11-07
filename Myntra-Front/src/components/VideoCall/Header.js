import React from 'react'
// import './styles.css'
import logo from '../../logo.svg'
import videoimg from '../../images/video_call.svg'
import { Header,Header__logoContainer, Header__logoContainer_p,Header__icons,Hero__title,Hero_buttons,Hero__learnMore } from './VideoCallElements'
const VideoCall = () => {
    return (
        <div className="container">
        <Header>
            <Header__logoContainer>
                    <img
                    src={logo}
                    alt="google"
                    className="header__logo"
                    />

                <Header__logoContainer_p>Meet</Header__logoContainer_p>
            </Header__logoContainer>
            <Header__icons>
                <i class="small material-icons">perm_identity</i>
            </Header__icons>
        </Header>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="row">
                <div className="col s12 m6">
                    <img src={videoimg} alt="Myntra Meet" className="responsive-img" />
                </div>
                <div className="col s12 m6">
                    <div>
                        <Hero__title>
                            Shop with your Family & Friends
                        </Hero__title>
                        <blockquote>
                        Now Shop With Your Family & Friends Online at the comfort of your home
                        </blockquote>
                    </div>
                        <Hero_buttons>
                            <a href="https://myntra-meet.web.app" class="btn pink lighten-2"><span class="white-text text-darken-2"><i class="material-icons right">video_camera_front</i>New Meeting</span></a>
                        </Hero_buttons>
                        <div className="divider"></div>
                        <Hero__learnMore>Learn more about Myntra Meet</Hero__learnMore>
                </div>
        </div>
        </div>
    )
}

export default VideoCall
