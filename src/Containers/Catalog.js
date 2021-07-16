import React from 'react';
import CardIHERB from "../Components/Card";
import firebase from "../firebase";
import {Container, Grid, Link, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    link: {
        padding: '5%',
        display: 'block'
    },
    input: {
        width: '100%'
    }
}));
function Catalog() {
    const [iherb, setIherb] = React.useState([]);
    const classes = useStyles();
    const [search, setSearch] = React.useState('');
    React.useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore();
            const data = await db.collection("iherb").get();
            setIherb(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        fetchData();
    }, []);
    const changeSearch = (e) => {
        const val = e.target.value;
        setSearch(val)
    }
    return (
        <Container className={classes.root}>
            <Link className={classes.link} href="/admin" >
                Админка
            </Link>
            <TextField
                type="text"
                onChange={changeSearch}
                id="imageButton"
                label="Поиск"
                value={search}
                className={classes.input}
            />
            <Grid container spacing={3}>
                {
                    iherb.filter(item => search.length ? item.name.includes(search) : true).map((item, index) => <CardIHERB item={item} key={index}/>)
                }
            </Grid>
        </Container>
    );
}

export default Catalog;
