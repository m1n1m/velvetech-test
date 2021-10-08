import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Grid} from '@mui/material';
import {useStore} from '@store/stores';

const Categories = () => {

    const columns: GridColDef[] = [{field: 'name', headerName: 'Наименование', width: 500}];
    const {categoriesStore, categoriesStore: {categories}} = useStore();

    useEffect(() => {
        categoriesStore.loadAll();
    }, []);

    return (
        <React.Fragment>
            <Grid container spacing={4} rowSpacing={4}>
                <Grid item xs={12}>
                    <div style={{height: 700, width: '100%'}}>
                        <DataGrid
                            rows={categories}
                            columns={columns}
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

export default observer(Categories);
