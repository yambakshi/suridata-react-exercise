import { CircularProgress } from "@mui/material"
import { StyledLoading } from "./loading.style"

export const Loading = () => {
    return (
        <StyledLoading>
            <CircularProgress />
        </StyledLoading>
    )
}