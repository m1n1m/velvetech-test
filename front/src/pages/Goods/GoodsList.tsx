import React from 'react';
import {observer} from 'mobx-react';
import {GoodsStoreInjected, injectGoodsStore} from '@store/GoodsStore';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {Button, Grid, Stack} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {browserHistory} from '@src/index';
import { withRouter } from 'react-router-dom';

@injectGoodsStore
@observer
class GoodsList extends React.Component<GoodsStoreInjected> {

    private columns: GridColDef[] = [
        { field: 'name', headerName: 'Наименование', width: 200 },
        { field: 'price', headerName: 'Цена', width: 150, type: 'number' },
        { field: 'expirationDate', headerName: 'Срок годности', width: 200, type: 'date' },
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

    render() {
        const goods = this.props.goodsStore.goods;
        return (
        <React.Fragment>
            <Grid container spacing={4} rowSpacing={4}>
                <Grid item xs={12}>
                    <Stack spacing={2} direction="row">
                        <Button
                            variant="outlined"
                            startIcon={<AddBoxIcon/>}
                            onClick={ this.createGoods.bind(this) }
                        >
                            Создать
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
                        />
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
        );
    }
}

export default withRouter(GoodsList);
