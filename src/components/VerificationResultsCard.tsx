import { VerificationResultsProps } from "../components/Props";
import {
	Alert,
	AlertTitle,
	Box,
	Card,
	CardActionArea,
	CardContent,
	Divider,
	Grid,
	Typography,
 } from '@mui/material'
import { useState, FC } from 'react'
import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

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
		<Card
			sx={{
				width: "100%",
				mt: "1.5rem",
			}}
		>
			<CardContent>
				<Grid container spacing={2}>
					<Grid item xs={3}>
						<Alert
							severity={verificationSuccess ? "success" : "error"}
							icon={false}
							sx={{
								// TODO: store this color in consts!!!
								width: "100%",
								height: "100%",
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Typography
								align="center"
								variant="h3"
								sx={{
									mx: "0.5rem",
								}}
							>
								{verificationSuccess && <CheckCircleIcon
								fontSize="large"
								sx={{
									color: "green",
									mb: "-10px",
									mr: "8px",
								}}
								/>}

								{!verificationSuccess && <CancelIcon
								fontSize="large"
								sx={{
									color: "red",
									mb: "-10px",
									mr: "8px",
								}}
								/>}
								{!verificationSuccess && "Verification Failed"}
								{verificationSuccess && "Verification Success"}
							</Typography>
						</Alert>
					</Grid>
					<Grid item xs={0.1}><Divider orientation="vertical"/></Grid>
					<Grid item xs={8.5}>
						<Alert
							severity="error"
							icon={false}
							sx={{
								height:"100%",
								width:"100%",
								backgroundColor: "#f3f4f6",
							}}
						>
							{error &&
								<Box>
									<AlertTitle><strong>{error.name}</strong></AlertTitle>
									{error.message}
								</Box>
							}

							{!error &&
								<Box>
									<h2>{results[0].id}: {results[0].valid ? "true": "false"}</h2>
									<h2>{results[1].id}: {results[1].valid ? "true": "false"}</h2>
									<h2>{results[2].id}: {results[2].valid ? "true": "false"}</h2>
									<h2>{results[3].id}: {results[3].valid ? "true": "false"}</h2>
								</Box>
							}
						</Alert>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
};