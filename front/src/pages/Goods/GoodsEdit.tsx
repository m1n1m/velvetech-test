import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {useRouteMatch} from "react-router-dom";
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
import {browserHistory} from '@src/index';
import {FormError} from '@models/FormError';
import {useStore} from '@store/stores';

const GoodsEdit = () => {

    let goods: any;

    const [ name, setName ] = useState<string>('');

    const [ price, setPrice ] = useState<number>(0);

    const [ expirationDate, setExpirationDate ] = useState<Date>(null);

    const [ category, setCategory ] = useState<Category>(null);

    const [ errors, setErrors ] = useState(new Map<string, FormError>());

    const routerMatch = useRouteMatch();

    const goodsId = routerMatch.params.id;

    const isNew = goodsId === 'new';

    const { categoriesStore } = useStore();

    useEffect(() => {
        loadCategories();
        if (!isNew) {
            loadEntity();
        }
    }, []);

    function loadCategories() {
        categoriesStore.loadAll();
    }

    function loadEntity() {
        GoodsService.findById(goodsId).then(resp => {
            goods = resp.data;
            mapEntity();
        });
    }

    function mapEntity() {
        if (!goods) return;
        setName(goods.name);
        setPrice(goods.price);
        setExpirationDate(goods.expirationDate);
        setCategory(goods.category);
    }

    function onChangeName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
        validateForm();
    }

    function onChangePrice(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.value) {
            setPrice(0);
        } else {
            setPrice(Number(event.target.value));
        }
        validateForm();
    }

    function onChangeExpirationDate(value: any) {
        if (!value) {
            setExpirationDate(undefined);
        } else {
            setExpirationDate(value.toDate());
        }
        validateForm();
    }

    function onChangeCategory(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.value) {
            setCategory(undefined);
        } else {
            setCategory(categoriesStore.categories.find(c => c.id === event.target.value));
        }
        validateForm();
    }

    function validateForm() {
        setErrors(new Map<string, FormError>());
        validateName();
        validatePrice();
        validateExpirationDate();
        validateCategory();
    }

    function addError(field: string, description: string) {
        // setErrors(  )
    }

    function validateCategory() {
        if (!category) {
            errors.set('category', new FormError('Должно быть заполнено'))
            return;
        }
    }

    function validateName() {
        if (!name || name.length < 4) {
            errors.set('name', new FormError('Длина не должна быть меньше 4'))
            return;
        }
        if (name.length > 40) {
            errors.set('name', new FormError('Длина не должна быть больше 40'))
            return;
        }
    }

    function validatePrice() {
        if (!price || price <= 0) {
            errors.set('price', new FormError('Цена должна быть больше 0'))
        }
    }

    function validateExpirationDate() {
        if (!expirationDate) {
            errors.set('expirationDate', new FormError('Дата не может быть пустой'))
            return;
        }

        if (dayjs(expirationDate).startOf('day').isBefore(dayjs().startOf('day').toDate())) {
            errors.set('expirationDate', new FormError('Дата не может быть раньше сегодня'))
            return;
        }
    }

    function doSave() {
        validateForm();
        if (errors.size > 0) {
            return;
        }

        if (this.isNew) {
            goods = new Goods();
        }

        goods.name = name;
        goods.price = price;
        goods.expirationDate = expirationDate;
        goods.category = category;

        if (isNew) {
            GoodsService.create(goods);
        } else {
            GoodsService.update(goods);
        }
        browserHistory.goBack();
    }

    return (
        <Container component="main" maxWidth="sm" sx={{mb: 4}}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        {isNew ? <div>Создание товара</div> : <div>Редактирование товара</div>}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormControl error={errors.has('category')} fullWidth>
                        <InputLabel id="component-error"> Категория </InputLabel>
                        <Select
                            labelId="component-error"
                            id="category"
                            value={category?.id || ''}
                            label="Категория"
                            onChange={onChangeCategory.bind(this)}
                        >
                            {categoriesStore.categories.map(cat => (
                                <MenuItem key={cat.id} value={cat.id}> {cat.name} </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl error={errors.has('name')} variant="standard" fullWidth>
                        <InputLabel htmlFor="component-error"> Наименование </InputLabel>
                        <Input
                            required
                            id="name"
                            name="name"
                            aria-describedby="component-error-text"
                            value={name}
                            fullWidth
                            onChange={onChangeName.bind(this)}
                        />
                        <FormHelperText id="component-error-text">
                            {errors.has('name') && errors.get('name').description}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl error={errors.has('price')} variant="standard">
                        <InputLabel htmlFor="component-error"> Цена </InputLabel>
                        <Input
                            required
                            id="price"
                            name="price"
                            type="number"
                            aria-describedby="component-error-text"
                            value={price}
                            fullWidth
                            onChange={onChangePrice.bind(this)}
                        />
                        <FormHelperText id="component-error-text">
                            {errors.has('price') && errors.get('price').description}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Срок годности"
                            value={expirationDate}
                            onChange={(newValue) => {
                                onChangeExpirationDate(newValue);
                            }}
                            renderInput={(params) =>
                                <FormControl error={errors.has('expirationDate')} variant="standard">
                                    <TextField {...params} error={errors.has('expirationDate')}/>
                                    <FormHelperText id="component-error-text">
                                        {errors.has('expirationDate') && errors.get('expirationDate').description}
                                    </FormHelperText>
                                </FormControl>
                            }
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="text" onClick={doSave}>
                        Сохранить
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default observer(GoodsEdit);
