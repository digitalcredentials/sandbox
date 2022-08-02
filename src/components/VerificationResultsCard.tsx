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
import { VerificationCheck } from "./VerificationCheck";

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
				<Grid
					container
					spacing={2}
					sx={{
						mb:"-8px"
					}}
				>
					{/* Overall pass/fail display on left hand side */}
					<Grid item xs={3}>
						<Alert
							severity={verificationSuccess ? "success" : "error"}
							icon={false}
							sx={{
								color: "black",
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
									fontWeight: "800",
								}}
							>

								{/* Overall Check or X */}
								{verificationSuccess && <CheckCircleIcon
								fontSize="large"
								sx={{
									color: "green",
									mr: "8px",
								}}
								/>}
								{!verificationSuccess && <CancelIcon
								fontSize="large"
								sx={{
									color: "red",
									mr: "8px",
								}}
								/>}

								<br/>
								
								{/* Overall verification message */}
								{!verificationSuccess && "Verification Failed"}
								{verificationSuccess && "Verification Success"}
							</Typography>
						</Alert>
					</Grid>

					<Grid item xs={0.1}><Divider orientation="vertical"/></Grid>
					
					{/* More detailed verification results on right hand side */}
					<Grid item xs={8.5}>
						<Alert
							severity="error"
							icon={false}
							sx={{
								height:"100%",
								width:"100%",
								backgroundColor: "#f3f4f6",
								color: "black",
							}}
						>
							
							{/* If an error is thrown display the error */}
							{error &&
								<Box>
									<AlertTitle>
										<strong>{error.name}</strong>
									</AlertTitle>
									{error.message}
								</Box>
							}

							{/* If received verification results, display these */}
							{!error &&
								<Grid
									container
									spacing={2}
								>

									{/* Display issuer level checks */}
									<Grid item xs={6}>
										<AlertTitle>
											<strong>Issuer</strong>
											<VerificationCheck
												valid={results[2].valid}
												message=
													{`Issuing institution
														${results[2].valid ? "can" : "cannot"}
													be reached for verification`}
											/>
										</AlertTitle>
									</Grid>

									{/* Display credential level checks */}
									<Grid item xs={6}>
										<AlertTitle>
											<strong>Credential</strong>
										</AlertTitle>
										<VerificationCheck
											valid={results[1].valid}
											message=
												{`Has
													${results[1].valid ? "a valid" : "an invalid"}
												digital signature`}
										/>
										<VerificationCheck
											valid={results[0].valid}
											message=
												{`Has
													${results[0].valid ? "not" : ""}
												expired`}
										/>
										<VerificationCheck
											valid={results[3].valid}
											message=
												{`Has
													${results[3].valid ? "not" : ""}
												been revoked by issuer`}
										/>
									</Grid>
								</Grid>
							}
						</Alert>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
};