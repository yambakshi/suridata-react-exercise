import styled from "styled-components";

export const StyledBlogPostsFeed = styled.div`
    height: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        color: #fff;
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
                    color: #fff;

                    .MuiOutlinedInput-notchedOutline {
                        border-color: #fff;
                    }
                }

                .MuiFormLabel-root {
                    color: #fff;
                }
            }
        }

        .translations-container {
            display: flex;
            align-items: center;

            div {
                display: flex;
                cursor: pointer;
                margin-left: 10px;
            }
        }
    }

    .data-grid-container {
        width: 100%;
    
        .MuiDataGrid-root,
        .MuiTablePagination-root {
            color: #fff;

            .MuiToolbar-root > .MuiTablePagination-actions{
                .Mui-disabled {
                    color: #757575;
                }
            }
        }
    }
`