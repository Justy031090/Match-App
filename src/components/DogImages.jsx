import React, { Component } from 'react';
import dogsApi from '../api/dogsApi';
import './dog-image.css';
import dogLoveImage from '../assets/Dog-Love2.jpg';

export class DogImages extends Component {
    state = {
        dogImages: [],
        dogUrl: 'Lets check if you are a dog lover !',
        index: 0,
        like: 0,
        dislike: 0,
        loading: false,
    };
    async componentDidMount() {
        const data = await dogsApi.get('/breeds/image/random/10');
        this.setState({
            dogImages: data.data.message,
        });
    }
    renderCard = () => {
        const rendered = this.state.dogImages.map((image, index) => {
            return <img key={index} src={image} alt="https://http.cat/404" />;
        });
        if (this.state.index < 10) {
            return this.setState({
                dogUrl: rendered[this.state.index],
                index: this.state.index + 1,
            });
        } else {
            if (this.state.like > this.state.dislike) {
                this.setState({
                    dogUrl: (
                        <div>
                            <img
                                src={dogLoveImage}
                                alt="Something Gone Wrong"
                            />
                        </div>
                    ),
                });
            } else
                this.setState({
                    dogUrl: (
                        <div>
                            <img src="https://http.cat/409" alt="Not Found" />
                        </div>
                    ),
                });
        }
    };
    likeHandle = () => {
        this.renderCard();
        if (this.state.like < 10)
            this.setState({ like: this.state.like + 1, loading: false });
    };
    dislikeHandle = () => {
        this.renderCard();
        if (this.state.dislike < 10)
            this.setState({ dislike: this.state.dislike + 1, loading: false });
    };
    render() {
        return (
            <div>
                <div className="counters">
                    <span className="like fa fa-thumbs-up">
                        {this.state.like}
                    </span>
                    <span className="dislike 	fa fa-thumbs-down">
                        {this.state.dislike}
                    </span>
                </div>
                <div className="image-container">{this.state.dogUrl}</div>
                {this.state.loading && (
                    <div className="no-spinner">Loading...</div>
                )}
                <div className="buttons">
                    <button onClick={() => this.likeHandle()}>
                        <i className="fa fa-check"> </i>
                    </button>
                    <button onClick={() => this.dislikeHandle()}>
                        <i className="fa fa-close"></i>
                    </button>
                </div>
            </div>
        );
    }
}

export default DogImages;
