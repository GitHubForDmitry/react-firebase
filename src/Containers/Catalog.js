import React from 'react';
import CardIHERB from "../Components/Card";
import firebase from "../firebase";
import {AppBar, ButtonGroup, Container, Grid, IconButton, Link, TextField, Toolbar} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularIndeterminate from "../Components/CircularIndeterminate";
const useStyles = makeStyles((theme) => ({
    link: {
        padding: '10px 0',
        display: 'block'
    },
    input: {
        width: '100%',
        marginBottom: 20
    },
    buttonGroup: {
        boxShadow: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexWrap: 'wrap'
        },
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            flexWrap: 'wrap'
        },
        [theme.breakpoints.up('lg')]: {
            display: 'flex',
            flexDirection: 'row'
        },
    },
    button: {
        margin: '0 5px 5px 0'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    wrapper: {
        width: '100%',
        margin: 'auto',
        position: 'relative',
        maxWidth: '1920px',
        background: 'rgba(244, 245, 249, 0.7)',
        minHeight: '100vh',
    }
}));

const filterButtons = {
    All: () => true,
    dobavkiDeti: task => task.category.indexOf('детей') !== -1,
    dobavki: task => task.category.split(', ').map(name => name.trim()).includes('Добавки'),
    solnce: task => task.category.split(', ').map(name => name.trim()).includes('Солнцезащитные средства'),
    duw: task => task.category.split(', ').map(name => name.trim()).includes('Средства для душа и ухода'),
    products: task => task.category.indexOf('Продукты') !== -1,
}

function Catalog() {
    const [iherb, setIherb] = React.useState([]);
    const classes = useStyles();
    const [search, setSearch] = React.useState('');
    const [filter, setFilter] = React.useState('All');
    React.useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore();
            const data = await db.collection("iherb").get();
            const getData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setIherb(getData);
        };
        fetchData();
    }, []);
    const changeSearch = (e) => {
        const val = e.target.value;
        setSearch(val)
    }

    function nameOfButton(name) {
        switch (name) {
            case 'dobavkiDeti':
                return 'Добавки для детей';
            case 'dobavki':
                return 'Добавки';
            case 'products':
                return 'Продукты';
            case 'solnce':
                return 'Солнцезащитные средства';
            case 'duw':
                return 'Средства для душа и ухода';
            case 'All':
                return 'Все товары';
            default:
                return false;
        }
    }
    const filterList = (
        Object.keys(filterButtons).map(name => (
                <Button className={classes.button} color="primary" variant="contained" aria-pressed={name === filter} onClick={() => setFilter(name)} key={name}>
                    {nameOfButton(name)}
                </Button>
        ))
    )

    if (iherb.length === 0) {
        return (
                <Container className={classes.root}>
                    <CircularIndeterminate />
                </Container>
                )
    }
    return (
        <React.Fragment>
            <AppBar position="static">
                <Container className={classes.root}>
                    <Toolbar className={classes.toolbar}>
                        <Link color="inherit" className={classes.link} href="tel:0665210945" >
                            <div>+38-066-521-09-45</div>
                            <div>Анастасия</div>
                        </Link>
                        <Link color="inherit" className={classes.link} href="/signin" >
                            Войти
                        </Link>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container className={classes.root}>
                    <TextField
                        type="text"
                        onChange={changeSearch}
                        id="imageButton"
                        label="Поиск"
                        value={search}
                        className={classes.input}
                    />

                    <div color="primary" className={classes.buttonGroup}>
                        {filterList}
                    </div>

                    <Grid container spacing={3}>
                        {
                            iherb
                                .filter((item) => {
                                    const buff = [];

                                    if (search.length) {
                                        buff.push(item.name.toUpperCase().includes(search.toUpperCase()));
                                    }

                                    return buff.every(Boolean);
                                })
                                .filter(filterButtons[filter])
                                .map((item, index) => <CardIHERB item={item} key={index}/>)
                        }
                    </Grid>
                </Container>
        </React.Fragment>
    );
}

export default Catalog;
