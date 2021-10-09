import React from 'react';
import {appStyles} from '../appStyles';
import {Button, Container, Grid, TextField} from '@mui/material';
import {observer} from 'mobx-react';
import {useStore} from '@store/stores';


const Login = () => {

    const {rootStore} = useStore();

    function authorize() {
        rootStore.setIsAuthorized(true);
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{minHeight: '100vh'}}
        >
            <Container className={appStyles.container} maxWidth="xs">
                <form>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Email" name="email" size="small" variant="outlined"/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        size="small"
                                        type="password"
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                color="primary"
                                fullWidth
                                variant="contained"
                                onClick={authorize}
                            >
                                Log in
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </Grid>
    );
}

export default observer(Login);
