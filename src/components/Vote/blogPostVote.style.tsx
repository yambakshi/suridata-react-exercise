import styled from "styled-components";

export const StyledBlogPostVote = styled.div`
    display: flex;

    .thumbs-up, .thumbs-down {
        cursor: pointer;
    }

    .thumbs-down {
        margin-left: 5px;
        transform: rotate(180deg);
    }
`