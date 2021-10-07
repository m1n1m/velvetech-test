import React from 'react';
import {observer} from 'mobx-react';
import {GoodsStoreInjected, injectGoodsStore} from '@store/GoodsStore';
import {DataGrid, GridColDef, GridSelectionModel, GridValueGetterParams} from '@mui/x-data-grid';
import {Button, Grid, Stack} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import {browserHistory} from '@src/index';
import { withRouter } from 'react-router-dom';
import Goods from '@models/Goods';
import GoodsService from '@src/services/GoodsService';
import dayjs from 'dayjs';

@injectGoodsStore
@observer
class GoodsList extends React.Component<GoodsStoreInjected> {

    private selectedRows: any;

    private columns: GridColDef[] = [
        { field: 'name', headerName: 'Наименование', width: 200 },
        { field: 'price', headerName: 'Цена', width: 150, type: 'number' },
        {
            field: 'expirationDate',
            headerName: 'Срок годности',
            width: 200,
            type: 'date',
            valueGetter: (params: GridValueGetterParams) =>
                // @ts-ignore
                dayjs(params.value).format('YYYY.MM.DD'),
        },
        {
            field: 'category',
            headerName: 'Категория',
            width: 200,
            type: 'string',
            valueGetter: (params: GridValueGetterParams) =>
                // @ts-ignore
                params.value.name,
        },
    ];

    componentDidMount() {
        this.props.goodsStore.loadAll();
    }

    createGoods() {
        browserHistory.push("/goods-edit/new");
    }

    async deleteGoods() {
        if (this.selectedRows && this.selectedRows.length > 0) {
            for (let i = 0; i < this.selectedRows.length; i++) {
                await GoodsService.delete(this.selectedRows[i]);
            }
            this.props.goodsStore.loadAll();
        }
    }

    onRowClick(row: Goods) {
        browserHistory.push(`/goods-edit/${row.id}`);
    }

    setSelectionModel(selectedRows: GridSelectionModel) {
        this.selectedRows = selectedRows;
    }

    render() {
        const goods = this.props.goodsStore.goods;
        return (
        <React.Fragment>
            <Grid container spacing={4} rowSpacing={4}>
                <Grid item xs={12}>
                    <Stack spacing={2} direction="row">
                        <Button
                            variant="text"
                            startIcon={<AddBoxIcon/>}
                            onClick={ this.createGoods.bind(this) }
                        >
                            Создать
                        </Button>
                        <Button
                            variant="text"
                            startIcon={<DeleteIcon/>}
                            onClick={ this.deleteGoods.bind(this) }
                        >
                            Удалить
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <div style={{ height: 700, width: '100%' }}>
                        <DataGrid
                            rows={goods}
                            columns={this.columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            checkboxSelection
                            disableSelectionOnClick
                            onRowClick={ this.onRowClick.bind(this) }
                            onSelectionModelChange={(newSelection: GridSelectionModel) => {
                                this.setSelectionModel(newSelection);
                            }}
                        />
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
        );
    }
}

export default withRouter(GoodsList);
