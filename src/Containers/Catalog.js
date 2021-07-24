import React from 'react';
import CardIHERB from "../Components/Card";
import firebase from "../firebase";
import {ButtonGroup, Container, Grid, Link, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
    link: {
        padding: '5%',
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
            setIherb(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
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
    );
}

export default Catalog;
