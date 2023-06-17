import React, { Component } from 'react'
import PostPreview from './PostPreview'
export default class PostsList extends Component {
    render() {
        return (
            <section className="posts-list">
                <ul>
                    <PostPreview />
                    <PostPreview />
                </ul>
            </section>
        )
    }
}
