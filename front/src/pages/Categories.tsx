import React from 'react';
import {CategoriesStoreInjected, injectCategoriesStore} from '@store/CategoriesStore';
import {observer} from 'mobx-react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Button, Grid, Stack} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {browserHistory} from '@src/index';
import { withRouter } from 'react-router-dom';

@injectCategoriesStore
@observer
class Categories extends React.Component<CategoriesStoreInjected> {

    private columns : GridColDef[] = [{ field: 'name', headerName: 'Наименование', width: 500 }];

    componentDidMount() {
        this.props.categoriesStore.loadAll();
    }

    createCategory() {
        browserHistory.push("/goods-edit/new");
    }

    render() {
        const categories = this.props.categoriesStore.categories;
        return (
            <React.Fragment>
                <Grid container spacing={4} rowSpacing={4}>
                    <Grid item xs={12}>
                        <Stack spacing={2} direction="row">
                            <Button
                                variant="outlined"
                                startIcon={<AddBoxIcon/>}
                                onClick={ this.createCategory.bind(this) }
                            >
                                Создать
                            </Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ height: 700, width: '100%' }}>
                            <DataGrid
                                rows={categories}
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

export default withRouter(Categories);
