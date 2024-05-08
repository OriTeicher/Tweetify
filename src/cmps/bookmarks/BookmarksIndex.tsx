import React, { useState } from 'react'
import { feedService } from '../../services/feed.service'
import { FeedPost } from '../../services/interface.service'
import { FeedPreview } from '../feed/FeedPreview'

const demoBookmarks = feedService.getRandomPosts(5)

export default function BookmarksIndex() {
    const [bookmarks, setBookmarks] = useState<FeedPost[]>(demoBookmarks)

    return (
        <section className="bookmarks-index">
            <ul className="bookmark-list">
                {/* {bookmarks.map((bookmark: FeedPost) => (
                    <FeedPreview props={bookmark} />
                ))} */}
            </ul>
        </section>
    )
}
