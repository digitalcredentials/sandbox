import { VerificationResultsProps } from "../components/Props";
import {
	Button,
	Box,
	Card,
	Snackbar,
 } from '@mui/material'
import { useState, FC } from 'react'
import React from 'react'

// TODO: Create props type that takes in verification results array of key value pairs
// TODO: Format 3 sections with checks and errors, divider between first and second section

export const VerificationResultsCard: FC<VerificationResultsProps> = ({
	results,
	error,
}) => {
	var verificationSuccess = 
		!error && (
			results[0].valid &&
			results[1].valid &&
			results[2].valid &&
			results[3].valid
		);

	return (
		<Card>
			{verificationSuccess && <h1>Verifification Success</h1>}
			{!verificationSuccess && <h1>Verifification Failed</h1>}
			{error &&
				<h2>{error.name} : {error.message}</h2>
			}
			{!error &&
				<Box>
					<h2>{results[0].id}: {results[0].valid ? "true": "false"}</h2>
					<h2>{results[1].id}: {results[1].valid ? "true": "false"}</h2>
					<h2>{results[2].id}: {results[2].valid ? "true": "false"}</h2>
					<h2>{results[3].id}: {results[3].valid ? "true": "false"}</h2>
				</Box>
			}
		</Card>
	)
};