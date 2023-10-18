import { TextField } from "@mui/material";
import debounce from 'lodash/debounce';
import React from "react";

export const Filter = ({ onChange }: { onChange: (text: string) => void }) => {
    const [text, setText] = React.useState<string>('');

    React.useEffect(() => {
        onChangeDebounce();
    }, [text])

    const onChangeDebounce = debounce(() => {
        onChange(text);
    }, 700)

    return (
        <TextField
            label="Quick Filter"
            value={text}
            onChange={event => setText(event.target.value)}
        />
    )
}