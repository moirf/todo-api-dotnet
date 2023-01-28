import React, { Component } from 'react';
import './custom.css'
import './bootstrap-icons.css'


export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            context: {}
        }
    }
    static displayName = App.name;

    invokeSignInEvent = () => {
        this.authService.Authenticate()
            .then(() => {
                if (this.authService.account)
                    this.setState({ ...this.state, isLoggedIn: true })
            })
    }

    //React lifecycle method that gets called once a component has finished mounting
    //Learn more: https://reactjs.org/docs/react-component.html#componentdidmount
    componentDidMount() {
        // Get the user context from Teams and set it in the state
        microsoftTeams.getContext((context, error) => {
            this.setState({
                context: context
            });
        });
        // Next steps: Error handling using the error object
    }

    render() {
        return (
            <Layout authService={this.authService}>
                <Switch>
                    <Route exact path='/'>
                        {!this.state.isLoggedIn
                            ? <Redirect to='/login' />
                            : <Redirect to='/home' />
                        }
                    </Route>
                    <Route path='/home'>
                        {!this.state.isLoggedIn
                            ? <Redirect to='/login' />
                            : <Home authService={this.authService} appSettings={this.appSettings} />
                        }                        
                    </Route>
                    <Route path='/error'>
                        <Error />
                    </Route>
                    <Route path='/config'>
                        <TabConfig />
                    </Route>
                    <Route path='/tab-auth'>
                        <TabAuth authService={this.authService} />
                    </Route>
                    <Route path='/login'>
                        {this.state.isLoggedIn
                            ? <Redirect to='/home' />
                            : <Login signIn={this.invokeSignInEvent} />
                        }
                    </Route>
                    <Route path='/privacy'>
                        <Privacy />
                    </Route>
                    <Route path='/termsofuse'>
                        <TermsOfUse />
                    </Route>
                </Switch>
            </Layout>
        );
    }
}