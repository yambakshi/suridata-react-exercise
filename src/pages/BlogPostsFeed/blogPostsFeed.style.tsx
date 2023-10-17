import styled from "styled-components";

export const StyledBlogPostsFeed = styled.div`
    height: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        color: darkslategray;
    }

    .data-grid-toolbar {
        width: 100%;
        margin-bottom: 1rem;
        display: flex;

        // Quick filter
        .quick-filter-container {
            flex: 1;

            .MuiFormControl-root {
                width: 100%;

                .MuiInputBase-root,
                .MuiOutlinedInput-root,
                .MuiInputBase-colorPrimary {
                    color: darkslategray;

                    .MuiOutlinedInput-notchedOutline {
                        border-color: darkslategray;
                    }
                }

                .MuiFormLabel-root {
                    color: darkslategray;
                }
            }
        }

        .translations-container {
            display: flex;
            align-items: center;

            .MuiFormControl-root {
                margin-left: 1rem;

                .MuiFormLabel-root {
                    color: darkslategray;
                }

                .MuiInputBase-root  > div {
                    padding-bottom: 9px;
                }

                .MuiSvgIcon-root {
                    color: darkslategray;
                }

                .MuiOutlinedInput-notchedOutline {
                    border-color: darkslategray;
                }
            }
        }
    }

    .data-grid-container {
        width: 100%;
        height: 631px;

        .MuiDataGrid-root {
        }
    
        .MuiDataGrid-root,
        .MuiTablePagination-root {
            color: darkslategray;
        }
    }
`