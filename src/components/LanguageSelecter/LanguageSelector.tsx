import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { LanguageContext } from "../../common/context/LanguageContext"
import { FranceSvg, SpainSvg, USASvg } from "../../assets"
import { Language } from "../../common/enums"
import React from "react"


const languagesOptions = [
    { language: Language.English, icon: <USASvg /> },
    { language: Language.Spanish, icon: <SpainSvg /> },
    { language: Language.French, icon: <FranceSvg /> }
]

export const LanguageSelector = ({ onChange }: { onChange: (event: SelectChangeEvent) => void }) => {
    const { language, setLanguage } = React.useContext(LanguageContext);

    return (
        <FormControl fullWidth >
            <InputLabel id="language-select-label">Language</InputLabel>
            <Select
                labelId="language-select-label"
                id="language-select"
                value={language}
                label="Language"
                onChange={onChange}
            >
                {languagesOptions.map(({ language, icon }) =>
                    <MenuItem
                        key={language}
                        value={language}
                    >
                        {icon}
                    </MenuItem>
                )}
            </Select>
        </FormControl >
    )
}