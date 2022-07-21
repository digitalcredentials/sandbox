// Button that copies to clipboard whatever string it is given as a prop
// Based on https://codesandbox.io/s/react-copy-to-clipboard-button-with-material-ui-c8sly3?from-embed


import {
	Button,
	Box,
	Snackbar,
 } from '@mui/material'
import { unstable_getThemeValue } from '@mui/system'
import { useState } from 'react'
import React from 'react'


type PropsType = {
	value: string;
};

const CopyToClipboardButton = ({value}: PropsType) => {
	const [open, setOpen] = useState(false)
	const handleClick = () => {
		setOpen(true)
		// TODO: Make sure that this works on safari once site is published with https!!
		navigator.clipboard.writeText(value)
	}
	return (
		<Box sx={{
				position: "absolute",
				zIndex: 999,
				//TODO: Reference constants in margin!!!
				right: "8%",
				alignSelf: "flex-end",
			}}>
			<Button
				onClick={handleClick}
				variant="outlined"
				sx={{mr: "5px", mt: "3px"}}
			>Copy to Clipboard</Button>
			<Snackbar
				open={open}
				onClose={() => setOpen(false)}
				autoHideDuration={2000}
				message="Copied to clipboard"
			/>
		</Box>
	)
}
export default CopyToClipboardButton