import React from 'react';
import {SpellInput} from "../Components/SpellInput";
import firebase from "../firebase";
import {Button, Container, Grid, TextField, Link} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    link: {
        padding: '5%',
        display: 'block'
    },
    mb: {
        marginBottom: 20
    },
    input: {
        width: '100%'
    },
    image: {
        width: 300,
        height: 'auto'
    }
}));
function Admin() {
    const [iherb, setIherb] = React.useState([]);
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [image, setImage] = React.useState('');
    const [count, setCount] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [search, setSearch] = React.useState('');
    const classes = useStyles();
    React.useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore();
            const data = await db.collection("iherb").get();
            setIherb(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        fetchData();
    }, []);
    const onCreate = () => {
        const db = firebase.firestore();
        db.collection("iherb").add(
            {
                image,
                name,
                description,
                price,
                count,
                category,
                date: new Date().toLocaleString()
            }
        );

        setName('')
        setImage('')
        setDescription('')
        setCount('')
        setPrice('')
        setCategory('')
    };
    const handleChangeImage = (e) => {
        e.preventDefault();
        try {
            let reader = new FileReader();
            let file = e.target.files[0];
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        } catch (e) {
            console.log(e.message);
        } finally {
            setImage("");
        }
    }

    const changeSearch = (e) => {
        const val = e.target.value;
        setSearch(val)
    }
    return (
        <Container>
            <Link className={classes.link} href="/" >
                Главная
            </Link>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={3} sm={6}>
                    <TextField
                        type="text"
                        onChange={changeSearch}
                        id="imageButton2"
                        label="Поиск"
                        value={search}
                    />
                    <br/>
                    <br/>
                    <br/>
                    <TextField
                        type="file"
                        onChange={handleChangeImage}
                        id="imageButton3"
                    />
                    <img src={image} className={classes.image}/>
                    <br/>
                    <div>
                        <TextField
                            value={name}
                            label="Имя"
                            onChange={e => {
                                setName(e.target.value);
                            }}
                            className={classes.input}
                        />
                        <br/>
                        <TextField
                            value={description}
                            label="Описание"
                            onChange={e => {
                                setDescription(e.target.value);
                            }}
                            className={classes.input}
                        />
                        <br/>
                        <TextField
                            value={price}
                            label="Цена"
                            onChange={e => {
                                setPrice(e.target.value);
                            }}
                            className={classes.input}
                        />
                        <br/>
                        <TextField
                            value={count}
                            label="Количество"
                            onChange={e => {
                                setCount(e.target.value);
                            }}
                            className={classes.input}
                        />

                        <br/>
                        <TextField
                            value={category}
                            label="Категория"
                            onChange={e => setCategory(e.target.value)}
                            className={classes.input}
                        />

                        <br/>
                        <br/>
                        <br/>
                        <Button className={classes.mb} variant="contained" color="primary" onClick={onCreate}>Create</Button>

                    </div>
                    {iherb
                        .filter((item) => {
                            const buff = [];

                            if (search.length) {
                                buff.push(item.name.toUpperCase().includes(search.toUpperCase()));
                            }
                            console.log(item.name.toUpperCase(), 'item.name.toUpperCase()')
                            console.log(search.toUpperCase(), 'isearch')
                            return buff.every(Boolean);
                        })
                        .map((vitamin, index) => (
                            <SpellInput key={index} spell={vitamin}/>
                    ))}
                </Grid>
            </Grid>
        </Container>

    );
}

export default Admin;
