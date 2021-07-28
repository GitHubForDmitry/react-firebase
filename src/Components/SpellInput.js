import React from "react";
import firebase from '../firebase'
import {Button, CircularProgress, Grid, TextField} from "@material-ui/core";
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

  const {
      name: nameSpell,
      price: priceSpell,
      description: descriptionSpell,
      image: imageSpell,
      count: countSpell,
      category: categorySpell,
      urlImage: urlImageSpell,
      priceAdd: priceAddSpell,
      id
  } = spell;
  const [nameCurrent, setNameCurrent] = React.useState(nameSpell);
  const [price, setPrice] = React.useState(priceSpell);
  const [priceAdd, setPriceAdd] = React.useState(priceAddSpell);
  const [description, setDescription] = React.useState(descriptionSpell);
  const [image, setImage] = React.useState(imageSpell);
  const [urlImage, setUrlImage] = React.useState(urlImageSpell);
  const [count, setCount] = React.useState(countSpell);
  const [category, setCategory] = React.useState(categorySpell);
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();
  const onUpdate = () => {
    const db = firebase.firestore();

    db.collection('iherb').doc(id).set(
        {
            ...spell,
            nameCurrent,
            price,
            description,
            count,
            urlImage,
            category,
            date: new Date().toLocaleString()
        }
    )}

  const onDelete = () => {
    const db = firebase.firestore()
    db.collection('iherb').doc(id).delete()
  }

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

  return (
      <Grid container spacing={3}>
        <Grid item className={classes.root} >
            {loading ?
                <CircularProgress />
                :
                <div>
                    <div className={classes.mb}>
                        <div>Old image:</div>
                        <div
                            className="dish__image"
                            style={{ backgroundImage: `url(${image})` }}
                        >
                        </div>
                        <div>New image:</div>
                        <div
                            className="dish__image"
                            style={{ backgroundImage: `url(${urlImage})` }}
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
                            value={nameCurrent}
                            label="Имя"
                            onChange={e => {
                                setNameCurrent(e.target.value);
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
                </div>
            }
      </Grid>
      </Grid>
  );
};
