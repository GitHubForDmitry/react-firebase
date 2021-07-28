import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { Grid} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        marginTop: 20,
    },
    media: {
        height: 0,
        paddingTop: '126.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    marginB: {
        marginBottom: 20
    },
    description: {
        minHeight: 63
    }
}));

export default function CardIHERB({item, fullscreen}) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Grid item xs={12} lg={3} sm={6}>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {item.name[0]}
                        </Avatar>
                    }
                    title={item.name}
                    subheader={item.date}
                />
                {item.image ?
                    <CardMedia
                        className={classes.media}
                        image={item.image}
                    /> : (<Typography>image not laoded</Typography>)
                }

                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                        {item.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Цена {+item.price + (+item.priceAdd || 0)} грн
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {item.count !== '0' ? `Количество ${item.count}`: 'нет в наличии'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Категория {item.category}
                    </Typography>
                </CardContent>
                {/*<CardActions disableSpacing>*/}
                {/*    <IconButton*/}
                {/*        className={clsx(classes.expand, {*/}
                {/*            [classes.expandOpen]: expanded,*/}
                {/*        })}*/}
                {/*        onClick={handleExpandClick}*/}
                {/*        aria-expanded={expanded}*/}
                {/*        aria-label="show more"*/}
                {/*    >*/}
                {/*        <ExpandMoreIcon />*/}
                {/*    </IconButton>*/}
                {/*</CardActions>*/}
                {/*<Collapse in={expanded} timeout="auto" unmountOnExit>*/}
                {/*    <CardContent>*/}
                {/*        <Typography paragraph>Method:</Typography>*/}
                {/*    </CardContent>*/}
                {/*</Collapse>*/}
            </Card>
        </Grid>
    );
}
