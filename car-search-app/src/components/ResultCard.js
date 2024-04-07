import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ResultCard = ({ car }) => {
    return (
        <Card sx={{ maxWidth: 345, m: 2 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {car.make} {car.model}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Year: {car.year}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Price: ${car.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Mileage: {car.mileage} miles
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
};

export default ResultCard;