import React from "react";
import firebase from '../firebase'
import {Button, Grid, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        margin: '5%',
    },
    mb: {
        marginBottom: 20
    },
    mr: {
        marginRight: 10
    },
    input: {
        width: '100%'
    }
}));
export const SpellInput = ({ spell }) => {
  const [name, setName] = React.useState(spell.name);
  const [price, setPrice] = React.useState(spell.price);
  const [description, setDescription] = React.useState(spell.description);
  const [image, setImage] = React.useState(spell.image);
  const [count, setCount] = React.useState(spell.count);
  const [category, setCategory] = React.useState(spell.category);
  const classes = useStyles();
  const onUpdate = () => {
    const db = firebase.firestore();

    db.collection('iherb').doc(spell.id).set(
        {
            ...spell,
            image,
            name,
            description,
            price,
            count,
            category,
            date: new Date().toLocaleString()
        }
    )}

  const onDelete = () => {
    const db = firebase.firestore()
    db.collection('iherb').doc(spell.id).delete()
  }

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

  return (
      <Grid container spacing={3}>
        <Grid item className={classes.root} >
        <div className={classes.mb}>
            <div
                className="dish__image"
                style={{ backgroundImage: `url(${image})` }}
            >
            </div>

                <TextField
                    type="file"
                    onChange={handleChangeImage}
                    className={classes.input}
                />
        </div>
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
                multiline
                rows={4}
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
                onChange={e => {
                    setCategory(e.target.value);
                }}
                className={classes.input}
            />
            <br/>
            <br/>
            <br/>

            <Button className={classes.mr} variant="contained" color="primary" onClick={onUpdate}>Update</Button>
            <Button variant="contained" color="secondary" onClick={onDelete}>Delete</Button>
        <br/>
        <br/>
        <br/>
        </div>
      </Grid>
      </Grid>
  );
};
