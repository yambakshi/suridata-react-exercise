import { StyledErrorMessage } from "./errorMessage.style"

export const ErrorMessage = ({ message }: { message: string }) => {
    return (
        <StyledErrorMessage>
            <div>{message}</div>
        </StyledErrorMessage>
    )
}