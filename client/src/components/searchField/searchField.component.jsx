import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';

const SearchField = ({people=[],followUser}) => {
    return (
        <div>
        {
            people.map(user=>{
                return(
                    <Card key={user._id} >
                        <CardHeader
                        avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {user.username[0]}
                        </Avatar>
                        }
                        title={user.username}
                        action={
                            <Button variant="contained" onClick={()=>{followUser(user)}} >Follow</Button>
                        }
                    />
                </Card>
                )
            })
        }
        </div>

    );
};

export default SearchField;