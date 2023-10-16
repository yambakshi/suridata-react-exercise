import { StyledBlogPostVote } from './blogPostVote.style';
import { BlogPostRow } from '../../types/BlogPostRow';
import { LikeSvg } from '../../assets';
import React from 'react';

const voteColors = {
    thumbsUp: '#00aaff',
    thumbsDown: '#f00',
    idle: '#fff'
}

export const BlogPostVote = ({ row, onVote }: { row: BlogPostRow, onVote: Function }) => {
    const [vote, setVote] = React.useState<{ thumbsUp: boolean, thumbsDown: boolean }>({ thumbsUp: row.thumbsUp, thumbsDown: row.thumbsDown });
    return (
        <StyledBlogPostVote>
            <div className='thumbs-up' onClick={() => {
                row.thumbsUp = !vote.thumbsUp;
                row.thumbsDown = vote.thumbsDown && false;

                setVote({
                    ...vote,
                    thumbsUp: row.thumbsUp,
                    thumbsDown: row.thumbsDown
                })

                onVote(row);
            }}>
                <LikeSvg color={vote.thumbsUp ? voteColors.thumbsUp : voteColors.idle} />
            </div>
            <div className='thumbs-down' onClick={() => {
                row.thumbsDown = !vote.thumbsDown;
                row.thumbsUp = vote.thumbsUp && false;

                setVote({
                    ...vote,
                    thumbsUp: row.thumbsUp,
                    thumbsDown: row.thumbsDown
                })

                onVote(row);
            }}>
                <LikeSvg color={vote.thumbsDown ? voteColors.thumbsDown : voteColors.idle} />
            </div>
        </StyledBlogPostVote>
    )
}