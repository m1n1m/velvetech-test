import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import Goods from '@models/Goods';
import GoodsService from '@src/services/GoodsService';
import {
    Button,
    Container,
    FormControl,
    FormHelperText,
    Grid, Input,
    InputLabel, MenuItem, Select,
    Typography, TextField
} from '@mui/material';
import Category from '@models/Category';
import dayjs from 'dayjs';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {DatePicker} from '@mui/lab';
import {useStore} from '@store/stores';

const GoodsEdit = () => {

    const [ name, setName ] = useState<string>('');

    const [ price, setPrice ] = useState<number>(0);

    const [ expirationDate, setExpirationDate ] = useState<Date>(null);

    const [ category, setCategory ] = useState<Category>(null);

    const [ errors, setErrors ] = useState(new Map<string, string>());

    const routerMatch = useRouteMatch();

    const goodsId = routerMatch.params.id;

    const isNew = goodsId === 'new';

    const { categoriesStore } = useStore();

    const browserHistory = useHistory();

    useEffect(() => {
        loadCategories();
        if (!isNew) {
            loadEntity();
        }
    }, []);

    useEffect(() => {
        validateForm()
    }, [name, price, expirationDate, category]);

    function loadCategories() {
        categoriesStore.loadAll();
    }

    function loadEntity() {
        GoodsService.findById(goodsId).then(resp => {
            mapEntity(resp.data);
        });
    }

    function mapEntity(goods?: Goods) {
        if (!goods) return;
        setName(goods.name);
        setPrice(goods.price);
        setExpirationDate(goods.expirationDate);
        setCategory(goods.category);
    }

    function onChangeName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function onChangePrice(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.value) {
            setPrice(0);
        } else {
            setPrice(Number(event.target.value));
        }
    }

    function onChangeExpirationDate(value: any) {
        if (!value) {
            setExpirationDate(undefined);
        } else {
            setExpirationDate(value.toDate());
        }
    }

    function onChangeCategory(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.value) {
            setCategory(undefined);
        } else {
            setCategory(categoriesStore.categories.find(c => c.id === event.target.value));
        }
    }

    function validateForm() {
        setErrors(new Map<string, string>());
        validateName();
        validatePrice();
        validateExpirationDate();
        validateCategory();
    }

    function validateCategory() {
        if (!category) {
            addError('category', '???????????? ???????? ??????????????????');
            return;
        }
    }

    function addError(field: string, description: string) {
        const newErrors = new Map(errors);
        newErrors.set(field, description);
        setErrors(newErrors);
    }

    function validateName() {
        if (!name || name.length < 4) {
            addError('name', '?????????? ???? ???????????? ???????? ???????????? 4');
            return;
        }
        if (name.length > 40) {
            addError('name', '?????????? ???? ???????????? ???????? ???????????? 40');
            return;
        }
    }

    function validatePrice() {
        if (!price || price <= 0) {
            addError('price', '???????? ???????????? ???????? ???????????? 0')
        }
    }

    function validateExpirationDate() {
        if (!expirationDate) {
            addError('expirationDate', '???????? ???? ?????????? ???????? ????????????')
            return;
        }

        if (dayjs(expirationDate).startOf('day').isBefore(dayjs().startOf('day').toDate())) {
            addError('expirationDate', '???????? ???? ?????????? ???????? ???????????? ??????????????')
            return;
        }
    }

    function doSave() {

        if (errors.size > 0) {
            return;
        }

        const goods = new Goods();
        goods.name = name;
        goods.price = price;
        goods.expirationDate = expirationDate;
        goods.category = category;

        if (isNew) {
            GoodsService.create(goods);
        } else {
            goods.id = goodsId;
            GoodsService.update(goods);
        }
        browserHistory.goBack();
    }

    return (
        <Container component="main" maxWidth="sm" sx={{mb: 4}}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        {isNew ? <div>???????????????? ????????????</div> : <div>???????????????????????????? ????????????</div>}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormControl error={errors.has('category')} fullWidth>
                        <InputLabel id="component-error"> ?????????????????? </InputLabel>
                        <Select
                            labelId="component-error"
                            id="category"
                            value={category?.id || ''}
                            label="??????????????????"
                            onChange={onChangeCategory}
                        >
                            {categoriesStore.categories.map(cat => (
                                <MenuItem key={cat.id} value={cat.id}> {cat.name} </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl error={errors.has('name')} variant="standard" fullWidth>
                        <InputLabel htmlFor="component-error"> ???????????????????????? </InputLabel>
                        <Input
                            required
                            id="name"
                            name="name"
                            aria-describedby="component-error-text"
                            value={name}
                            fullWidth
                            onChange={onChangeName}
                        />
                        <FormHelperText id="component-error-text">
                            {errors.has('name') && errors.get('name')}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl error={errors.has('price')} variant="standard">
                        <InputLabel htmlFor="component-error"> ???????? </InputLabel>
                        <Input
                            required
                            id="price"
                            name="price"
                            type="number"
                            aria-describedby="component-error-text"
                            value={price}
                            fullWidth
                            onChange={onChangePrice}
                        />
                        <FormHelperText id="component-error-text">
                            {errors.has('price') && errors.get('price')}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="???????? ????????????????"
                            value={expirationDate}
                            onChange={(newValue) => {
                                onChangeExpirationDate(newValue);
                            }}
                            renderInput={(params) =>
                                <FormControl error={errors.has('expirationDate')} variant="standard">
                                    <TextField {...params} error={errors.has('expirationDate')}/>
                                    <FormHelperText id="component-error-text">
                                        {errors.has('expirationDate') && errors.get('expirationDate')}
                                    </FormHelperText>
                                </FormControl>
                            }
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="text" onClick={doSave}>
                        ??????????????????
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default observer(GoodsEdit);
