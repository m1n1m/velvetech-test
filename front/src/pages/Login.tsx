import React from 'react';
import {injectRootStore, RootStoreInjected} from '@store/RootStore';
import {appStyles} from '../appStyles';
import {Button, Container, Grid, TextField} from '@mui/material';

@injectRootStore
class Login extends React.Component<RootStoreInjected> {

    render() {

        return (
            <Container className={appStyles.container} maxWidth="xs">
                <form>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Email" name="email" size="small" variant="outlined" />
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
                                onClick={this.handleSubmit.bind(this)}
                            >
                                Log in
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        );
    }

    handleSubmit() {
        this.props.rootStore.setIsAuthorized(true);
    }
}

export default Login;
