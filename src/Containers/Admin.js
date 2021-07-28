import React from 'react';
import {SpellInput} from "../Components/SpellInput";
import firebase from "../firebase";
import {Button, Container, Grid, TextField, Link, CircularProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
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
    },
    loadingImage: {
        width: 286,
        height: 370,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));
function Admin() {
    const [iherb, setIherb] = React.useState([]);
    const [name, setName] = React.useState('');
    const [urlImage, setUrlImage] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [priceAdd, setPriceAdd] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [count, setCount] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [search, setSearch] = React.useState('');
    const [loading, setLoading] = React.useState(false);
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
                name,
                description,
                price,
                count,
                category,
                urlImage,
                priceAdd,
                date: new Date().toLocaleString()
            }
        );

        setDescription('')
        setCount('')
        setPrice('')
        setCategory('')
        setUrlImage('')
        setPriceAdd('')
    };
    const handleChangeImage = async (e) => {
        setLoading(true)
        e.preventDefault();
        let file = e.target.files[0];
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`images/${file.name}`);
        await fileRef.put(file)
        await fileRef.getDownloadURL().then((data) => {
            setUrlImage(data);
            setLoading(false)
        })

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
                    {loading ?
                        <div className={classes.loadingImage}>
                            <CircularProgress />
                        </div>
                     :
                    <div>
                        <TextField
                            type="file"
                            onChange={handleChangeImage}
                            id="imageButton3"
                        />
                        <img src={urlImage} className={classes.image}/>
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
                                value={priceAdd}
                                label="Доп цена"
                                onChange={e => {
                                    setPriceAdd(e.target.value);
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
                            <Button className={classes.mb} variant="contained" color="primary"
                                    onClick={onCreate}>Create</Button>
                    </div>
                    </div>}
                    {iherb
                        .filter((item) => {
                            const buff = [];

                            if (search.length) {
                                buff.push(item.name.toUpperCase().includes(search.toUpperCase()));
                            }
                            return buff.every(Boolean);
                        })
                        .map((vitamin, index) => (
                            <SpellInput key={vitamin.id} spell={vitamin}/>
                    ))}
                </Grid>
            </Grid>
        </Container>

    );
}

export default Admin;
