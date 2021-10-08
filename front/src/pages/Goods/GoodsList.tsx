import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {DataGrid, GridColDef, GridSelectionModel, GridValueGetterParams} from '@mui/x-data-grid';
import {Button, Grid, Stack} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import GoodsService from '@src/services/GoodsService';
import dayjs from 'dayjs';
import {useStore} from '@store/stores';
import { useHistory } from 'react-router-dom'


const GoodsList = () => {

    const browserHistory = useHistory();
    let selectedRows: any;
    const columns: GridColDef[] = [
        {field: 'name', headerName: 'Наименование', width: 200},
        {field: 'price', headerName: 'Цена', width: 150, type: 'number'},
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

    const {goodsStore, goodsStore: {goods}} = useStore();

    useEffect(() => {
        goodsStore.loadAll();
    }, []);

    function createGoods() {
        browserHistory.push("/goods-edit/new");
    }

    async function deleteGoods() {
        if (selectedRows && selectedRows.length > 0) {
            for (let i = 0; i < selectedRows.length; i++) {
                await GoodsService.delete(selectedRows[i]);
            }
            goodsStore.loadAll();
        }
    }

    function onRowClick(row: any) {
        browserHistory.push(`/goods-edit/${row.id}`);
    }

    function setSelectionModel(selected: GridSelectionModel) {
        selectedRows = selected;
    }

    return (
        <React.Fragment>
            <Grid container spacing={4} rowSpacing={4}>
                <Grid item xs={12}>
                    <Stack spacing={2} direction="row">
                        <Button
                            variant="text"
                            startIcon={<AddBoxIcon/>}
                            onClick={createGoods}
                        >
                            Создать
                        </Button>
                        <Button
                            variant="text"
                            startIcon={<DeleteIcon/>}
                            onClick={deleteGoods}
                        >
                            Удалить
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <div style={{height: 700, width: '100%'}}>
                        <DataGrid
                            rows={goods}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            checkboxSelection
                            disableSelectionOnClick
                            onRowClick={ onRowClick }
                            onSelectionModelChange={(newSelection: GridSelectionModel) => {
                                setSelectionModel(newSelection);
                            }}
                        />
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default observer(GoodsList);
