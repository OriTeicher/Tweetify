import React from 'react';
import { Verified, MoreHoriz, MoreVert } from '@mui/icons-material';
import { utilService } from '../../services/util.service';

interface FeedCredentialsProps {
  id: string;
  displayName: string;
  username: string;
  verified: boolean;
  createdAt: number;
  txt?: string;
  imgUrl?: string;
  handleRemovePost: Function;
  onImgClick: Function;
  filterBy: string;
}

const FeedCredentials: React.FC<FeedCredentialsProps> = ({
  id,
  displayName,
  username,
  verified,
  createdAt,
  txt,
  imgUrl,
  onImgClick,
  handleRemovePost,
  filterBy,
}) => {
  const onRemovePostClick = (postId: string) => {
    handleRemovePost(postId);
  };

  const handleImgClick = () => onImgClick();

  const truncatedUsername =
    username.length > 15 ? username.slice(0, 3) + '...' : username;

  const highlightMatchedText = (text: string, filterBy: string) => {
    const regex = new RegExp(`(${filterBy})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  const markedDisplayName = truncatedUsername.includes(filterBy) ? (
    <span
      dangerouslySetInnerHTML={{
        __html: highlightMatchedText(displayName, filterBy),
      }}
    ></span>
  ) : (
    displayName
  );

  const markedUsername = truncatedUsername.includes(filterBy) ? (
    <span
      dangerouslySetInnerHTML={{
        __html: highlightMatchedText(truncatedUsername, filterBy),
      }}
    ></span>
  ) : (
    username
  );

  const markedTxt = txt ? (
    <pre
      className="post-txt"
      dangerouslySetInnerHTML={{
        __html: highlightMatchedText(txt, filterBy),
      }}
    ></pre>
  ) : null;

  return (
    <section className="post-info-container">
      <div className="top-cred">
        <h1>{markedDisplayName}</h1>
        {verified && <Verified className="verified-logo" />}
        <h2>@{markedUsername}</h2>
        <h3>.</h3>
        <p className="post-date">{utilService.getCurrentDate(createdAt)}</p>
        <MoreHoriz
          className="more-icon"
          onClick={() => onRemovePostClick(id)}
        />
        <MoreVert
          className="more-icon mobile"
          onClick={() => onRemovePostClick(id)}
        />
      </div>
      {markedTxt}
      {imgUrl && (
        <img
          src={imgUrl}
          className="post-photo"
          alt="NOTHING TO SEE HERE 🖼️"
          onClick={handleImgClick}
        ></img>
      )}
    </section>
  );
};

export default FeedCredentials;
