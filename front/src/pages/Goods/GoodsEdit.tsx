import {observer} from 'mobx-react';
import React from 'react';
import Goods from '@models/Goods';
import {action, makeObservable, observable} from 'mobx';
import {GoodsStoreInjected, injectGoodsStore} from '@store/GoodsStore';
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
import {CategoriesStoreInjected, injectCategoriesStore} from '@store/CategoriesStore';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab';
import {browserHistory} from '@src/index';

type Props = GoodsStoreInjected & CategoriesStoreInjected

class FormError {
    constructor(
        public description: string
    ) {
    }
}

@injectGoodsStore
@injectCategoriesStore
@observer
class GoodsEdit extends React.Component<Props> {

    private goods?: Goods;

    @observable name?: string;

    @observable price?: number;

    @observable expirationDate?: Date;

    @observable category?: Category;

    @observable errors: Map<string, FormError> = new Map<string, FormError>();

    private readonly isNew: boolean;

    constructor(props: Props) {
        super(props);
        makeObservable(this);
        this.isNew = this.isNewEntity();
    }

    componentDidMount() {
        this.loadCategories();
        if (!this.isNew) {
            this.loadEntity();
        }
    }

    loadCategories() {
        this.props.categoriesStore.loadAll();
    }

    isNewEntity(): boolean {
        return this.getGoodsId() === 'new';
    }

    loadEntity() {
        const goodsId = this.getGoodsId();
        GoodsService.findById(goodsId).then(resp => {
            this.goods = resp.data;
            this.mapEntity();
        });
    }

    @action
    mapEntity() {
        if (!this.goods) return;
        this.name = this.goods.name;
        this.price = this.goods.price;
        this.expirationDate = this.goods.expirationDate;
        this.category = this.goods.category;
    }

    getGoodsId(): null {
        // @ts-ignore
        return this.props.match.params.id;
    }

    @action
    onChangeName(event: React.ChangeEvent<HTMLInputElement>) {
        this.name = event.target.value;
        this.validateForm();
    }

    @action
    onChangePrice(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.value) {
            this.price = 0;
        } else {
            this.price = Number(event.target.value);
        }
        this.validateForm();
    }

    @action
    onChangeExpirationDate(value: any) {
        if (!value) {
            this.expirationDate = undefined;
        } else {
            this.expirationDate = value.toDate();
        }
        this.validateForm();
    }

    @action
    onChangeCategory(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.value) {
            this.category = undefined;
        } else {
            this.category = this.props.categoriesStore.categories.find(c => c.id === event.target.value);
        }
        this.validateForm();
    }

    @action
    validateForm() {
        this.errors.clear();
        this.validateName();
        this.validatePrice();
        this.validateExpirationDate();
        this.validateCategory();
    }

    validateCategory() {
        if (!this.category) {
            this.errors.set('category', new FormError('Должно быть заполнено'))
            return;
        }
    }

    validateName() {
        if (!this.name || this.name.length < 4) {
            this.errors.set('name', new FormError('Длина не должна быть меньше 4'))
            return;
        }
        if (this.name.length > 40) {
            this.errors.set('name', new FormError('Длина не должна быть больше 40'))
            return;
        }
    }

    validatePrice() {
        if (!this.price || this.price <= 0) {
            this.errors.set('price', new FormError('Цена должна быть больше 0'))
        }
    }

    validateExpirationDate() {
        if (!this.expirationDate) {
            this.errors.set('expirationDate', new FormError('Дата не может быть пустой'))
            return;
        }

        if (dayjs(this.expirationDate).startOf('day').isBefore(dayjs().startOf('day').toDate())) {
            this.errors.set('expirationDate', new FormError('Дата не может быть раньше сегодня'))
            return;
        }
    }

    doSave() {
        this.validateForm();
        if (this.errors.size > 0) {
            return;
        }

        let goods;

        if (this.isNew) {
            this.goods = new Goods();
        }

        this.goods.name = this.name;
        this.goods.price = this.price;
        this.goods.expirationDate = this.expirationDate;
        this.goods.category = this.category;

        if (this.isNew) {
            GoodsService.create(this.goods);
        } else {
            GoodsService.update(this.goods);
        }
        browserHistory.goBack();
    }

    render() {

        return(
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            { this.isNew ? <div>Создание товара</div> : <div>Редактирование товара</div>}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl error={ this.errors.has('category')} fullWidth>
                            <InputLabel id="component-error"> Категория </InputLabel>
                            <Select
                                labelId="component-error"
                                id="category"
                                value={ this.category?.id || '' }
                                label="Категория"
                                onChange={ this.onChangeCategory.bind(this) }
                            >
                                {this.props.categoriesStore.categories.map(cat => (
                                    <MenuItem key={cat.id} value={cat.id}> {cat.name} </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl error={ this.errors.has('name') } variant="standard" fullWidth>
                            <InputLabel htmlFor="component-error"> Наименование </InputLabel>
                            <Input
                                required
                                id="name"
                                name="name"
                                aria-describedby="component-error-text"
                                value={ this.name }
                                fullWidth
                                onChange={ this.onChangeName.bind(this) }
                            />
                            <FormHelperText id="component-error-text">
                                {this.errors.has('name') &&
                                    this.errors.get('name').description
                                }
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl error={ this.errors.has('price') } variant="standard">
                            <InputLabel htmlFor="component-error"> Цена </InputLabel>
                            <Input
                                required
                                id="price"
                                name="price"
                                type="number"
                                aria-describedby="component-error-text"
                                value={ this.price }
                                fullWidth
                                onChange={ this.onChangePrice.bind(this) }
                            />
                            <FormHelperText id="component-error-text">
                                {this.errors.has('price') &&
                                    this.errors.get('price').description
                                }
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Срок годности"
                                value={ this.expirationDate }
                                onChange={(newValue) => {
                                    this.onChangeExpirationDate(newValue);
                                }}
                                renderInput={(params) =>
                                    <FormControl error={ this.errors.has('expirationDate') } variant="standard">
                                        <TextField {...params} error={ this.errors.has('expirationDate') }/>
                                        <FormHelperText id="component-error-text">
                                            {this.errors.has('expirationDate') &&
                                                this.errors.get('expirationDate').description
                                            }
                                        </FormHelperText>
                                    </FormControl>
                                }
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={this.doSave.bind(this)}>
                            Сохранить
                        </Button>
                    </Grid>
                </Grid>
                </Container>
        );
    }
}

export default GoodsEdit;
